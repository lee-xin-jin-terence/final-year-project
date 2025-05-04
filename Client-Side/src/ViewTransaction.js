/*
  File Name: ViewTransaction.js
  Authors: Hoon Wei Xiong, Cai JianBo, Terence Lee
  Date: 1 November 2021
  
  Purpose: To allow users to be able to view transaction records 
*/ 


import React from "react";
import "./Home_C.css";
import { useState, useEffect } from 'react';

function ViewTransaction() {


	var [targetYear, setTargetYear] = useState('');
	var [startMonth, setStartMonth] = useState('');
	var [endMonth, setEndMonth] = useState('');

	var [hasClickedSearch, setHasClickedSearch] = useState(false);

	var [searchKeyword, setSearchKeyword] = useState('');
  
	var [titleHeaderHTML, setTitleHeaderHTML] = useState('<p>Select Year, Start Date and End Date to Begin</p>');

	var [summaryTableByYearHTML, setSummaryTableByYearHTML] = useState('');

	var [summaryTableByMonthHTML, setSummaryTableByMonthHTML] = useState('');

	var [customerSalesRecordsTableHTML, setCustomerSalesRecordsTableHTML] =  useState('');

	var [companyPurchaseRecordsTableHTML, setCompanyPurchaseRecordsTableHTML] =  useState('');

	useEffect(()=>{

		if (startMonth !== '')
		{
			if (endMonth === '' || parseInt(endMonth) < parseInt(startMonth))
			{
				setEndMonth(startMonth);
			}


			//setFormattedStartDate(convertDateToDisplayFormat(startDate));
		}
		
		
		

	},[startMonth]);



	useEffect(()=>{

		if (endMonth !== '')
		{
			if (startMonth === '' || parseInt(startMonth) > parseInt(endMonth))
			{
				setStartMonth(endMonth);
			}
		}
		
		//setFormattedEndDate(convertDateToDisplayFormat(endDate));


	},[endMonth]);



	function validateData(e){

		e.preventDefault();

		if (targetYear == "")
		{
			alert('No target year selected');
		}
		else if(startMonth === '')
		{
			alert('No start month selected');
		}
		else if (endMonth === '')
		{
			alert('No end month selected');
		}
		else
		{
			sendDataToServer();
		}
	}


  function sendDataToServer(criteria)
  {
      
    let requestObject = {
	  "targetYear": targetYear,
      "startMonth" : startMonth,
	  "endMonth" : endMonth,
	  "searchKeyword": searchKeyword
    };


	let jsonEncodedRequestObject = JSON.stringify(requestObject);
  
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
		

        if (this.readyState === 4 && this.status !== 200)
        {
			console.log(this.responseText);
			alert("An server error has occurred");
        	return;
        }

        if (this.readyState === 4 && this.status === 200)
		{
			console.log(this.responseText);
        	var receivedReplyObject = JSON.parse(this.responseText);

			if (receivedReplyObject["queryOutcome"] === "success")
			{
				setHasClickedSearch(true);
				console.log(this.responseText)
				console.log("Query is successful" );
				
				displayTitleHeader();
				createTransactionByYearSummaryTable(receivedReplyObject["results"]["overallSummaryByYear"]);
				createTransactionByMonthSummaryTable(receivedReplyObject["results"]["overallSummaryByMonth"]);
				createCompanyPurchasesTable(receivedReplyObject["results"]["companyPurchases"]);
				createCustomerSalesTable(receivedReplyObject["results"]["customerSales"]);
			}
			else
			{
				console.log(this.responseText);
			}
		}
    };
      
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/query-transaction-data.php", true);
    
    xhr.send(jsonEncodedRequestObject);
  }

  	function displayTitleHeader()
	{
		let months = ["January", "February", "March", "April", "May", "June",
					 "July", "August", "September", "October", "November", "December"];

		let startMonthString = months[parseInt(startMonth) - 1];
		let endMonthString = months[parseInt(endMonth) - 1];

		let titleHeader = `<div>
								<h2>Search Results for Year ${targetYear}, From ${startMonthString} to ${endMonthString}</h2>
							  `;
			
		
		if (searchKeyword !== "")
		{
			titleHeader += `<h2>Search Keyword: ${searchKeyword}</h2>`;
		}

		titleHeader += `</div>`;

		setTitleHeaderHTML(titleHeader);
	}

	function createTransactionByYearSummaryTable(summaryData)
	{
		let tableContent;

		if (summaryData === "undefined")
		{
			tableContent = "No Summary Data Available";
			return;
		}

		let totalRevenue = "$" +  summaryData["totalRevenue"].toFixed(2);
		let totalExpenditure = "- $" +  summaryData["totalExpenditure"].toFixed(2);
		let overallProfits = summaryData["overallProfits"];

		if (overallProfits < 0)
		{
			overallProfits = "- $" + Math.abs(overallProfits).toFixed(2);
		}
		else
		{
			overallProfits = "$" + overallProfits.toFixed(2);
		}


		tableContent = `<table>
								<tr>
									<th></th>
									<th>Amount</th>
								</tr>
								<tr>
									<th>Total Revenue</th>
									<td>${totalRevenue}</td>
								<tr>
								<tr>
									<th>Total Expenditure</th>
									<td>${totalExpenditure}</td>
								<tr>
								<tr>
									<th>Total Overall Profits</th>
									<td>${overallProfits}</td>
								<tr>
						</table>`;

		setSummaryTableByYearHTML(tableContent);
  	}


	function createTransactionByMonthSummaryTable(summaryData)
	{
		let tableContent;

		if (summaryData === "undefined")
		{
			tableContent = "No Summary Data Available";
			return;
		}


		tableContent = `<table id="hiveTable">
								<tr>
									<th></th>
									<th>Jan</th>
									<th>Feb</th>
									<th>Mar</th>
									<th>Apr</th>
									<th>May</th>
									<th>Jun</th>
									<th>Jul</th>
									<th>Aug</th>
									<th>Sep</th>
									<th>Oct</th>
									<th>Nov</th>
									<th>Dec</th>
								</tr>`;

		tableContent += `<tr>
							<th>Total Revenue</th>`;

		for (let i=0; i < summaryData.length; i++)
		{
			
			let totalRevenueVal;

			if (i < (parseInt(startMonth) -1)  || i > (parseInt(endMonth) -1))
			{
				totalRevenueVal = "N/A";
			}
			else
			{
				totalRevenueVal = "$" + summaryData[i]["totalRevenue"].toFixed(2);
			}

			tableContent +=	`<td>${totalRevenueVal}</td>`;
		}
		
		tableContent += `</tr>
						<tr>
							<th>Total Expenditure</th>`;

		for (let i=0; i < summaryData.length; i++)
		{
			let totalExpenditureVal;

			if (i < (parseInt(startMonth) -1)  || i > (parseInt(endMonth) -1) )
			{
				totalExpenditureVal = "N/A";
			}
			else
			{
				totalExpenditureVal = "- $" + summaryData[i]["totalExpenditure"].toFixed(2);
			}

			tableContent +=	`<td>${totalExpenditureVal}</td>`;
		}
							

		tableContent += `</tr>
						<tr>
							<th>Overall Profits</th>`;

		for (let i=0; i < summaryData.length; i++)
		{
			let profitsVal = summaryData[i]["overallProfits"];

			if (i < (parseInt(startMonth) -1)  || i > (parseInt(endMonth) -1))
			{
				profitsVal = "N/A";
			}
			else
			{	
				if (profitsVal < 0)
				{
					profitsVal = "- $" + Math.abs(summaryData[i]["overallProfits"]).toFixed(2);
				}
				else
				{
					profitsVal = "$" + profitsVal.toFixed(2);
				}
				
			}

			tableContent +=	`<td>${profitsVal}</td>`;
		}


		tableContent += `	</tr>
						</table>`;

		setSummaryTableByMonthHTML(tableContent);
	}


	function createCompanyPurchasesTable(arrayOfCompanyPurchaseRecords)
	{

		let tableContent;

		if (arrayOfCompanyPurchaseRecords.length === 0)
		{
			tableContent = "Zero Records of Company Purchase Transaction Records Found";
			setCompanyPurchaseRecordsTableHTML(tableContent);

			return;
		}


		tableContent = `<div id="tableContents">
							<table id="hiveTable">
								<tr>
									<th>Transaction ID</th>
									<th>Date</th>
									<th>Expenses</th>
									<th>Description</th>
									<th>Apiarist Who Conducted Transaction</th>
								</tr>`;

		for(var i = 0; i < arrayOfCompanyPurchaseRecords.length; i++)
		{
		
		let transactionId = arrayOfCompanyPurchaseRecords[i]["transactionId"];
		let date = arrayOfCompanyPurchaseRecords[i]["date"];
		date = convertDateToDisplayFormat(date);

		let totalAmount = arrayOfCompanyPurchaseRecords[i]["totalAmount"];
		let description = arrayOfCompanyPurchaseRecords[i]["description"];
		let apiaristId = arrayOfCompanyPurchaseRecords[i]["apiaristId"];
		
			tableContent += `<tr>
								<td>${transactionId}</td>
								<td>${date}</td>
								<td>- $ ${totalAmount.toFixed(2)}</td>
								<td>${description}</td>
								<td>${apiaristId}</td>
							</tr>`;  
		}

		tableContent += "</table>";

		setCompanyPurchaseRecordsTableHTML(tableContent);
	}




	function createCustomerSalesTable(arrayOfCustomerSalesRecords)
	{

		let tableContent;

		if (arrayOfCustomerSalesRecords.length === 0)
		{
			tableContent = "Zero Records of Customer Sales Records Found";
			setCustomerSalesRecordsTableHTML(tableContent);

			return;
		}

		
		tableContent = `<div >
							<table >
								<tr>
									<th>Transaction ID</th>
									<th>Date</th>
									<th>Revenue</th>
									<th>Description</th>
									<th>Apiarist Who Conducted Transaction</th>
								</tr>`;

		for(var i = 0; i < arrayOfCustomerSalesRecords.length; i++)
		{
		
			let transactionId = arrayOfCustomerSalesRecords[i]["transactionId"];
			let date = arrayOfCustomerSalesRecords[i]["date"];
			date = convertDateToDisplayFormat(date);

			let totalAmount = arrayOfCustomerSalesRecords[i]["totalAmount"];
			let description = arrayOfCustomerSalesRecords[i]["description"];
			let apiaristId = arrayOfCustomerSalesRecords[i]["apiaristId"];
		
			tableContent += `<tr>
								<td>${transactionId}</td>
								<td>${date}</td>
								<td>$ ${totalAmount.toFixed(2)}</td>
								<td>${description}</td>
								<td>${apiaristId}</td>
							</tr>`;  
		}

		tableContent += "</table>";

		setCustomerSalesRecordsTableHTML(tableContent);
	}

	
	function convertDateToDisplayFormat(dateString)
	{
		let dateArray = dateString.split("-");

		let day = dateArray[2];
		let month = dateArray[1];
		let year = dateArray[0];

		return day + "/" + month + "/" + year;
	}

  return (
  	<div>
		<h1>View Transaction Records</h1>
		<div className="form-inputs-f-container">

		<div className="form-inputs-f">
			<label className="form-label-f">Target Year (Required)</label>
			<select
				className="form-input-f"
				type="text"
				name="searchKeyword"
				placeholder="Search Keyword (Optional)"
				onInput = {e=>setTargetYear(e.target.value.trim())}>
				
				<option value="">---Please Select a Target Year---</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
				<option value="2024">2024</option>
				<option value="2025">2025</option>
			</select>
		</div>

		<div className="form-inputs-f">
			<label className="form-label-f">Start Month (Required) </label>
			<select
				className="form-input-f"
				type="date"
				name="startMonth"
				value = {startMonth}
				placeholder="Select Start Date"
				onInput={e=>setStartMonth(e.target.value)}>
				<option value="">---Please Select a Start Month---</option>
				<option value="1">January</option>
				<option value="2">February</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
		</div>
		<div className="form-inputs-f">
			<label className="form-label-f">End Month (Required)</label>
			<select
				className="form-input-f"
				type="date"
				name="endMonth"
				value={endMonth}
				placeholder="Enter Hive ID"
				onInput={e=>setEndMonth(e.target.value)}
			>
				<option value="">---Please Select an End Month---</option>
				<option value="1">January</option>
				<option value="2">February</option>
				<option value="3">March</option>
				<option value="4">April</option>
				<option value="5">May</option>
				<option value="6">June</option>
				<option value="7">July</option>
				<option value="8">August</option>
				<option value="9">September</option>
				<option value="10">October</option>
				<option value="11">November</option>
				<option value="12">December</option>
			</select>
		</div>

		<div className="form-inputs-f">
			<label className="form-label-f">Search Keyword (Optional)</label>
			<input
				className="form-input-f"
				type="text"
				name="searchKeyword"
				placeholder="Enter Search Keyword"
				onInput={e=>setSearchKeyword(e.target.value.trim())}
			/>

		</div>

		<button className="form-input-btn-f" type="submit" onClick={(e) => validateData(e)}>
			Search
		</button>
		
		</div>
		
		{(!hasClickedSearch)?
		
			(<p>Select Year, Start Date and End Date to Begin</p>):
		
			
			<div>
				<div  dangerouslySetInnerHTML={{__html: titleHeaderHTML}}></div>

				<h3>Overall Annual Transaction Summary</h3>

				<div className="tableHolderTop" dangerouslySetInnerHTML={{__html: summaryTableByYearHTML}} >
				</div>

				<h3><span style={{backgroundColor: "gold", padding: "3px"}}>Monthly Transaction Summary</span></h3>

				<div className="tableHolderTop" dangerouslySetInnerHTML={{__html: summaryTableByMonthHTML}} >
				</div>


				<h3>Company Expenditure Transaction Records</h3>

				<div className="tableHolderTop" dangerouslySetInnerHTML={{__html: companyPurchaseRecordsTableHTML}}>
				</div>

				<h3>Customer Sales Transaction Records</h3>

				<div className="tableHolderTop" dangerouslySetInnerHTML={{__html: customerSalesRecordsTableHTML}}>
				</div>
			</div>
		}
		

	</div>
  );
}
export default ViewTransaction;
