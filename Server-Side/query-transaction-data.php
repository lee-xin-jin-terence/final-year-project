<?php

	error_reporting(E_ALL);
    require('./database.php');

	$db_connection = connect_to_database();

    $client_request_data = file_get_contents('php://input');
    $client_json_obj = json_decode($client_request_data, true);

	$targetYear = $client_json_obj["targetYear"];
    $startMonth = $client_json_obj["startMonth"];
	$endMonth = $client_json_obj["endMonth"];
	$searchKeyword = $client_json_obj["searchKeyword"];
	
	$escTargetYear = mysqli_real_escape_string($db_connection , $targetYear);
	$escTargetYear = intval($escTargetYear);

	$escStartMonth = mysqli_real_escape_string($db_connection , $startMonth);
	$escStartMonth = intval($escStartMonth);

	$escEndMonth = mysqli_real_escape_string($db_connection , $endMonth);
	$escEndMonth = intval($escEndMonth);

	$escSearchKeyword = mysqli_real_escape_string($db_connection , $searchKeyword);
	$escSearchKeyword = strtolower($escSearchKeyword) ;
	

	$server_reply = array();

	$companyPurchaseTransactionQueryString = formTransactionQueryString($escTargetYear, $escStartMonth, $escEndMonth,  $escSearchKeyword,
																		"PURCHASE");

	$customerSalesTransactionQueryString = formTransactionQueryString($escTargetYear, $escStartMonth, $escEndMonth,  $escSearchKeyword,
																		"SALES");
	
	queryCompanyPurchaseTransactionData($db_connection, $companyPurchaseTransactionQueryString, $server_reply);
	
	queryCustomerSalesTransactionData($db_connection, $customerSalesTransactionQueryString, $server_reply);

	initialiseArrayOfSummaryDataByMonth( $server_reply);
	queryTotalRevenue($escTargetYear, $escStartMonth, $escEndMonth, $escSearchKeyword, $db_connection, $server_reply);
	queryTotalExpenditure($escTargetYear, $escStartMonth, $escEndMonth, $escSearchKeyword, $db_connection, $server_reply);
	calculateOverallProfitsByMonth( $server_reply);
	

	calculateRevenueExpenditureProfitsByYear( $server_reply);
	
	header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

	echo json_encode($server_reply);

	
	
	//get query string for every matched transaction record
	function formTransactionQueryString($escTargetYear, $escStartMonth, $escEndMonth,  $escSearchKeyword, 
													  $transactionType )
	{
		$queryString = "SELECT TransactionId, TransactionType, Description, TotalAmount, Date, ApiaristId
										FROM TRANSACTION
										WHERE YEAR(Date) = $escTargetYear AND
											  MONTH(Date) >= $escStartMonth  AND
											  MONTH(Date) <= $escEndMonth AND 
											  TransactionType = '$transactionType' ";
								
	
	
		if ($escSearchKeyword != '')
		{
			$queryString .= " AND LOWER(Description) LIKE '%$escSearchKeyword%'"; 
		}
	
	
		$queryString .= " ORDER By Date;";
		
		return $queryString;
	}
	
	
	
	
	
	function queryCompanyPurchaseTransactionData($db_connection, $transactionQueryString, &$server_reply)
	{
		$queryResult = mysqli_query($db_connection,$transactionQueryString);
		
		
		 if (!$queryResult)
        {
            mysqli_close($db_connection);

            $server_reply["queryOutcome"] = "failure";
            $server_reply["errorMessage"] = "No results found";
              
        }
		else
		{
			$server_reply["queryOutcome"] = "success";
			 
			$server_reply["results"]["companyPurchases"]= storeQueryResultsInArray($queryResult, $db_connection);
			

		}
	}
	
	

	function queryCustomerSalesTransactionData($db_connection, $transactionQueryString, &$server_reply)
	{
		$queryResult = mysqli_query($db_connection,$transactionQueryString);	
	
		$server_reply["results"]["customerSales"]= storeQueryResultsInArray($queryResult, $db_connection);
			
	}



	
	function storeQueryResultsInArray($queryResult)
	{
		$results_index = 0;

        $array_to_return = array();
		
        while($currentRow = mysqli_fetch_assoc($queryResult))
        {
			$array_to_return[$results_index] = array();
			$array_to_return[$results_index]["transactionId"] =  $currentRow['TransactionId'];
            $array_to_return[$results_index]["description"] =  $currentRow['Description'];
            $array_to_return[$results_index]["totalAmount"] =  (float) $currentRow['TotalAmount'];
			$array_to_return[$results_index]["date"] =  $currentRow['Date'];
			$array_to_return[$results_index]["apiaristId"] =  $currentRow['ApiaristId'];

            $results_index++;
        }


        return $array_to_return;
	}
	
	function initialiseArrayOfSummaryDataByMonth( &$server_reply)
	{
		$server_reply["results"]["overallSummaryByMonth"] = array();

		for ($i=0; $i <12; $i++)
		{
			$server_reply["results"]["overallSummaryByMonth"][$i] = array();
			$server_reply["results"]["overallSummaryByMonth"][$i]["overallProfits"] = 0;
			$server_reply["results"]["overallSummaryByMonth"][$i]["totalExpenditure"] = 0;
			$server_reply["results"]["overallSummaryByMonth"][$i]["totalRevenue"] = 0;
		}
	}

	
	function queryTotalRevenue($escTargetYear, $escStartMonth, $escEndMonth, $escSearchKeyword,  $db_connection, &$server_reply)
	{
		$queryString = "SELECT  IFNULL(SUM(TotalAmount), 0) AS TotalRevenue, MONTH(Date) AS Month
										FROM TRANSACTION
										WHERE YEAR(Date) = $escTargetYear AND
											  MONTH(Date) >= $escStartMonth  AND
											  MONTH(Date) <= $escEndMonth AND 
											  TransactionType = 'SALES' AND
											  Description LIKE '%$escSearchKeyword%'
										GROUP BY MONTH(Date)
                                        ORDER By MONTH(Date);";

		$queryResult = mysqli_query($db_connection,$queryString);
		echo mysqli_error($db_connection);
		

		while($currentRow = mysqli_fetch_assoc($queryResult))
		{
			$currentMonth =  intval($currentRow["Month"]) -1;

			
			$server_reply["results"]["overallSummaryByMonth"][$currentMonth]["totalRevenue"] =  floatval($currentRow["TotalRevenue"]);
		
		}

		
		
	}
	
	
	function queryTotalExpenditure($escTargetYear, $escStartMonth, $escEndMonth, $escSearchKeyword, $db_connection, &$server_reply)
	{
		$queryString = "SELECT  IFNULL(SUM(TotalAmount), 0) AS TotalExpenditure , MONTH(Date) AS Month
										FROM TRANSACTION
										WHERE YEAR(Date) = $escTargetYear AND
											  MONTH(Date) >= $escStartMonth  AND
											  MONTH(Date) <= $escEndMonth AND 
											  TransactionType = 'PURCHASE' AND
											  Description LIKE '%$escSearchKeyword%'
										GROUP BY  MONTH(Date)
                                        ORDER By  MONTH(Date);";
	
		$queryResult = mysqli_query($db_connection,$queryString);
		
		
		while($currentRow = mysqli_fetch_assoc($queryResult))
		{
			$currentMonth =  intval($currentRow["Month"]) -1;

			
			$server_reply["results"]["overallSummaryByMonth"][$currentMonth]["totalExpenditure"] =  floatval($currentRow["TotalExpenditure"]);
		
		}


		
	}
	
	

	
	
	function calculateOverallProfitsByMonth( &$server_reply)
	{

		for($i=0; $i<12; $i++)
		{
			$totalExpenditure = $server_reply["results"]["overallSummaryByMonth"][$i]["totalExpenditure"];
			$totalRevenue = $server_reply["results"]["overallSummaryByMonth"][$i]["totalRevenue"];
			$overallProfits = $totalRevenue -$totalExpenditure;
			$server_reply["results"]["overallSummaryByMonth"][$i]["overallProfits"] =$overallProfits;
		}
		

	}
	


	function calculateRevenueExpenditureProfitsByYear( &$server_reply)
	{
		$totalExpenditure = 0;
		$totalRevenue= 0;
		$overallProfits = 0;

		for($i=0; $i<12; $i++)
		{
			$totalExpenditure += $server_reply["results"]["overallSummaryByMonth"][$i]["totalExpenditure"];
			$totalRevenue += $server_reply["results"]["overallSummaryByMonth"][$i]["totalRevenue"];
		}
		
		$overallProfits = $totalRevenue - $totalExpenditure;


		$server_reply["results"]["overallSummaryByYear"]["totalExpenditure"] = $totalExpenditure;
		$server_reply["results"]["overallSummaryByYear"]["totalRevenue"] = $totalRevenue;
		$server_reply["results"]["overallSummaryByYear"]["overallProfits"] = $overallProfits;
	}
?>