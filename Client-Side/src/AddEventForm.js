import React from "react";
import "./AddForms.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
const EventForm = () => {

  const [hiveId, setHiveId] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [description, setDescription] = useState('');
  const [apiaristId, setApiaristId] = useState('');


  function validateData(e)
  {
    e.preventDefault();

    if(hiveId === '')
    {
      alert("You did not select a hive Id");
    }
    else if (eventType === '')
    {
      alert("You did not select the event type");
    }else if (date === '' )
    {
      alert("You did not select the date");
    }
    else if (weatherCondition === '')
    {
      alert("You did not select the weather condition");
    }
    else if (description == '')
    {
      alert("You did not enter the description");
    }
    else if (apiaristId === '')
    {
      alert("You did not select the apiarist Id");
    }
    else{
      sendDataToServer();
    }
    
  }

  function sendDataToServer()
  {
    let loginData = {
      "hiveId" : hiveId,
      "eventType" : eventType,
      "date" : date,
      "description": description,
      "weatherCondition" : weatherCondition,
	    "apiaristId" : apiaristId
    };



    let jsonEncodedLoginData = JSON.stringify(loginData);
 
    let xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function (){
      
        
        if (this.readyState == 4 && this.status != 200)
        {
          console.log(this.readyState + " " + this.status);
          // alert("Failed to Add Hive Event Data");
        }

        if (this.readyState == 4 && this.status == 200){
		
			console.log(this.responseText);
          let receivedReplyObject = JSON.parse(this.responseText);

          if (receivedReplyObject["addOutcome"] == "success")
          {
            alert("Successfully Added Hive Event data. Event " +
              "ID is " + receivedReplyObject["eventId"]);

          }
          else
          {
            alert("An error has occurred. Error Message: " + receivedReplyObject["errorMessage"]);
          }
        }
    };
    
 
    xhr.open("POST", "http://localhost:1234/add-hive-event-data.php", true);
  
    xhr.send(jsonEncodedLoginData);
  }



  const history = useHistory();
  return (
    <div className="form-content-right">
      <form className="form" noValidate>
      
        <div className="form-inputs">
          <label className="form-label">Hive Id</label>
          <select
            className="form-input"
            name="event_type"
            onInput={e => setHiveId(e.target.value)}>
              <option value="">---Please select a hive id---</option>
              <option value="Hive-1">Hive-1</option>
              <option value="Hive-2">Hive-2</option>
              <option value="Hive-3">Hive-3</option>
              <option value="Hive-4">Hive-4</option>
              <option value="Hive-5">Hive-5</option>
              <option value="Hive-6">Hive-6</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Type Of Event</label>
          <select
            className="form-input"
            name="event_type"
            onInput={e => setEventType(e.target.value)}>
              <option value="">---Please select an event---</option>
              <option value="QUEENING">QUEENING</option>
              <option value="SPLITTING">SPLITTING</option>
              <option value="CLEANING">CLEANING</option>
              <option value="SWARMING">SWARMING</option>
              <option value="MATING">MATING</option>
          </select>
        </div>
        <div className="form-inputs">
          <label className="form-label">Date Of Event</label>
          <input
            className="form-input"
            type="date"
            name="event_date"
            placeholder="Enter Date"
            onInput={e => setDate(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Weather Condition</label>
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
          <label className="form-label">Description</label>
          <input
            className="form-input"
            type="text"
            name="event_description"
            placeholder="Enter description"
            onInput={e => setDescription(e.target.value.trim())}
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Apiarist Id of Apiarist who Observed the Event</label>
          <select
            className="form-input"
            type="text"
            name="event_type"
            onInput={e => setApiaristId(e.target.value)}>
              <option value="">---Please select an apiaristId---</option>
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
          onClick={e=>validateData(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
