<?php

    /*
        File Name: query-honey-data.php
        Author: Hoon Wei Xiong, Terence Lee
        Date: 1 November 2021
        Purpose: Allow client to access honey harvest data
                
    */

    error_reporting(E_ALL);
    require('./database.php');

    $client_request_data = file_get_contents('php://input');

    $client_json_obj = json_decode($client_request_data, true);

    $batchNo = $client_json_obj["batchNumber"];

    $db_connection = connect_to_database();

    $escBatchNo =  mysqli_real_escape_string($db_connection , $batchNo);


    $server_reply = getArrayOfHarvestDetails($escBatchNo, $db_connection);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    echo json_encode($server_reply);






    function getArrayOfHarvestDetails($escBatchNo, $db_connection)
    {
        //get the harvest date and volume of honey harvested
        $queryHarBatch = "SELECT BatchId, VolumeHarvested, 
        DATE_FORMAT(Date, '%d/%m/%Y')  AS Date,
        HoneyHiveId
            FROM HONEY_HARVEST_BATCH WHERE BatchId like '$escBatchNo';";

        // "SELECT * FROM Products where productName like '{$criteria}' or price like '{$criteria}' or category like '{$criteria}' or description like '{$criteria}'"

        $queryResult = mysqli_query($db_connection,$queryHarBatch);

        $server_reply = array();

        if (!$queryResult)
        {
            mysqli_close($db_connection);

            $server_reply["queryOutcome"] = "failure";
            $server_reply["errorMessage"] = "No results found";
            return $server_reply;
            
        }

        $server_reply["queryOutcome"] = "success";

        // $firstDate = $firstRow["Date"];

        
        $server_reply["results"] = storeQueryResultsInArray($queryResult, $escBatchNo, $db_connection);


        return $server_reply;
        
    }

    
   
    function storeQueryResultsInArray($queryResult, $escBatchNo, $db_connection)
    {
		
        $results_index = 0;

        $array_to_return = array();
		
        while($currentRow = mysqli_fetch_assoc($queryResult))
        {
			$array_to_return[$results_index] = array();
			$array_to_return[$results_index]["batchNumber"] =  $currentRow['BatchId'];
            $array_to_return[$results_index]["dateHarvested"] =  $currentRow['Date'];
            $array_to_return[$results_index]["volumeHarvested"] =  $currentRow['VolumeHarvested'];
            $array_to_return[$results_index]["hiveId"] =  $currentRow['HoneyHiveId'];
			
			
			$batch_id = $currentRow['BatchId'];
            $hive_id = $currentRow['HoneyHiveId'];

			
            $array_to_return[$results_index]["flowers"] =  
                                    getListOfContributingFlowers($batch_id, $db_connection);


            $array_to_return[$results_index]["location"] = getHiveLocation($hive_id, $db_connection);
            

            $results_index++;
        }


        return $array_to_return;
    }




    /*----------------------FLOWER----------------------------------*/


    function getListOfContributingFlowers($escBatchNo, $db_connection)
    {
        $queryFlower = "SELECT FlowerName 
        FROM HONEY_FLOWER WHERE BatchId = '$escBatchNo';";

        $queryResult = mysqli_query($db_connection,$queryFlower);

        $flowerIndex = 0;

        $array_of_flowers = array();

        while($row = mysqli_fetch_assoc($queryResult))
        {
            $array_of_flowers[$flowerIndex] = $row['FlowerName'];

            $flowerIndex++;
        }

        return $array_of_flowers;
    }

    

    /*------------------LOCATION-------------------------------*/


    function getHiveLocation($hive_id, $db_connection)
    {
        $queryLocation = "SELECT ST_X(Location) AS Latitude, 
                 ST_Y(Location) AS Longitude
        FROM HONEY_HIVE WHERE HoneyHiveId = '$hive_id';";

        $queryResult = mysqli_query($db_connection,$queryLocation);
        
        $row = mysqli_fetch_assoc($queryResult);
        
        $location_to_return = array();

        $location_to_return["latitude"] = $row["Latitude"];

        $location_to_return["longitude"]  = $row["Longitude"];


        return $location_to_return;
    }

    

    
?>
