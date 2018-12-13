import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../../../App.css";
import { Button } from "react-bootstrap";
import logo from "../../../image/netflix-logo.jpg";
import * as API from "../../../api/index";
import Dashboard from "../dashboard/dashboard";
import YouTube from "react-youtube";

let imgStyle = { height: "100px", padding: "10px", width: "300px" };
let divStyle2 = { height: "45px" };
let divStyle3 = { backgroundColor: "#E3E1E1" };
let divStyle1 = {
  align: "center",
  backgroundColor: "#FEFDFD",
  padding: "28px",
  marginTop: "1px"
};

class playMovie extends Component {
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
      token: "",
      message: ""
    });
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  handleSubmit = () => {
    API.registerConfirmation(this.state.token).then(res => {
      console.log(res);
      if (res.status === 200) {
        console.log("here " + res.data);
        this.props.history.push("/login");
      } else {
        console.log("Confirmation Failed");
        this.setState({
          message: "Confirmation Failed"
        });
      }
    });
  };

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div style={divStyle3}>
        <Route
          exact
          path="/playMovie"
          render={() => (
            <div>
              <div className="col-sm-2" style={divStyle2}>
                {" "}
              </div>

              <div style={divStyle1} className="col-sm-7">
                {/*<div>*/}
                {/*<div>*/}
                <img src={logo} style={imgStyle} alt="logo" />
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
                <hr color="#E3E1E1" />
                <YouTube
                  videoId="D6xkbGLQesk"
                  opts={opts}
                  onReady={this._onReady}
                />{" "}
                <br />
                <br />
                <a href="/dashboard">
                  <Button bsStyle="danger" bsSize="sm">
                    {" "}
                    Go Back To App{" "}
                  </Button>
                </a>
                <br />
              </div>
            </div> //here
          )}
        />

        <Route
          exact
          path="/dashboard"
          render={() => (
            <div>
              <Dashboard />
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(playMovie);
