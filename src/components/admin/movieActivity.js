import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";

import AdminMovieDetails from "../adminmovieDetails";
// import Signup from '../components/signup';

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
let imgStyle = { width: "100%", height: "400px" };
let footerText = { color: "#5DADE2" };
var img1 = require("../../image/netflixBG.jpg");
var data = [];

class MovieActivity extends Component {
  constructor(props) {
    super(props);
    // console.log({props.param.projectName});
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.projectid;

    this.state = {
      isLoggedIn: false,
      message: ""
      // allMovies : [],
      // noOfPlays : '',
      // movieWithPlays : []
    };
  }

  // componentWillMount(){
  // }

  // handleClick=(movieID) =>
  // {
  //   console.log(movieID);
  // }
  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={divStyle3}>
        <div className=".container-fluid">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              <Carousel>
                <Carousel.Item>
                  <img style={imgStyle} alt="freelance.com" src={img1} />
                  <Carousel.Caption>
                    <Button
                      bsStyle="danger"
                      bsSize="large"
                      onClick={this._onAddClick}
                    >
                      {" "}
                      Movie Activity and Monitoring
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <h3>MovieCentral </h3>
                    <p>Watch at your convinience.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                {/*<Carousel.Item>*/}
                {/*<img style={imgStyle} alt="freelance.com" src={img2} />*/}
                {/*<Carousel.Caption>*/}
                {/*<h3>Netflix</h3>*/}
                {/*<p>atch from anywhere, anytime.</p>*/}
                {/*</Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
              </Carousel>
            </div>
          </div>

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
