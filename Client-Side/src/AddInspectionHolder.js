import React, { useState } from "react";
import "./AddForms.css";
import FormAddInspection from "./AddInspectionForm";


const AddInspectionFormHolder = () => {
 

  return (
    <>
      <h1>Add Inspection Record Form</h1>
      <div className="form-container">
          <FormAddInspection  />
      </div>
    </>
  );
};

export default AddInspectionFormHolder;
