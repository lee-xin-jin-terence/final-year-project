
import React from "react";
import { useHistory } from "react-router-dom";


function Dashboard() {
  const history = useHistory();
  return (
    <div className="HomeHolder">
      <h1
        style={{ color: "black", fontSize: "7em" }}
      >
        DashBoard
      </h1>
      <div align="center">
        <div>
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ViewHoney")}
          >
            View Harvest Records
          </button>
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/AddHoney")}
          >
            Add Harvest Records
          </button>
          
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ViewEvent")}
          >
            View Hive Event Records
          </button>
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/AddEvent")}
          >
            Add Hive Event Records
          </button>
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ViewInspectionReminder")}
          >
            View Inspection Reminders
          </button>
          
        </div>
        
        <div>
          
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ViewCompletedInspection")}
          >
            View Inspection Records
          </button>
          
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/AddInspection")}
          >
            Add Inspection Records
          </button>

          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ViewTransaction")}
          >
            View Transaction Records
          </button>
          
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/AddTransaction")}
          >
            Add Transaction Records
          </button>
          
          <button
            className="form-input-btn-c"
            onClick={() => history.push("/ConsumerHome")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
