import React from "react";
import "./AddForms.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
const AddTransactionForm = () => {
  const history = useHistory();

  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [apiaristId, setApiaristId] = useState('');

  function validateInput(e)
  {
    e.preventDefault();
    if (transactionType=='')
    {
      alert("Please select the transaction type");
    }
    else if (transactionDate === '')
    {
      alert("Please select the transaction date");
    }
    else if(description === '')
    {
      alert("Please enter the description");
    }
    else if (totalAmount === '')
    {
      alert("Please enter the total amount");
    }
    else if (isNaN(Number(totalAmount)))
    {
      alert("Please enter a valid number for total amount");
    }
    else if (Number(totalAmount) < 0)
    {
      alert("Total amount cannot be negative")
    }
    else if (apiaristId === '')
    {
      alert("Please select the apiarist id of the apiarist who performed the transaction");
    }
    else
    {
   
      sendDataToServer();
    }
  }

  function sendDataToServer()
  {
      
    let requestObject = {
      "transactionType" : transactionType,
      "date": transactionDate,
      "description": description,
      "totalAmount": totalAmount,
      "apiaristId" : apiaristId

    };


    let jsonEncodedRequestObject = JSON.stringify(requestObject);
  
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status !== 200)
        {
          alert("A server error has occurred");
          return;
        }

        if (this.readyState === 4 && this.status === 200)
        {
            // console.log(this.responseText);
          var receivedReplyObject = JSON.parse(this.responseText);
          console.log(this.responseText);

          if (receivedReplyObject["addOutcome"] === "success")
          {
              console.log("test success");
              alert("Success! Transaction record successfully added to the system. "
                    + "The transaction id is " + receivedReplyObject["transactionId"] );
          
              
          }
          else
          {
              alert("Failed to add transaction record to the system. Please contact your "
                + "system administrator for asistance" );
      
          }  
        }
      }
      //remove port number 1234
      xhr.open("POST", "http://localhost:1234/add-transaction-data.php", true);
      
      xhr.send(jsonEncodedRequestObject);
    
  }

  return (
    <div>
  
      <div className="form-content-right">
        

        <form className="form" noValidate>
          
          <div className="form-inputs">
            <label className="form-label">Transaction Type</label>
            <select
              className="form-input"
              type="text"
              name="hive_id"
              placeholder="Enter Hive ID"
              onInput = {e=>setTransactionType(e.target.value)}
            >
              <option value="">---Please select transaction type---</option>
              <option value="SALES">CUSTOMER SALES (REVENUE)</option>
              <option value="PURCHASE">COMPANY PURCHASE (EXPENDITURE)</option>
            </select>
          </div>
          <div className="form-inputs">
            <label className="form-label">Date Of Transaction</label>
            <input
              className="form-input"
              type="date"
              name="inspection_date"
              placeholder="Enter Date"
              onInput={e=>setTransactionDate(e.target.value)}
            />
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
            <label className="form-label">Total Amount in SGD</label>
            <input
              type="number"
              min="0"
              className="form-input"
              name="event_type"
              onInput={e => setTotalAmount(e.target.value)}/>
          </div>
          
          <div className="form-inputs">
            <label className="form-label">Transaction Performed By</label>
            <select
              className="form-input"
              type="text"
              name="hive_id"
              placeholder="Enter Hive ID"
              onInput = {e=>setApiaristId(e.target.value)}
            >
              <option value="">---Please select an apiarist---</option>
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
            onClick={e =>validateInput(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionForm;