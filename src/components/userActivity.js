import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";

import UserDetails from "../components/userDetails";
// import Signup from '../components/signup';

import queryString from "query-string";

let divStyle3 = { backgroundColor: "#E3E1E1" };
let divStyle1 = {
  align: "center",
  backgroundColor: "#FEFDFD",
  padding: "28px",
  marginTop: "1px"
};

let footerText = { color: "#5DADE2" };

class UserActivity extends Component {
  constructor(props) {
    super(props);
    // console.log({props.param.projectName});
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.projectid;

    this.state = {
      serchUser: {
        search: "",
        page: 0,
        size: 10
      },
      isLoggedIn: false,
      message: ""
      // currentCustomers: [],
    };
  }
  componentWillMount() {
    console.log("In ComponentWillMount()");
    this.setState({
      search: "",
      page: 0,
      size: 10
      // currentCustomers: []
    });
  }

  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={divStyle3}>
        <div>
          <div className="container">
            <div className="col-sm-8">
              <UserDetails />
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

export default withRouter(UserActivity);
