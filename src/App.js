import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DashboardForm from './Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact path="/" to='/dashboard' />
          <Route path="/dashboard" component={DashboardForm} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
