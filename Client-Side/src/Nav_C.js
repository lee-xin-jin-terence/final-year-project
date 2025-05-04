import React from "react";
import "./Nav.css";
import { useHistory } from "react-router-dom";

function Nav_C() {
  const history = useHistory();

  return (
    <div>
      <button className="navButtons" onClick={() => history.push("/ConsumerHome")}>Home</button>
      <button className="navButtons" onClick={() => history.push("/login")}>Login</button>
    </div>
  );
}
export default Nav_C;
