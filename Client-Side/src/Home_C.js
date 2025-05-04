/*
  File Name: Home_C.js
  Authors: Hoon Wei Xiong, Cai JianBo, Terence Lee
  Date: 1 November 2021
  
  Purpose: To Contain the GUI and Login of the Home Page
*/ 


import React from "react";
import "./Home_C.css";
import { useState } from 'react';
import GoogleMap from "./GoogleMap";


const Home_C = () => {

  const [searchCriteria, setSearchCriteria] = useState('');

  var [table, setTableContent] = useState("No batch number entered");
  

  function validateData(e){
    e.preventDefault();
    if(searchCriteria.length < 1){
    	setTableContent("No batch number entered");
      return;
    }
    else{
      sendDataToServer(searchCriteria);
    }
  }


  function sendDataToServer(criteria)
  {
    
    let requestObject = {
      "batchNumber" : criteria
    };


    let jsonEncodedRequestObject = JSON.stringify(requestObject);
  
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function (){
          
        if (this.readyState === 4 && this.status !== 200)
        {
      
          return;
        }

        if (this.readyState === 4 && this.status === 200){
          // console.log(this.responseText);
          var receivedReplyObject = JSON.parse(this.responseText);

          if (receivedReplyObject["queryOutcome"] === "success")
          {
            // console.log(this.responseText)
            console.log("Query is successful" )
            if(receivedReplyObject["results"].length > 0){
              setTableContent(createTable(receivedReplyObject["results"]));
            }
            else{
              setTableContent('No Results Found');
            }
          }
          else
          {
            setTableContent("Failed to query honey data");
			
          }
        }
    };
      
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/query-honey-data.php", true);
    
    xhr.send(jsonEncodedRequestObject);
  }
  
  
  function createTable(result)
  {
    var tableContent = `<div id="tableContents">
                          <table id="hiveTable">
                            <tr>
                              <th>Batch Number</th>
                              <th>Hive Id</th>
                              <th>Latitude</th>
                              <th>Longitude</th>
                              <th>Harvest Date</th>
                              <th>Volume Harvested </th>
                              <th>Floral Contributors</th>
                            </tr>`;

    for(var i = 0; i < result.length; i++){
	
      var batchNumber = result[i]["batchNumber"];
      var flowerStr = "";
      var hiveId = result[i]["hiveId"];
      var harvestVol = result[i]["volumeHarvested"];
      
      var latitude = result[i]["location"]["latitude"];
      var longitude = result[i]["location"]["longitude"];
     
      var harvestDate = result[i]["dateHarvested"];
      
      for (var j = 0; j < result[i]["flowers"].length; j++){
        if (flowerStr === ""){
          flowerStr = result[i]["flowers"][j];
        }
        else{
          flowerStr += ", " + result[i]["flowers"][j];
        }
      }
	
	    tableContent += `<tr><td>${batchNumber}</td>
                        <td>${hiveId}</td>
                        <td>${latitude}</td>
                        <td>${longitude}</td>
                        <td>${harvestDate}</td>
                        <td>${harvestVol} Litres</td>
                        <td>${flowerStr}</td>
								      </tr>`;  

    }//end of for-loop

    tableContent += "</table>"

    return tableContent;
  }

    
  return (
    <div className="homeHolder">
      <h2>Search Batch Number Using the Search Bar Below</h2>
      <div className="form-inputs-c">
        
        <input
          className="form-input-c"
          type="text"
          name="BatchNum"
          placeholder="Enter Batch Number"
          onInput={(e) => setSearchCriteria(e.target.value)}
        />
        <button className="form-input-btn-c" type="submit" onClick={(e) => validateData(e)}>
          Search
        </button>
      </div>
      <div className="main-holder">
        <div className="mapHolder">
          <GoogleMap className="innerMap" />
        </div>
        <div className="result_honey">
            <h1>Search Result</h1>
            <div className="tableHolder" dangerouslySetInnerHTML={{__html: table}}></div>

        </div>
      </div>
    </div>
  );
}
export default Home_C;
