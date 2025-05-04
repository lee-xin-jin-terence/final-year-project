import React from "react";
import "./Home_C.css";

import { useState, useEffect } from "react";



function ViewEvent() {

  var [hiveId, setHiveId] = useState('');
  var [targetYear, setTargetYear] = useState('');
  var [startMonth, setStartMonth] = useState('');
  var [endMonth, setEndMonth] = useState('');

  var [titleHeaderHTML, setTitleHeaderHTML] = useState('<p>Select a Hive, Start Date and End Date to Begin</p>');

  var [table, setTableContent] = useState("");
  

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



  function validateInput(e){
    e.preventDefault();

    if(hiveId == "")
    {
    	alert("Please select a Hive Id");
      return;
    }
    else if (targetYear == "")
    {
      alert("Please select a target year")
    }
    else if (startMonth === "")
    {
      alert("Please select a start month")
    }
    else if (endMonth === "")
    {
      alert("Please select a end month");
    }
    else{
      sendDataToServer();
    }
  }


  function sendDataToServer()
  {
      
    let requestObject = {
      "hiveId" : hiveId,
      "targetYear": targetYear,
      "startMonth": startMonth,
      "endMonth": endMonth
    };


    let jsonEncodedRequestObject = JSON.stringify(requestObject);
  
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
          
        if (this.readyState === 4 && this.status !== 200)
        {
      
          return;
        }

        if (this.readyState === 4 && this.status === 200)
        {
          
          var receivedReplyObject = JSON.parse(this.responseText);

          if (receivedReplyObject["queryOutcome"] === "success")
          {
            
              displayTitleHeader();
              displayResultsTable(receivedReplyObject["results"]);
            
            
          }
          else
          {
              setTableContent("Failed to query events data");
			
          }
        }
    };
      
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/query-hive-event-data.php", true);
    
    xhr.send(jsonEncodedRequestObject);
  }


  function displayTitleHeader()
  {
    let months = ["January", "February", "March", "April", "May", "June",
					 "July", "August", "September", "October", "November", "December"];

		let startMonthString = months[parseInt(startMonth) - 1];
		let endMonthString = months[parseInt(endMonth) - 1];

		let titleHeader = `<div>
								<h2>Search Results for Year ${targetYear}, from ${startMonthString} to ${endMonthString} for ${hiveId}</h2>`;
			
	

		titleHeader += `</div>`;

		setTitleHeaderHTML(titleHeader);
  }



  function displayResultsTable(result)
  {
    //let formattedStartDate = convertDateToDisplayFormat(startDate);
    //let formattedEndDate = convertDateToDisplayFormat(endDate);

    let tableContentHTML = ``;

    if (result.length == 0)
    {
      tableContentHTML += `	<p>There are no event records found within this date period</p>
								</div>`;
      
      setTableContent(tableContentHTML);
      return;
    }


    tableContentHTML += `<table>
                          <tr>
                            <th>Event Id</th>
                            <th>Event Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Weather Condition</th>
                            <th>Apiarist Id</th>
                          </tr>`;

    for(var i = 0; i < result.length; i++)
    {
	
      var eventId = result[i]["eventId"];
      var eventType = result[i]["eventType"];
      var date = result[i]["date"];
      var desc = result[i]["description"];
      var weatherCondition = result[i]["weatherCondition"];
      var apiaristId = result[i]["apiaristId"];
	
	    tableContentHTML += `<tr>
                        <td>${eventId}</td>
                        <td>${eventType}</td>
                        <td>${date}</td>
                        <td>${desc}</td>
                        <td>${weatherCondition}</td>
                        <td>${apiaristId}</td>
                      </tr>`;  
    }

    tableContentHTML += "</table>";

    setTableContent(tableContentHTML);
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
      <h1>View Hive Event Records</h1>

      <div className="form-inputs-f-container">
			<div className="form-inputs-f">
				<label className="form-label-f">Select a Hive (Required)</label>
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
			
			<button onClick={e=>validateInput(e)} className="form-input-btn-f" >
				Search
			</button>

		</div>
	  
      
      <div dangerouslySetInnerHTML={{__html: titleHeaderHTML}}></div>
      <div className="tableHolder" dangerouslySetInnerHTML={{__html: table}}></div>
		
    </div>
  );
}
export default ViewEvent;
