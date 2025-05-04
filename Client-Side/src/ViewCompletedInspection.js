
/*
	File Name: ViewCompletedInspection.js
	Purpose: Display two tables, one containing a list of overdue inspections, and
				another display a list of upcoming due inspections
				
	Author: Cai JianBo, Hoon Wei Xiong, Terence Lee
	Date: 15 November 2021
*/


import React from "react";
import "./Home_C.css";
import { useState, useEffect } from 'react';


function ViewCompletedInspection() 
{

	var [hiveId, setHiveId] = useState("");
	var [targetYear, setTargetYear] = useState('');
	var [startMonth, setStartMonth] = useState('');
	var [endMonth, setEndMonth] = useState('');

  	var [inspectionRecordsTableContent, setInspectionRecordsTableContent] = 
  			useState("<p>Please Select a Hive, Start Date and End Date to Begin</p>");



  
  /*
	
  */
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
  



	

	function validateInput()
	{
		
		if (hiveId === "")
		{
			alert("You did not select a Hive Id")
		}
		else if (targetYear === "")
		{
			alert("You did not select the Target Year");
		}
		else if (startMonth === "")
		{
			alert("You did not select the Start Month");
		}
		else if (endMonth === "")
		{
			alert("You did not select the End Month");
		}
		else
		{
			sendDataToServer();
		}
		
	}
	
	function sendDataToServer()
	{
		let xhr = new XMLHttpRequest();
		
		let requestObj = {
			"hiveId": hiveId,
			"targetYear": targetYear,
			"startMonth" : startMonth,
			"endMonth" : endMonth
		};
		
		
		let requestObjStr = JSON.stringify(requestObj);
		
		xhr.onreadystatechange = function (){
			  
			if (this.readyState === 4 && this.status !== 200)
			{
				//display error message
				return;
			}

			if (this.readyState === 4 && this.status === 200)
			{
				console.log(this.responseText);
				var receivedReplyObject = JSON.parse(this.responseText);

				if (receivedReplyObject["queryOutcome"] === "success")
				{
					displayInspectionsRecordsTable(receivedReplyObject);
				}
			}
		};
		
		//remove port number 1234
		xhr.open("POST", "http://localhost:1234/query-completed-inspection-data.php", true);
	
		
		xhr.send(requestObjStr);
	}


	
	/*
		Brief:
			Display a table containining a list of all overdue inspections.
			
			If there are no overdue inspections, then a message saying so will be displayed
			
			Arguments:
				[1] result - the JSON object containing the reply from the server. Within
						this object, there is an array that containing a list of overdue inspections
						
			Post-Conditions:
				The table containing a list of overdue inspections will be displayed
	*/
  	function displayInspectionsRecordsTable(result)
	{
		let months = ["January", "February", "March", "April", "May", "June",
					 "July", "August", "September", "October", "November", "December"];

		let startMonthString = months[parseInt(startMonth) - 1];
		let endMonthString = months[parseInt(endMonth) - 1];

		let tableContentHTML = `<div><h3>Inspection Records of ${hiveId} For Year ${targetYear} 
							From ${startMonthString} to ${endMonthString}</h3>`;


		if (result["results"].length === 0)
		{
			tableContentHTML += `	<p>There are no inspection records found within this date period</p>
								</div>`;
			
			setInspectionRecordsTableContent(tableContentHTML);
			
			return;
		}  
		
		
		tableContentHTML += `<table>
								<tr>
									<th>Inspection Id</th>
									<th>Inspection Due Date</th>
									<th>Inspection Actual Date</th>
									<th>Description</th>
									<th>Weather Condition</th>
									<th>Outcome</th>
									<th>Apiarist Who Inspected</th>
								</tr>`;
													
		for(var i = 0; i < result.results.length; i++){
		
			let inspectionDueDate = convertDateToDisplayFormat(result["results"][i]["inspectionDueDate"]);
			let inspectionActualDate = convertDateToDisplayFormat(result["results"][i]["inspectionActualDate"]);

			tableContentHTML += `<tr>
									<td>${result["results"][i]["inspectionId"]}</td>
									<td>${inspectionDueDate}</td>
									<td>${inspectionActualDate}</td>
									<td>${result["results"][i]["description"]}</td>
									<td>${result["results"][i]["weatherCondition"]}</td>
									<td>${result["results"][i]["outcome"]}</td>
									<td>${result["results"][i]["apiaristId"]}</td>
								</tr>`;  
		}

		tableContentHTML += "</table></div>";

		setInspectionRecordsTableContent(tableContentHTML);
	
		
	}//end of function displayOverdueInspectionsTable


	function convertDateToDisplayFormat(dateString)
	{
		let dateArray = dateString.split("-");

		let day = dateArray[2];
		let month = dateArray[1];
		let year = dateArray[0];

		return day + "/" + month + "/" + year;
	}

	return (
		<div >
			<h1>View Hive Inspection Records</h1>

			<div className="form-inputs-f-container">
				<div className="form-inputs-f">
					<label className="form-label-f">Select a Hive (Required) </label>
					<select className="form-input-f" onInput={e=>setHiveId(e.target.value)} >
						<option value="">---Please Select a Hive---</option>
						<option value="Hive-1">Hive-1</option>
						<option value="Hive-2">Hive-2</option>
						<option value="Hive-3">Hive-3</option>
						<option value="Hive-4">Hive-4</option>
						<option value="Hive-5">Hive-5</option>
						<option value="Hive-6">Hive-6</option>
					</select>
				</div>
				
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
				
				<button onClick={validateInput} className="form-input-btn-f" >
					Search
				</button>

			</div>
			
			
			
			

			<div className="tableHolderTop" dangerouslySetInnerHTML={{__html: inspectionRecordsTableContent}}></div> 
			

	
		</div>
	);
}


export default ViewCompletedInspection;