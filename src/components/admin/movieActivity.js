import React, { Component } from "react";
import "../../App.css";

import AdminMovieDetails from "../adminmovieDetails";
// import Signup from '../components/signup';

import queryString from "query-string";

let divStyle3 = { backgroundColor: "#E3E1E1" };

let footerText = { color: "#5DADE2" };

class MovieActivity extends Component {
  constructor(props) {
    super(props);
    // console.log({props.param.projectName});
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.projectid;

    this.state = {
      isLoggedIn: false,
      message: ""
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={divStyle3}>
        <div className=".container-fluid">
          <div className="container">
            <div className="col-sm-8">
              <AdminMovieDetails />
              <br />
            </div>
          </div>
          <div>
            <br />
            <footer className="footer">
              <p style={footerText}>
                MovieCentral ® is a registered Trademark of Freelancer
                Technology Pty Limited (ACN 142 189 759) Copyright © 2018
                MovieCentral Technology Pty Limited (ACN 142 189 759)
              </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieActivity;
