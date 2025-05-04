<?php
	/*
		File Name: send-reminder-email.php
		Author: Hoon Wei Xiong, Terence Lee
		Date Created: 15 November 2021
		Purpose: To query a list of upcoming inspection reminders
	*/
	
	error_reporting(E_ALL);
	
	require('./database.php');
	
	
	//does not require any data from the client
	main( );
	
	
	/*
		Brief: Queries the database for a list of overdue inspections and
		list of upcoming due inspections
		
		Sends the query results back to the client
	*/
	function main()
	{
		$dbConnection = connect_to_database();
	
		$serverReply = array();
		
		getListOfOverdueInspections($dbConnection, $serverReply);
		
		
		if ($serverReply["queryOutcome"] == "failure")
		{
			echo json_encode($serverReply);
		}
		
		getListOfUpcomingDueInspections($dbConnection, $serverReply);
		
		
		header("Access-Control-Allow-Origin: *");
   		header("Access-Control-Allow-Headers: *");

		echo json_encode($serverReply);
		mysqli_close($dbConnection);
	}

	
	/*
		Brief: Returns a array of hives that are overdue for inspection.
				
		Arguments:
			[1] $dbConnection - an object representing a connection to the MySQL database
			[2] &$serverReply - an object reference that contains the intended JSON serverReply
					reply to the client
		
		Pre-conditions:
			[1] The argument $dbConnection must already be initialised
			[2] The argument &serverReply must already be initialised to a PHP array
					
					
		Post-conditions:
			[1] If the query is successful, then the 'queryOutcome' property of
					the &$serverReply object reference will contain the value of 'success'.
					
					At the same time, the 'overdueInspections' property of the
					&$serverReply object reference will contain an array of overdue inspections
					
				Within each array element, it is an object containing
				 the various properties:
				 
					(a) "hiveId" - id of the hiveId that is overdue for inspection
					(b) "lastInspectionDate" - the date that this hive was last inspected
					(c) "nextInspectionDate" - the date that this hive was due for inspection
					
			[2] If the query is unsuccessful, the the 'queryOutcome' property of the 	
				&$serverReply object reference will contain the value of 'failure'.		

				At the same time, the 'errorMessage' property of the
				&$serverReply object reference will contain the value 'Failed to retrieve results'

	*/
	function getListOfOverdueInspections($dbConnection, &$serverReply)
	{
		$queryString = "SELECT HoneyHiveId, DATE_FORMAT(LastInspectionDate, '%d/%m/%Y') AS LastInspectionDate ,
											DATE_FORMAT(NextInspectionDate, '%d/%m/%Y') AS NextInspectionDate 
									FROM  HONEY_HIVE 
									WHERE NextInspectionDate < SYSDATE();";
									
		$queryResult = mysqli_query($dbConnection, $queryString);

		
        if (!$queryResult)
        {
            mysqli_close($db_connection);

            $serverReply["queryOutcome"] = "failure";
            $serverReply["errorMessage"] = "Failed to retrieve results";
			
			return ;
        }

        $serverReply["queryOutcome"] = "success";
        $serverReply["overdueInspections"] = array();
		$index = 0;
		
		while ($currentRow = mysqli_fetch_assoc($queryResult))
		{
			$serverReply["overdueInspections"][$index] = array();
			
			$serverReply["overdueInspections"][$index]["hiveId"] = $currentRow["HoneyHiveId"];
			$serverReply["overdueInspections"][$index]["lastInspectionDate"] = $currentRow["LastInspectionDate"];
			$serverReply["overdueInspections"][$index]["nextInspectionDate"] = $currentRow["NextInspectionDate"];
			$index++;
		}

	}
	
	
	/*
		Brief: Returns a array of hives that are about to be due in one week
				
		Arguments:
			[1] $dbConnection - an object representing a connection to the MySQL database
			[2] &$serverReply - an object reference that contains the intended JSON serverReply
					reply to the client
		
		Pre-conditions:
			[1] The argument $dbConnection must already be initialised
			[2] The argument &serverReply must already be initialised to a PHP array
		

		Pre-conditions:
			[1] The function getListOfOverdueInspection() must be called first, as
					
		Post-conditions:
			[1]  the 'overdueInspections' property of the &$serverReply object reference 
				will contain an array of upcoming inspections that are about to be due
					
				Within each array element, it is an object containing
				 the various properties:
				 
					(a) "hiveId" - id of the hiveId that is overdue for inspection
					(b) "lastInspectionDate" - the date that this hive was last inspected
					(c) "nextInspectionDate" - the date that this hive was due for inspection
				
	*/
	function getListOfUpcomingDueInspections($dbConnection, &$serverReply )
	{
		$queryString = "SELECT HoneyHiveId, DATE_FORMAT(LastInspectionDate, '%d/%m/%Y') AS LastInspectionDate ,
											DATE_FORMAT(NextInspectionDate, '%d/%m/%Y') AS NextInspectionDate  
									FROM  HONEY_HIVE 
									WHERE NextInspectionDate > SYSDATE() AND
									NextInspectionDate <= ADDDATE(SYSDATE(), INTERVAL 1 WEEK);";
									
		$queryResult = mysqli_query($dbConnection, $queryString);
		
        $serverReply["upcomingDueInspections"] = array();
		$index = 0;
		
		while ($currentRow = mysqli_fetch_assoc($queryResult))
		{
			$serverReply["upcomingDueInspections"][$index] = array();
			
			$serverReply["upcomingDueInspections"][$index]["hiveId"] = $currentRow["HoneyHiveId"];
			$serverReply["upcomingDueInspections"][$index]["lastInspectionDate"] = $currentRow["LastInspectionDate"];
			$serverReply["upcomingDueInspections"][$index]["nextInspectionDate"] = $currentRow["NextInspectionDate"];
			$index++;
		}
	}
	
?>