import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Study Buddy</h1>
        <nav>
          <Link to="/signup">Sign Up</Link> | 
          <Link to="/">Login</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;