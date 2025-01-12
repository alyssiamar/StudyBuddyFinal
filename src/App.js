import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Study Buddy</h1>
                <Switch>
                    <Route exact path="/" component={LoginForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signup" component={SignUpForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;