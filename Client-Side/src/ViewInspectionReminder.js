
/*
	File Name: ViewInspectionReminder.js
	Purpose: Display two tables, one containing a list of overdue inspections, and
				another display a list of upcoming due inspections
				
	Author: Cai JianBo, Hoon Wei Xiong, Terence Lee
	Date: 15 November 2021
*/


import React from "react";
import "./Home_C.css";
import { useState, useEffect } from 'react';


function ViewInspectionReminders() {


  var [overdueInspectionsTableContent, setOverdueInspectionsTableContent] = useState("");
  var [upcomingDueInspectionsTableContent, setUpcomingDueInspectionsTableContent] = useState("");
  var [result, setResult] = useState(null);
  var [emailSendingMessageStatus, setEmailSendingMessageStatus] = useState('');
  var [emailAddress, setEmailAddress] = useState("");
  

  /*
	Each time the page is rendered, request for data from the server
  */
  useEffect(
	()=>{
			requestForDataFromServer();
	}, []);
  
  /*
	Brief:
		Make an ajax call to the server. Will retrieve a list of overdue inspections and a list
		of upcoming inspections about to be due
		These retrieved list of data will then be displayed in a the page
		
  */
  function requestForDataFromServer()
  {
      
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
          
        if (this.readyState === 4 && this.status !== 200)
        {
			console.log("An error has occurred")
          return;
        }

        if (this.readyState === 4 && this.status === 200)
		{

          var receivedReplyObject = JSON.parse(this.responseText);

			if (receivedReplyObject["queryOutcome"] === "success")
			{
           
				console.log("Query is successful" )
				
				setResult(receivedReplyObject);
				displayOverdueInspectionsTable(receivedReplyObject);
				displayUpcomingDueInspectionsTable(receivedReplyObject);
			}
		}
    };
    
	
	
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/query-inspection-reminder-data.php", true);
	
	
    xhr.send();
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
  function displayOverdueInspectionsTable(result)
  {
	 
	var tableContentHTML;


	if (result["overdueInspections"].length === 0)
	{
		tableContentHTML = `<div id="tableContents">
									<p>There are no overdue inspections</p>
									</div>`;
		
		setOverdueInspectionsTableContent(tableContentHTML);
		return;
	}  
	  
	  
    tableContentHTML = `<div id="tableContents">
							<table id="hiveTable">
								<tr>
									<th>Hive Id</th>
									<th>Last Inspection Date</th>
									<th>Inspection Due Date</th>
								</tr>`;
												
    for(var i = 0; i < result.overdueInspections.length; i++){
	
      	var hiveId = result["overdueInspections"][i]["hiveId"];
      	var lastInspectionDate = result["overdueInspections"][i]["lastInspectionDate"];
      	var inspectionDueDate = result["overdueInspections"][i]["nextInspectionDate"];
	
		tableContentHTML += `<tr><td>${hiveId}</td>
										<td>${lastInspectionDate}</td>
										<td>${inspectionDueDate}</td>
										</tr>`;  
    }

	tableContentHTML += "</table></div>";

    setOverdueInspectionsTableContent(tableContentHTML);
	
	
  }//end of function displayOverdueInspectionsTable


  /*
		Brief:
			Display a table containining a list of all upcoming inspections that are about to
			be due.
			
			If there are no upcoming due inspections, then a message saying so will be displayed
			
			Arguments:
				[1] result - the JSON object containing the reply from the server. Within
						this object, there is an array that containing a list of upcoming due inspections
						
			Post-Conditions:
				The table containing a list of upcoming due inspections will be displayed
	*/
  function displayUpcomingDueInspectionsTable(result)
  {
	 
	var tableContentHTML;


	if (result["upcomingDueInspections"].length === 0)
	{
		tableContentHTML = `<div >
									<p>There are no upcoming inspections</p>
									</div>`;
		
		setUpcomingDueInspectionsTableContent(tableContentHTML);
		return;
	}  
	  
	  
    tableContentHTML = `<div>
							<table ><tr>
							<th>Hive Id</th>
							<th>Last Inspection Date</th>
							<th>Inspection Due Date</th>
						</tr>`;
												
    for(var i = 0; i < result.upcomingDueInspections.length; i++){
	
      var hiveId = result["upcomingDueInspections"][i]["hiveId"];
      var lastInspectionDate = result["upcomingDueInspections"][i]["lastInspectionDate"];
      var inspectionDueDate = result["upcomingDueInspections"][i]["nextInspectionDate"];
	
	    tableContentHTML += `<tr><td>${hiveId}</td>
										<td>${lastInspectionDate}</td>
										<td>${inspectionDueDate}</td>
										</tr>`;  
    }

	tableContentHTML += "</table></div>";

    setUpcomingDueInspectionsTableContent(tableContentHTML);
	
	
  }//end of function displayOverdueInspectionsTable


	function validateEmailAddress()
	{
		// a regex pattern that checks whether a string is a valid email
		// expecting at least one charcter before and a character after the '@' character
		let emailRegex = /.+@.+/;
		
		
		if (emailAddress === "")
		{
			alert("You did not enter an email address")
		}
		else if (!emailAddress.match(emailRegex))
		{
			alert("You did not enter a valid email address");
		}
		else
		{
			sendReminderToEmail(emailAddress);
		}	
	}
	
	function sendReminderToEmail(emailAddress)
	{
		let xhr = new XMLHttpRequest();
		
		let requestObj = {
			"emailAddress": emailAddress,
			"overdueInspections": result["overdueInspections"],
			"upcomingDueInspections": result["upcomingDueInspections"]
		};
		
		let requestObjStr = JSON.stringify(requestObj);
		
		setEmailSendingMessageStatus("Please wait while email is being sent");
		
		xhr.onreadystatechange = function (){
			  
			if (this.readyState === 4 && this.status !== 200)
			{
				setEmailSendingMessageStatus('');
			 	return;
			}

			if (this.readyState === 4 && this.status === 200)
			{
				console.log(this.responseText);
			  	var receivedReplyObject = JSON.parse(this.responseText);

				if (receivedReplyObject["sendEmailOutcome"] === "success")
				{
					alert("Email reminder successfully sent to " + emailAddress);
				}
				else
				{
					alert("Non-existent email address provided. Failed to send email reminder to " + emailAddress);
				}

				setEmailSendingMessageStatus('');
			}
		};
		

		xhr.open("POST", "http://localhost:1234/send-reminder-email.php", true);
	
		xhr.send(requestObjStr);
	}

  return (
    <div >
		<h1>Inspection Reminders</h1>
		 
		  <h2>Overdue Inspections</h2>
		  <div className="tableHolderTop" dangerouslySetInnerHTML={{__html: overdueInspectionsTableContent}}></div>

		  
		  <h2>Upcoming Inspections</h2>
		  <div className="tableHolderTop" dangerouslySetInnerHTML={{__html: upcomingDueInspectionsTableContent}}></div>
		  
		  
		  {
			  
			  (result !== null && (result["overdueInspections"].length !== 0 
			  		|| result["upcomingDueInspections"].length !== 0))? 
				(
			
				<div>
					<span className="span-email-message">{emailSendingMessageStatus}</span>
					<div className="form-inputs-e">
							
							<input
							className="form-input-e"
							type="email"
							placeholder="Enter Email Address"
							onInput = {e=>setEmailAddress(e.target.value.trim()) }
							/>
						
						<button className="form-input-btn-g" onClick={validateEmailAddress} >Send Reminders To My Email
						</button>
					</div>
			</div>):

			null
			  
			
			
			  
		  }
		  
		  
		  
    </div>
  );
}


export default ViewInspectionReminders;
