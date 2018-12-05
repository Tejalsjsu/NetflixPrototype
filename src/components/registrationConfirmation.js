import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../App.css";
import { Button } from "react-bootstrap";
import logo from "../image/netflix-logo.jpg";
import * as API from "../api/index";
import Login from "./login";
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

class registrationConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: ""
  };

  componentWillMount() {
    this.setState({
      token: "",
      message: ""
    });
  }

  handleSubmit = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${API.api}/userprofile/regitrationConfirm?token=` + this.state.token
      )
      .then(result => {
        this.props.history.push("/login");
      })
      .catch(error => {
        this.setState({
          message: "Confirmation Failed"
        });
      });

    // API.registerConfirmation(this.state.token).then(res => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     console.log("here " + res.data);
    //     this.props.history.push("/login");
    //   } else {
    //     console.log("Confirmation Failed");
    //     this.setState({
    //       message: "Confirmation Failed"
    //     });
    //   }
    // });
  };

  render() {
    return (
      <div style={divStyle3}>
        <Route
          exact
          path="/registrationConfirmation"
          render={() => (
            <div>
              <div className="col-sm-4" style={divStyle2}>
                {" "}
              </div>

              <div style={divStyle1} className="col-sm-3">
                {/*<div>*/}
                {/*<div>*/}
                <a href="/home">
                  {" "}
                  <img src={logo} style={imgStyle} alt="logo" />
                </a>
                <hr color="#E3E1E1" />
                <div>
                  {/*<div className="col-md-3">*/}
                  {this.state.message && (
                    <div className="alert alert-warning" role="alert">
                      {this.state.message}
                    </div>
                  )}
                  {/*</div>*/}
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Token"
                  value={this.state.token}
                  onChange={event => {
                    this.setState({
                      token: event.target.value
                    });
                  }}
                />{" "}
                <br />
                <Button
                  bsStyle="success"
                  bsSize="sm"
                  block
                  onClick={() => this.handleSubmit(this.state.token)}
                >
                  {" "}
                  Confirm Email Token{" "}
                </Button>
                <hr color="#E3E1E1" />
                <br />
              </div>
            </div> //here
          )}
        />

        <Route
          exact
          path="/login"
          render={() => (
            <div>
              <Login />
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(registrationConfirmation);
