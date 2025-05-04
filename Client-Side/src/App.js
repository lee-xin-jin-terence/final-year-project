import "./App.css";
import LoginForm from "./LoginFormHolder";
import Dashboard from "./Dashboard";
import AddHoney from "./AddHoneyHolder";
import NavC from "./Nav_C";
import HomeC from "./Home_C";
import NavHome from "./Nav_Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddEvent from "./AddEventHolder";
import ViewEvent from "./ViewEvent";
import AddInspection from "./AddInspectionHolder";
import ViewCompletedInspection from "./ViewCompletedInspection";
import ViewInspectionReminder from "./ViewInspectionReminder";
import AddTransaction from "./AddTransactionHolder";
import ViewTransaction from "./ViewTransaction";

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/" exact>
            <NavC />
            <HomeC />
          </Route>
          <Route path="/ConsumerHome" exact>
            <NavC />
            <HomeC />
          </Route>
          <Route path="/Dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/login" exact>
            <NavC />
            <LoginForm />
          </Route>
          <Route path="/AddHoney" exact>
            <NavHome />
            <AddHoney />
          </Route>
          <Route path="/ViewHoney" exact>
            <NavHome />
            <HomeC />
          </Route>
        
          <Route path="/AddEvent" exact>
            <NavHome />
            <AddEvent />
          </Route>
          <Route path="/ViewEvent" exact>
            <NavHome />
            <ViewEvent />
          </Route>
          <Route path="/AddInspection" exact>
            <NavHome />
            <AddInspection />
          </Route>
          <Route path="/ViewCompletedInspection" exact>
            <NavHome />
            <ViewCompletedInspection />
          </Route>
          <Route path="/ViewInspectionReminder" exact>
            <NavHome />
            <ViewInspectionReminder />
          </Route>
          <Route path="/AddTransaction" exact>
            <NavHome />
            <AddTransaction />
          </Route>
          <Route path="/ViewTransaction" exact>
            <NavHome />
            <ViewTransaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
