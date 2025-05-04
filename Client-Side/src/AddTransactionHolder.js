import React, { useState } from "react";
import "./AddForms.css";
import FormAddTransaction from "./AddTransactionForm";


const AddTransactionFormHolder = () => {
  
  return (
    <>
      <h1>Add Transaction Record Form</h1>
      <div className="form-container">
      
        
        <FormAddTransaction  />
       
      </div>
    </>
  );
};

export default AddTransactionFormHolder;