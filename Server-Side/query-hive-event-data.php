<?php

    error_reporting(E_ALL);
    require('./database.php');

    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

    $hiveId = $client_json_obj["hiveId"];
    $targetYear = $client_json_obj["targetYear"];
    $startMonth = $client_json_obj["startMonth"];
    $endMonth = $client_json_obj["endMonth"];

    $db_connection = connect_to_database();

    $escHiveId =  mysqli_real_escape_string($db_connection , $hiveId);
    $escTargetYear = mysqli_real_escape_string($db_connection , $targetYear);
    $escTargetYear = intval($escTargetYear);

    $escStartMonth =  mysqli_real_escape_string($db_connection , $startMonth);
    $escStartMonth = intval($escStartMonth);

    $escEndMonth =  mysqli_real_escape_string($db_connection , $endMonth);
    $escEndMonth = intval($escEndMonth);

    $server_reply = array();

     //get the harvest date and volume of honey harvested
     $queryHiveEvent = "SELECT EventId, EventType, Description, 
            DATE_FORMAT(Date, '%d/%m/%Y')  AS Date, WeatherCondition, ApiaristId, HoneyHiveId
         FROM HIVE_EVENT WHERE HoneyHiveId = '$escHiveId'
         AND YEAR(Date) = $escTargetYear
         AND MONTH(Date) >= $escStartMonth
         AND MONTH(Date) <= $escEndMonth

     	ORDER BY Date;";

     // "SELECT * FROM Products where productName like '{$criteria}' or price like '{$criteria}' or category like '{$criteria}' or description like '{$criteria}'"

     $queryResult = mysqli_query($db_connection,$queryHiveEvent);

     $server_reply = array();

     if (!$queryResult)
     {
         mysqli_close($db_connection);

         $server_reply["queryOutcome"] = "failure";
         $server_reply["errorMessage"] = "No results found";
         echo json_encode($server_reply);
         die();
         
     }

    $server_reply["queryOutcome"] = "success";

    $index = 0;
	$server_reply["results"] = array();
    while($currentRow = mysqli_fetch_assoc($queryResult))
    {
        
        $server_reply["results"][$index]["eventId"] = $currentRow["EventId"];
        $server_reply["results"][$index]["eventType"] = $currentRow["EventType"];;
        $server_reply["results"][$index]["description"] = $currentRow["Description"];
        $server_reply["results"][$index]["date"] = $currentRow["Date"];
        $server_reply["results"][$index]["weatherCondition"] = $currentRow["WeatherCondition"];
        $server_reply["results"][$index]["apiaristId"] = $currentRow["ApiaristId"];
        $server_reply["results"][$index]["hiveId"] = $currentRow["HoneyHiveId"];
        $index++;
    }



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    echo json_encode($server_reply);
?>
