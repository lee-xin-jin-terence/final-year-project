import React from "react";
import "./AddForms.css";
import { useState } from 'react';
import Select from 'react-select';

const AddHoneyForm = () => {
  
  const [hiveId, setHiveId] = useState('unselected');
  const [harvestDate, setHarvestDate] = useState('');
  const [harvestVolume, setHarvestVolume] = useState('');
  const [apiaristId, setApiaristId] = useState('unselected');
  const [arrayOfFloralContributors, setArrayOfFloralContributors] = useState([]);
  
  //styles for the react-select componet
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: '1.1rem'
    }),
  
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: '1.3rem'
    }),
  };

  const listOfFlowers = [
	  { value: 'African Daisy', label: 'African Daisy' },
	  { value: 'Anemone', label: 'Anemone' },
	  { value: 'Balloon Flower', label: 'Balloon Flower' },
	  { value: 'Bee Balm Flower', label: 'Bee Balm Flower' },
	  { value: 'Buttercup', label: 'Buttercup' },
	  { value: 'Calla Lily', label: 'Calla Lily' },
	  { value: 'Carnation', label: 'Carnation' },
	  { value: 'Clover', label: 'Clover' },
	  { value: 'Daffodil', label: 'Daffodil' },
	  { value: 'Desert Rose', label: 'Desert Rose' },
	  { value: 'Forget Me Not', label: 'Forget Me Not' },
	  { value: 'Frangipani', label: 'Frangipani' },
	  { value: 'French Marigold', label: 'French Marigold' },
	  { value: 'Gaillardia', label: 'Gaillardia' },
	  { value: 'Grape Hyacinth', label: 'Grape Hyacinth' },
	  { value: 'Hibiscus', label: 'Hibiscus' },
	  { value: 'Hydrangea', label: 'Hydrangea' },
	  { value: 'Hibiscus', label: 'Hibiscus' },
	  { value: 'Iris', label: 'Iris' },
	  { value: 'Jasmine', label: 'Jasmine' },
	  { value: 'Lavender', label: 'Lavender' },
	  { value: 'Lilac', label: 'Lilac' }
	];

	function storeArrayOfFloralContributors(selectedOptions) 
	{
		var tempArrayOfFloralContributors = [];
		
		for(let i=0; i< selectedOptions.length ; i++)
		{
			tempArrayOfFloralContributors[i] = selectedOptions[i]["value"];
		}
		
		setArrayOfFloralContributors(tempArrayOfFloralContributors);
		
	}

  function validateData(e)
  {
    //prevents the default react behaviour of page refreshing
    // after clicking the submit button
    e.preventDefault();

    if (hiveId === "unselected" )
    {
      alert("Please select the Hive Id");
    }
    else if(harvestDate === '')
    {
      alert("Please select the Harvest Date");
    }
    else if (harvestVolume === "")
    {
      alert("Please enter a value for the volume of honey harvested");
    }
    else if (harvestVolume < 0)
    {
      alert("You cannot enter a negative value for volume of honey harvested");
    }
    else if (isNaN(Number(harvestVolume)))
    {
      alert("You have not entered volume of honey harvested");
    }
    else if (arrayOfFloralContributors.length === 0 )
    {
      alert("Must select at least one floral contributor "  );
    }
    else if (arrayOfFloralContributors.length > 5)
    {
      alert("Cannot select more than 5 floral contributors");
    }
      else if (apiaristId === 'unselected')
      {
        alert("Please select the apiarist id of the apiarist " +
          " who harvested the honey");
      }
      else
      {
        sendDataToServer();
      }
  }
  


  function sendDataToServer()
  {
    let loginData = {
      "hiveId" : hiveId,
      "harvestDate" : harvestDate,
      "harvestVolume" : harvestVolume,
      "apiaristId" : apiaristId,
	  "floralContributors" : arrayOfFloralContributors
    };

	console.log(arrayOfFloralContributors);

    let jsonEncodedLoginData = JSON.stringify(loginData);
 
    let xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function (){
      
        
        if (this.readyState === 4 && this.status !== 200)
        {
          alert("Server Error: Failed to Add Honey Harvest Data");
          return;
        }


        if (this.readyState === 4 && this.status === 200){
		
			console.log(this.responseText);
          let receivedReplyObject = JSON.parse(this.responseText);

          if (receivedReplyObject["addOutcome"] === "success")
          {
            alert("Successfully Added Honey Harvest Data. Batch " +
              "number is " + receivedReplyObject["batchId"]);

          }
          else
          {
            alert(receivedReplyObject["errorMessage"]);
          }
        }
    };
    
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/add-honey-data.php", true);
  
    xhr.send(jsonEncodedLoginData);
  }

  
  return (
    <div className="form-content-right">
      <form className="form">

        <div className="form-inputs" noValidate>
          <label className="form-label">Hive ID of Harvested Hive</label>
          <select className="form-input" 
            onInput={e => setHiveId(e.target.value)}>
            <option value="unselected">Please Select a Hive</option>
            <option value="Hive-1">Hive-1</option>
            <option value="Hive-2">Hive-2</option>
            <option value="Hive-3">Hive-3</option>
            <option value="Hive-4">Hive-4</option>
            <option value="Hive-5">Hive-5</option>
            <option value="Hive-6">Hive-6</option>
          </select>
        </div>

        <div className="form-inputs">
          <label className="form-label">Harvest Date</label>
          <input
            className="form-input"
            type="date"
            name="Harvest_Date"
            placeholder="Enter Date"
            onInput={e => setHarvestDate(e.target.value)}
          />
        </div>

        <div className="form-inputs">
          <label className="form-label">Volume of Honey Harvested in Litres</label>
          <input
            className="form-input"
            type="number"
            name="Honey_Amount"
            placeholder="Enter amount"
            min="0.5"  max="200"
            step="0.5"
            onInput={e => setHarvestVolume(e.target.value)}
          />
        </div>
		
		    <div className="form-inputs">
			    <label className="form-label">Floral Contributors (Min. 1, Max. 5)</label>
          <Select isMulti isSearchable isClearable options={listOfFlowers}
              styles={customStyles}  onChange={storeArrayOfFloralContributors}/>
        </div>
		
        <div className="form-inputs">
          <label className="form-label">Apiarist Who Harvested the Honey</label>
          <select className="form-input" 
            onInput={e => setApiaristId(e.target.value)}>
            <option value="unselected">Please Select a Apiarist</option>
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
          onClick={validateData}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddHoneyForm;
