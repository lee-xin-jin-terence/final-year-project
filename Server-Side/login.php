<?php
    error_reporting(E_ALL);
    require('./database.php');

    /*
    	Allow for users to log in to the system
    	Authors: Terence Lee Xin Jin
    */
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

    $username = $client_json_obj["username"];
    $password = $client_json_obj["password"];
	
    $db_connection = connect_to_database();

    $escUsername = mysqli_real_escape_string($db_connection , $username);
    $escPassword = mysqli_real_escape_string($db_connection , $password);
    $hashedPassword = hash('sha256', $escPassword );

    //check if user exists
    $queryHarBatch = "SELECT ApiaristId FROM APIARIST WHERE
			ApiaristId = '$escUsername' AND Password = '$hashedPassword';";

    $queryResult = mysqli_query($db_connection,$queryHarBatch);

    $firstRow = mysqli_fetch_assoc($queryResult);

    $server_reply = array();

    if (!$queryResult   ||
        !$firstRow )
    {
        mysqli_close($db_connection);
		
	$server_reply["loginOutcome"] = "failed";
        $server_reply["errorMessage"] = "Invalid Credentials Entered";
        echo json_encode($server_reply);
        die;
    }
	
    mysqli_close($db_connection);

    $server_reply["loginOutcome"] = "success";
    $server_reply["username"] = $escUsername;
	
    
    echo json_encode($server_reply);
?>
