<?php   
	error_reporting(E_ALL);
    require('./database.php');

    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

	$harvestVolume = $client_json_obj["harvestVolume"];
    $harvestDate = $client_json_obj["harvestDate"];
	$apiaristId = $client_json_obj["apiaristId"];
	$arrayOfFlowerContributors = $client_json_obj["floralContributors"];
	$hiveId = $client_json_obj["hiveId"];

	
	$db_connection = connect_to_database();
	
	$escHarvestVolume = mysqli_real_escape_string($db_connection , $harvestVolume);
	$escHarvestDate = mysqli_real_escape_string($db_connection , $harvestDate);
	$escApiaristId = mysqli_real_escape_string($db_connection , $apiaristId);
	$escHiveId = mysqli_real_escape_string($db_connection , $hiveId);
	$escArrayOfFloralContributors = escapeFloralContributors($db_connection, $arrayOfFlowerContributors);
	
	
	$server_reply = insertBatchData($escHarvestVolume, $escHarvestDate,
							$escApiaristId, $escHiveId , $db_connection);
	
	$batchId = $server_reply["batchId"];

	insertFloralContributors($db_connection, $batchId, $escArrayOfFloralContributors);
	

	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
	echo json_encode($server_reply);
	
	
	function insertBatchData($escHarvestVolume, $escHarvestDate, $escApiaristId, $escHiveId , $db_connection)
	{
		$insertDataQuery = "INSERT INTO HONEY_HARVEST_BATCH ( VolumeHarvested, 
				Date, ApiaristId, HoneyHiveId) VALUES ( $escHarvestVolume, 
				STR_TO_DATE( '$escHarvestDate', '%Y-%m-%d' ) ,  '$escApiaristId', '$escHiveId');";
		
		$insertDataResult = mysqli_query($db_connection, $insertDataQuery);
	
		$server_reply = array();
		
		if ($insertDataResult == true)
		{
			$server_reply["addOutcome"] = "success";
			$server_reply["batchId"] = mysqli_insert_id($db_connection);
		}
		else
		{
			$server_reply["addOutcome"] = "failure";
			$server_reply["errorMessage"] = "Failed to add data. Honey Records for the " .
							" hive $escHiveId has already been added for that particular month";
			
		}
		
		return $server_reply;
	}
	


	function escapeFloralContributors($db_connection, $arrayOfFlowerContributors)
	{
		$escArrayOfFloralContributors = array();
		
		for($i = 0; $i< count($arrayOfFlowerContributors) ; $i++)
		{
			$escArrayOfFloralContributors[$i] = mysqli_real_escape_string($db_connection , $arrayOfFlowerContributors[$i]);
		}
		
		return $escArrayOfFloralContributors;
	}


	function insertFloralContributors($db_connection, $batchId, $escArrayOfFloralContributors)
	{
		
		foreach($escArrayOfFloralContributors as $currentFloralContributor)
		{
			$insertQuery = "INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
									VALUES ('$batchId', '$currentFloralContributor');" ;
									
			$insertDataResult = mysqli_query($db_connection, $insertQuery);
		}
		
	}


?>







