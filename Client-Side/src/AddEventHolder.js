import React, { useState } from "react";
import "./AddForms.css";
import FormAddEvent from "./AddEventForm";


const AddEventFormHolder = () => {
  

  return (
    <>
      <h1>Add Hive Event Records Form</h1>
      <div className="form-container">

        <FormAddEvent  /> 
        
      </div>
    </>
  );
};

export default AddEventFormHolder;
