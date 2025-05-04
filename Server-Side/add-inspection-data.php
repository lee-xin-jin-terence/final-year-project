<?php
    error_reporting(E_ALL);
    require('./database.php');


    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

	$honeyHiveId = $client_json_obj["honeyHiveId"];
    $apiaristId = $client_json_obj["apiaristId"];
    $inspectionActualDate = $client_json_obj["inspectionDate"];
	$description = $client_json_obj["description"];
    $weatherCondition = $client_json_obj["weatherCondition"];
    $inspectionOutcome = $client_json_obj["inspectionOutcome"];

    $db_connection = connect_to_database();

	$escHoneyHiveId = mysqli_real_escape_string($db_connection , $honeyHiveId);
	$escApiaristId = mysqli_real_escape_string($db_connection , $apiaristId);
    $escInspectionActualDate = mysqli_real_escape_string($db_connection , $inspectionActualDate);
	$escDescription = mysqli_real_escape_string($db_connection , $description);
	$escWeatherCondition = mysqli_real_escape_string($db_connection , $weatherCondition);
    $escInspectionOutcome = mysqli_real_escape_string($db_connection , $inspectionOutcome);


    $server_reply = array();

    $inspectionDueDate = getInspectionDueDate($escHoneyHiveId, $server_reply,
                                              $db_connection);

    updateLastAndNextInspectionDate($escHoneyHiveId, $escInspectionActualDate, $db_connection);
    
    updateInspectionData($escHoneyHiveId, $escApiaristId, $inspectionDueDate,
                $escInspectionActualDate, $escDescription, $escWeatherCondition, $escInspectionOutcome, $db_connection, 
                $server_reply);
	
                
	
	$server_reply["addOutcome"] = "success";
    
	

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

	echo json_encode($server_reply);

    
    function getInspectionDueDate($escHoneyHiveId, $server_reply,$db_connection)
    {
        $inspectionDueDateQuery = "SELECT NextInspectionDate FROM HONEY_HIVE
                            WHERE HoneyHiveId = '$escHoneyHiveId'";


        $inspectionDueDateQueryResult = mysqli_query($db_connection, $inspectionDueDateQuery);

        if (!$inspectionDueDateQueryResult)
        {

            $server_reply["queryOutcome"] = "failure";
            $server_reply["errorMessage"] = mysqli_error($db_connection);
            mysqli_close($db_connection);
            echo json_encode($server_reply);
            die;
            
        }

        $resultRow = mysqli_fetch_assoc($inspectionDueDateQueryResult);

        $inspectionDueDate = $resultRow["NextInspectionDate"];

        return $inspectionDueDate;
    }



    function updateInspectionData($escHoneyHiveId, $escApiaristId, $inspectionDueDate,
                $escInspectionActualDate, $escDescription, $escWeatherCondition, $escInspectionOutcome,
                 $db_connection, &$server_reply)
    {
        $insertDataQuery = "INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, 
		InspectionDueDate, InspectionActualDate, Description, WeatherCondition, Outcome) 
        VALUES ('$escHoneyHiveId', '$escApiaristId', 
        STR_TO_DATE( '$inspectionDueDate',  '%Y-%m-%d' ), 
        STR_TO_DATE( '$escInspectionActualDate', '%Y-%m-%d' ) , '$escDescription',
         '$escWeatherCondition', '$escInspectionOutcome');";


        $updateResults = mysqli_query($db_connection, $insertDataQuery);
        $server_reply["inspectionId"] = mysqli_insert_id($db_connection);
    }
	
	

    function updateLastAndNextInspectionDate($escHoneyHiveId, $escInspectionActualDate,
                                             $db_connection)
    {
        $updateQuery = "UPDATE HONEY_HIVE 
            SET LastInspectionDate = STR_TO_DATE( '$escInspectionActualDate',  '%Y-%m-%d' ),
                NextInspectionDate =  DATE_ADD(STR_TO_DATE( '$escInspectionActualDate',  '%Y-%m-%d' ), 
                                                INTERVAL 1 MONTH)
            WHERE HoneyHiveId = '$escHoneyHiveId';";

        mysqli_query($db_connection, $updateQuery);
    }


	
	
?>