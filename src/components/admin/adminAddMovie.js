import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";
import * as API from "../../api/index";
// import NavBar from '../components/navbar';
import AddMovie from "./addMovie";
import UpdateMovie from "../updateMovie";
// import Signup from '../components/signup';

import * as CONSTANTS from "../../constants";
import queryString from "query-string";
import cookie from "react-cookies";

// let imgStyle = {height: '70px', padding: '10px'};
let divStyle2 = { height: "45px" };
let divStyle3 = { backgroundColor: "#E3E1E1" };
let divStyle1 = {
  align: "center",
  backgroundColor: "#FEFDFD",
  padding: "28px",
  marginTop: "1px"
};
var Carousel = require("react-bootstrap").Carousel;
var NavLink = require("react-router-dom").NavLink;
let imgStyle = { width: "100%", height: "400px" };
let footerText = { color: "#5DADE2" };
var img1 = require("../../image/netflixBG.jpg");
var data = [];

class AdminAddMovie extends Component {
  constructor(props) {
    super(props);
    // console.log({props.param.projectName});
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.projectid;

    this.state = {
      isLoggedIn: false,
      message: "",
      movie: {},
      showUpdateMovieComponent: false
    };
  }

  activateClass = props => {
    this.className = "active";
  };

  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
    if (this.props.location.state && this.props.location.state.movieId) {
      // this.setState({
      //   showUpdateMovieComponent: true
      // });
      //fetching movie details
      API.fetchMovieById(this.props.location.state.movieId).then(result => {
        if (result.status === 200) {
          this.setState({
            movie: result.data,
            showUpdateMovieComponent: true
          });
        } else {
          this.setState({
            message: "Unable to fetch movie for update"
          });
        }
      });
    } else {
      this.setState({ showUpdateMovieComponent: false });
    }
  }

  render() {
    return (
      <div style={divStyle3}>
        <div className=".container-fluid">
          {/*<div id="myCarousel" className="carousel slide" data-ride="carousel">*/}
            {/*<div className="carousel-inner" role="listbox">*/}
              {/*<Carousel>*/}
                {/*<Carousel.Item>*/}
                  {/*<img style={imgStyle} alt="freelance.com" src={img1} />*/}
                {/*</Carousel.Item>*/}
              {/*</Carousel>*/}
            {/*</div>*/}
          {/*</div>*/}
          <div className="container">
            <div className="col-sm-8">
              {this.state.showUpdateMovieComponent ? (
                <UpdateMovie updateMovieData={this.state.movie} />
              ) : (
                <AddMovie />
              )}
            </div>
          </div>
          <div>
            <br />
            <footer className="footer">
              <p style={footerText}>
                Netflix ® is a registered Trademark of Freelancer Technology Pty
                Limited (ACN 142 189 759) Copyright © 2018 Netflix Technology
                Pty Limited (ACN 142 189 759)
              </p>
            </footer>
          </div>
        </div>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default AdminAddMovie;
