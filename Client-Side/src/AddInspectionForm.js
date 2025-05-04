import React from "react";
import "./AddForms.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
const InspectionForm = () => {
  const history = useHistory();

  const [hiveId, setHiveId] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [inspectionOutcome, setInspectionOutcome] = useState('');
  const [description, setDescription] = useState('');
  const [apiaristId, setApiaristId] = useState('');

  function validateInput(e)
  {
    e.preventDefault();

    if (hiveId=='')
    {
      alert("Please select the Hive Id");
    }
    else if (inspectionDate == '')
    {
      alert("Please select the inspection date");
    }
    else if (inspectionOutcome == '')
    {
      alert("Please select the inspection outcome");
    }
    else if(description == '')
    {
      alert("Please enter the description");
    }
    else if(weatherCondition == '')
    {
      alert("Please select the weather condition");
    }
    else if (apiaristId == '')
    {
      alert("Please select the apiarist id of the apiarist who performed the inspection");
    }
    else
    {
      sendDataToServer();
    }
  }

  function sendDataToServer()
  {
      
    let requestObject = {
      "honeyHiveId" : hiveId,
      "inspectionDate": inspectionDate,
      "inspectionOutcome": inspectionOutcome,
      "description": description,
      "weatherCondition": weatherCondition,
      "apiaristId" : apiaristId

    };


    let jsonEncodedRequestObject = JSON.stringify(requestObject);
  
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
        if (this.readyState === 4 && this.status !== 200)
          {
            alert("Failed")
            return;
          }

        if (this.readyState === 4 && this.status === 200){
          console.log(this.responseText)
          var receivedReplyObject = JSON.parse(this.responseText);
		
          if (receivedReplyObject["addOutcome"] === "success")
          {
            
            alert("Inspection record successfully added! The inspection ID of the "
                 + "added inspection record is " + receivedReplyObject["inspectionId"] );
       
          }
          else
          {
            alert("Failed to Add Inspection Record" )
      
          }  
        }
      }
      

      xhr.open("POST", "http://localhost:1234/add-inspection-data.php", true);
      
      xhr.send(jsonEncodedRequestObject);
    
  }

  return (
    <div className="form-content-right">
      <form className="form" >
        <div className="form-inputs">
          <label className="form-label">Hive ID</label>
          <select
            className="form-input"
            type="text"
            name="hive_id"
            placeholder="Enter Hive ID"
            onInput = {e=>setHiveId(e.target.value)}
          >
            <option value="select">---Please select a hive---</option>
            <option value="Hive-1">Hive-1</option>
            <option value="Hive-2">Hive-2</option>
            <option value="Hive-3">Hive-3</option>
            <option value="Hive-4">Hive-4</option>
            <option value="Hive-5">Hive-5</option>
            <option value="Hive-6">Hive-6</option>
          </select>
        </div>
        <div className="form-inputs">
          <label className="form-label">Date Of Inspection</label>
          <input
            className="form-input"
            type="date"
            name="inspection_date"
            placeholder="Enter Date"
            onInput={e=>setInspectionDate(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Inspection Outcome (Pass/Fail)</label>
          <select
            className="form-input"
            type="text"
            name="status"
            placeholder="Enter the inspection outcome"
            onInput={e=>setInspectionOutcome(e.target.value)}>
              <option value="">---Please select the inspection outcome---</option>
              <option value="PASS">PASS</option>
              <option value="FAIL">FAIL</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            type="text"
            name="description"
            placeholder="Enter description"
            onInput={e=>{setDescription(e.target.value.trim())}}
          />
        </div>
        

        <div className="form-inputs">
          <label className="form-label">Weather condition</label>
          <select
            className="form-input"
            name="event_type"
            onInput={e => setWeatherCondition(e.target.value)}>
              <option value="">---Please select a weather condition---</option>
              <option value="Sunny">Sunny</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Raining">Raining</option>
              <option value="Heavy rain">Heavy rain</option>
              <option value="Thunderstorm">Thunderstorm</option>
          </select>
        </div>
        
        <div className="form-inputs">
          <label className="form-label">Inspection Performed By</label>
          <select
            className="form-input"
            type="text"
            name="hive_id"
            placeholder="Enter Hive ID"
            onInput = {e=>setApiaristId(e.target.value)}
          >
            <option value="">---Please select a user---</option>
            <option value="user1">user1</option>
            <option value="user2">user2</option>
            <option value="user3">user3</option>
            <option value="user4">user4</option>
            <option value="user5">user5</option>
            <option value="user6">user6</option>
          </select>
        </div>

        <button
          className="form-input-btn"
          type="submit"
          onClick={e => validateInput(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InspectionForm;
