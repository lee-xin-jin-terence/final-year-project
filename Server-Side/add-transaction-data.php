<?php

	/*
		
	*/

    error_reporting(E_ALL);
    require('./database.php');


    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

	$transactionType = $client_json_obj["transactionType"];
    $description = $client_json_obj["description"];
    $totalAmount = $client_json_obj["totalAmount"];
    $date = $client_json_obj["date"];
	$apiaristId = $client_json_obj["apiaristId"];


    $db_connection = connect_to_database();

	$escTransactionType = mysqli_real_escape_string($db_connection , $transactionType);
	$escDescription = mysqli_real_escape_string($db_connection , $description);
	$escTotalAmount = mysqli_real_escape_string($db_connection , $totalAmount);
    $escDate = mysqli_real_escape_string($db_connection , $date);
	$escApiaristId = mysqli_real_escape_string($db_connection , $apiaristId);
	
	
	$insertDataQuery = "INSERT INTO TRANSACTION (TransactionType, Description, 
				TotalAmount, Date, ApiaristId) VALUES ('$escTransactionType', '$escDescription', 
                $escTotalAmount, STR_TO_DATE( '$escDate', '%Y-%m-%d' ) ,  '$escApiaristId');";


    $insertDataResult = mysqli_query($db_connection, $insertDataQuery);
	
	$server_reply = array();
	
	if ($insertDataResult == true)
	{
		$server_reply["addOutcome"] = "success";
		$server_reply["transactionId"] = mysqli_insert_id($db_connection);
    }
    else
	{
		$server_reply["addOutcome"] = "failure";
		$server_reply["errorMessage"] = "Failed to add transaction record";
		
	}
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
	echo json_encode($server_reply);
?>