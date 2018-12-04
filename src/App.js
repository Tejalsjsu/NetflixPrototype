import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from "./components/login";
import Post from "./components/postproject";
import Nav from './components/Nav';
import Dashboard from './components/dashboard'
import Home from './components/Home';
import Signup from './components/signup';
import Profile from './components/profile';
import ProjectDetails from './components/projectdetails';
import EditProfile from './components/editprofile';
import NavLogin from './components/NavLogin';
import BrowseProjects from './components/browseProjects'

import CurrentWorkAsFreelancer from './components/CurrentWorkAsFreelancer';

import FinancialDashboard from './components/financialDashboard'
import AddMoney from './components/addMoney'
import WithdrawMoney from './components/withdrawMoney'
import FinancialDashboardIn from './components/financialDashboardIn'
import AdminAddMovie from './components/adminAddMovie'
import AdminFinancials from './components/adminFinancials'
import UserActivity from './components/userActivity'
import MovieActivity from './components/movieActivity'
import AdminUpdateMovie from './components/adminUpdateMovie'

class App extends Component {
  render() {
    return (

          <BrowserRouter >
              <div className="App">
              {/*<Nav/>*/}
        {/*<Login/>*/}
              {/*<Post/>*/}
                  <Route exact path="/" component={Home}/>
              <Route exact path="/Home" component={Home}/>
              <Route path="/postproject" component={Post}/>
              <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/projectdetails" component={ProjectDetails}/>
                  <Route path="/editprofile" component={EditProfile}/>
                  <Route path="/browseProjects" component={BrowseProjects}/>

                  <Route path="/CurrentWorkAsFreelancer" component={CurrentWorkAsFreelancer}/>

                  <Route path="/financialDashboard" component={FinancialDashboard}/>
                  <Route path="/financialDashboardIn" component={FinancialDashboardIn}/>
                  <Route path="/addMoney" component={AddMoney}/>
                  <Route path="/withdrawMoney" component={WithdrawMoney}/>
                  <Route path="/adminAddMovie" component={AdminAddMovie}/>
                  <Route path="/adminFinancials" component={AdminFinancials}/>
                  <Route path="/userActivity" component={UserActivity}/>
                  <Route path="/movieActivity" component={MovieActivity}/>
                  <Route path="/AdminUpdateMovie" component={AdminUpdateMovie}/>
              </div>
          </BrowserRouter>

    );
  }
}

export default App;
