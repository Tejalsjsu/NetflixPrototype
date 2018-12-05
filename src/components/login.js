import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";
import logo from "../image/netflix-logo.jpg";
import * as API from "../api/index";
import Dashboard from "./dashboard";
import AdminAddMovie from "./adminAddMovie";
import Signup from "./signup";
import cookie from "react-cookies";
import axios from "axios";
let imgStyle = { height: "100px", padding: "10px", width: "300px" };
let divStyle2 = { height: "45px" };
let divStyle3 = { backgroundColor: "#E3E1E1" };
let divStyle1 = {
  align: "center",
  backgroundColor: "#FEFDFD",
  padding: "28px",
  marginTop: "1px"
};

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userdata: {
      username: "",
      password: "",
      //email: '',
      //token:'',
      userId: ""
    },
    isLoggedIn: false,
    message: ""
  };

  componentWillMount() {
    this.setState({
      username: "",
      password: "",
      //email:'',
      //token:'',
      userId: "",
      profileName: "",
      role: ""
    });
  }

  handleSubmit = () => {
    let loginData = {
      username: this.state.userdata.username,
      password: this.state.userdata.password
    };
    API.doLogin(loginData).then(res => {
      console.log(res);
      if (res.status === 200) {
        console.log("after login ", res.data.isEnable);
        if (res.data.isEnable === false)
          this.props.history.push("/registrationConfirmation");
        else {
          this.setState({
            isLoggedIn: true,
            message: "Welcome to my App..!!",
            token: res.data.JWTToken,
            profileName: res.data.profileName,
            role: res.role
          });
          localStorage.setItem("JWTToken", this.state.token);
          localStorage.setItem("profileName", this.state.profileName);
          //cookie.save('JWTToken', this.state.token, { path: '/' });
          if (res.data.role == "ADMIN")
            this.props.history.push("/adminAddMovie");
          else {
            this.props.history.push("/Dashboard");
          }
        }
      } else {
        console.log("in fail");
        this.setState({
          isLoggedIn: false,
          message: "Wrong username or password. Try again..!!"
        });
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <div style={divStyle3}>
        <Route
          exact
          path="/login"
          render={() => (
            <div>
              <div className="col-sm-4" style={divStyle2}>
                {" "}
              </div>

              <div style={divStyle1} className="col-sm-3">
                {/*<div>*/}
                {/*<div>*/}
                <img src={logo} style={imgStyle} alt="logo" />
                <hr color="#E3E1E1" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={this.state.userdata.username}
                  onChange={event => {
                    this.setState({
                      userdata: {
                        ...this.state.userdata,
                        username: event.target.value
                      }
                    });
                  }}
                />{" "}
                <br />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={this.state.userdata.password}
                  onChange={event => {
                    this.setState({
                      userdata: {
                        ...this.state.userdata,
                        password: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <Button
                  bsStyle="danger"
                  bsSize="sm"
                  block
                  onClick={() => this.handleSubmit()}
                >
                  {" "}
                  Login{" "}
                </Button>
                <hr color="#E3E1E1" />
                Don't have an account? <Link to="/signup"> Sign up </Link>
                {/*<Button onClick={(event) =>this.setLink(event)}> Sign Up </Button>*/}
                <br />
                <div>
                  {/*<div className="col-md-3">*/}
                  {this.state.message && (
                    <div className="alert alert-warning" role="alert">
                      {this.state.message}
                    </div>
                  )}
                  {/*</div>*/}
                </div>
              </div>
            </div> //here
          )}
        />

        <Route
          exact
          path="/dashboard"
          render={() => (
            <div>
              <Dashboard
                username={this.state.userdata.username}
                email={this.state.userdata.username}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/adminAddMovie"
          render={() => (
            <div>
              <AdminAddMovie />
            </div>
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <div>
              <Signup />
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(Login);
