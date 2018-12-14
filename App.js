import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/movie/dashboard/dashboard";
import Home from "./components/home/home";
import Signup from "./components/signup";
import Profile from "./components/profile";
import MovieDetails from "./components/movieDetails/movieDetails";
import EditProfile from "./components/editprofile";
import NavLogin from "./components/NavLogin";
import BrowseProjects from "./components/browseProjects";
import Subscription from "./components/subscription";
import registrationConfirmation from "./components/registrationConfirmation";
import playMovie from "./components/movie/playMovie/playMovie";
import AdminPlayMovie from "./components/adminPlayMovie";

import CurrentWorkAsFreelancer from "./components/CurrentWorkAsFreelancer";

import AddMoney from "./components/movie/moviepayment/addMoney";
import WithdrawMoney from "./components/withdrawMoney";
import AdminAddMovie from "./components/admin/adminAddMovie";
import AdminFinancials from "./components/admin/adminFinancials";
import UserActivity from "./components/userActivity";
import MovieActivity from "./components/movieActivity";
import AdminUpdateMovie from "./components/adminUpdateMovie";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/*<Nav/>*/}
          {/*<Login/>*/}
          {/*<Post/>*/}
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/movieDetails" component={MovieDetails} />
          <Route path="/subscription" component={Subscription} />
          <Route path="/playMovie" component={playMovie} />
          <Route
            path="/registrationConfirmation"
            component={registrationConfirmation}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/browseProjects" component={BrowseProjects} />

          <Route
            path="/CurrentWorkAsFreelancer"
            component={CurrentWorkAsFreelancer}
          />

          <Route path="/addMoney" component={AddMoney} />
          <Route path="/withdrawMoney" component={WithdrawMoney} />
          <Route path="/adminAddMovie" component={AdminAddMovie} />
          <Route path="/adminFinancials" component={AdminFinancials} />
          <Route path="/userActivity" component={UserActivity} />
          <Route path="/movieActivity" component={MovieActivity} />
          <Route path="/AdminUpdateMovie" component={AdminUpdateMovie} />
          <Route path="/AdminPlayMovie" component={AdminPlayMovie} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
