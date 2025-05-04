import React from "react";
import { useHistory } from "react-router-dom";

import "./Nav.css";

function NavHome() {
  const history = useHistory();


  return (
    <div>
      <div>
      <button className="navButtons" onClick={() => history.push("/ViewHoney")}>View Harvest Records</button>
        <button className="navButtons" onClick={() => history.push("/AddHoney")}>Add Harvest Record</button>
        
        <button className="navButtons" onClick={() => history.push("/ViewEvent")}>View Hive Event Records</button>
        <button className="navButtons" onClick={() => history.push("/AddEvent")}>Add Hive Event Record</button>

        <button className="navButtons" onClick={() => history.push("/ViewInspectionReminder")}>View Inspection Reminders</button>
        
        
      </div>

      <div>          
        <button className="navButtons" onClick={() => history.push("/ViewCompletedInspection")}>View Inspection Records</button>  
        <button className="navButtons" onClick={() => history.push("/AddInspection")}>Add Inspection Record</button>

        <button className="navButtons" onClick={() => history.push("/ViewTransaction")}>View Transaction Records</button>
        <button className="navButtons" onClick={() => history.push("/AddTransaction")}>Add Transaction Record</button>
        
        <button className="navButtons" onClick={() => history.push("/ConsumerHome")}>Logout</button>
        
      </div>
    </div>
  );
}
export default NavHome;
