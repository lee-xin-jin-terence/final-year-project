<?php
    error_reporting(E_ALL);
    require('./database.php');


    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

	$eventType = $client_json_obj["eventType"];
    $description = $client_json_obj["description"];
    $date = $client_json_obj["date"];
    $weatherCondition = $client_json_obj["weatherCondition"];
	$apiaristId = $client_json_obj["apiaristId"];
	$hiveId = $client_json_obj["hiveId"];

	
	$db_connection = connect_to_database();

	
	
	$escEventType = mysqli_real_escape_string($db_connection , $eventType);
	$escDescription = mysqli_real_escape_string($db_connection , $description);
	$escDate = mysqli_real_escape_string($db_connection , $date);
    $escWeatherCondition = mysqli_real_escape_string($db_connection , $weatherCondition);
	$escApiaristId = mysqli_real_escape_string($db_connection , $apiaristId);
	$escHiveId = mysqli_real_escape_string($db_connection , $hiveId);
	
	
	$insertDataQuery = "INSERT INTO HIVE_EVENT (EventType, Description, 
				Date, WeatherCondition, ApiaristId, HoneyHiveId) VALUES ('$escEventType', '$escDescription', 
				STR_TO_DATE( '$escDate', '%Y-%m-%d' ) ,  '$escWeatherCondition', '$escApiaristId',
                '$escHiveId');";


    $insertDataResult = mysqli_query($db_connection, $insertDataQuery);
	
	$server_reply = array();
	
	if ($insertDataResult == true)
	{
		$server_reply["addOutcome"] = "success";
		$server_reply["eventId"] = mysqli_insert_id($db_connection);
    }
    else
	{
		$server_reply["addOutcome"] = "failure";
		$server_reply["errorMessage"] = "Failed to add event data";
		
	}
	
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
	echo json_encode($server_reply);
?>