<?php

    /*
        File Name: query-completed-inspection-data.php
        Author: Terence Lee, Hoon Wei Xiong
        Date: 15 November 2021

        Purpose: To allow clients to request and retrieve inspection records of
                a hive
    */

    error_reporting(E_ALL);
    require('./database.php');

    $dbConnection = connect_to_database();

    $clientRequestString = file_get_contents('php://input');
    $clientRequestObj = json_decode($clientRequestString, true);

    $hiveId = $clientRequestObj["hiveId"];
    $targetYear = $clientRequestObj["targetYear"];
    $startMonth = $clientRequestObj["startMonth"];
    $endMonth = $clientRequestObj["endMonth"];
	
	
    $escHiveId = mysqli_real_escape_string($dbConnection , $hiveId);
    
    $escTargetYear = mysqli_real_escape_string($dbConnection , $targetYear);
    $escTargetYear = intval($escTargetYear);

    $escStartMonth = mysqli_real_escape_string($dbConnection , $startMonth);
    $escStartMonth = intval($escStartMonth);

    $escEndMonth = mysqli_real_escape_string($dbConnection , $endMonth);
    $escEndMonth = intval($escEndMonth);

    $serverReply = getInspectionRecords($dbConnection, $escHiveId, $escTargetYear, $escStartMonth, $escEndMonth);
	
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    echo json_encode($serverReply);
	

	

    /*
        Brief: Query the MySQL database for inspection
    */
    function getInspectionRecords($dbConnection, $escHiveId, $escTargetYear, $escStartMonth, $escEndMonth)
    {
        
        $queryString = "SELECT InspectionId, HoneyHiveId, InspectionDueDate, InspectionActualDate, Description, WeatherCondition, 
							Outcome,  ApiaristId
							FROM COMPLETED_INSPECTION
							WHERE HoneyHiveId = '$escHiveId' AND
                                    YEAR(InspectionActualDate) = $escTargetYear AND
									MONTH(InspectionActualDate) >= $escStartMonth  AND
									MONTH(InspectionActualDate) <= $escEndMonth ; ";						
       
        $queryResult = mysqli_query($dbConnection,$queryString);

        $serverReply = array();

        if (!$queryResult)
        {
            mysqli_close($dbConnection);

            $serverReply["queryOutcome"] = "failure";
            $serverReply["errorMessage"] = "No results found";
            return $serverReply;
            
        }

        $serverReply["queryOutcome"] = "success";
        
        $serverReply["results"] = storeQueryResultsInArray($queryResult, $dbConnection);


        return $serverReply;
        
    }


    /*
        Brief: Store the results of the MySQL query in an array for sending it
        back to the client
    */
    function storeQueryResultsInArray($queryResult, $dbConnection)
    {
	$resultsIndex = 0;

        $arrayToReturn = array();
		
        while($currentRow = mysqli_fetch_assoc($queryResult))
        {
	    $arrayToReturn[$resultsIndex] = array();
	    $arrayToReturn[$resultsIndex]["inspectionId"] =  $currentRow['InspectionId'];
            $arrayToReturn[$resultsIndex]["hiveId"] =  $currentRow['HoneyHiveId'];
            $arrayToReturn[$resultsIndex]["inspectionDueDate"] =  $currentRow['InspectionDueDate'];
            $arrayToReturn[$resultsIndex]["inspectionActualDate"] =   $currentRow['InspectionActualDate'];
	    $arrayToReturn[$resultsIndex]["description"] =  $currentRow['Description'];
	    $arrayToReturn[$resultsIndex]["weatherCondition"] =  $currentRow['WeatherCondition'];
	    $arrayToReturn[$resultsIndex]["outcome"] =  $currentRow['Outcome'];
	    $arrayToReturn[$resultsIndex]["apiaristId"] =  $currentRow['ApiaristId'];

            $resultsIndex++;
        }


        return $arrayToReturn;
    }
?>
