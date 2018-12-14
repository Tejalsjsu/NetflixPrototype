import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";
import * as API from "../../api/index";
// import NavBar from '../components/navbar';
import AddMovie from "./addMovie";
import UpdateMovie from "../updateMovie";
import DeleteMovie from "../deleteMovie";
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
      userdata: {
        username: "",
        password: "",
        email: "",
        userId: cookie.load("userId"),
        projectId: temp,
        projectName: "",
        projectDescription: "",
        projectBudget: "",
        projectSkills: "",
        bidamount: "",
        duration: ""
      },
      isLoggedIn: false,
      message: "",
      showAddMovieComponent: false,
      showUpdateMovieComponent: false,
      showDeleteMovieComponent: false,
      movieWithPlays: [],
      allMovies: [],
      noOfPlays: "",
      projectData: [],
      pageSize: 0
    };
    this._onAddClick = this._onAddClick.bind(this);
    this._onUpdateClick = this._onUpdateClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  activateClass = props => {
    this.className = "active";
  };

  _onAddClick() {
    this.setState({
      showAddMovieComponent: true,
      showUpdateMovieComponent: false,
      showDeleteMovieComponent: false
    });
  }
  _onUpdateClick() {
    this.setState({
      showAddMovieComponent: false,
      showUpdateMovieComponent: true,
      showDeleteMovieComponent: false
    });
  }
  _onDeleteClick() {
    this.setState({
      showAddMovieComponent: false,
      showUpdateMovieComponent: false,
      showDeleteMovieComponent: true
    });
  }
  componentWillMount() {
    this.setState({
      // searchMovie: '',
      // movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"],
      allMovies: [],
      movieWithPlays: [],
      projectData: [],
      pageSize: 0
    });
    let movie = {
      page: 0,
      size: 20
    };

    API.fetchAllMovies(movie).then(res => {
      console.log("status then");
      if (res.status === 200) {
        this.setState({
          isLoggedIn: true,
          //projectData: res
          projectData: res.data.content
        });
        data = res.data.content;
        console.log(this.state.projectData);
        this.props.history.push("/adminAddMovie");
      } else if (res.status === "401") {
        this.setState({
          isLoggedIn: false,
          message: "No projects found..!!"
        });
      }
    });

    API.getMovieList().then(res => {
      console.log("response is here : ", res);
      console.log("response length : ", res.length);
      // console.log("Title & Plays-->", res);
      // console.log("response is here-->", res);
      if (res.length > 0) {
        // console.log("In success" +res.details[0].budgetRange);
        this.setState({
          isLoggedIn: true,
          allMovies: res
        });
        let i = 0;
        let len = 0;
        len = res.length;

        // console.log("Movie names before is: ", this.state.movieList);
        // console.log("Succesfully found user list as: ", data);
        // console.log("Content is as: ", data.content);
        console.log("Content length is : ", len);
        for (i = 0; i <= res.length - 1; i++) {
          console.log("Titles ", res[i].title);
          console.log("Plays ", res[i].numberOfPlays);
          let tempMovie = "";
          tempMovie = res[i].title + " - " + res[i].numberOfPlays;
          this.state.movieWithPlays.push(tempMovie);
          console.log("All Movies : ", tempMovie);
          console.log("Movie with plays array : ", this.state.movieWithPlays);
          // this.state.movieList.push(data.content[i].title);
        }
        console.log("All Movies : ", this.state.allMovies);
      } else if (res.status === "401") {
        this.setState({
          isLoggedIn: false,
          message: "Not able to fetch admin financials!!"
        });
        this.props.history.push("/login");
      }
    });
  }

  handleNext = () => {
    if (this.state.allMovies.length === CONSTANTS.PAGESIZE) {
      var currentPage = this.state.size + 1;
      this.setState({ size: currentPage });
      // this.handleWatch(currentPage);
    }
  };

  handlePrev = () => {
    if (this.state.size > 0) {
      var currentPage = this.state.size - 1;
      this.setState({ size: currentPage });
      // this.handleWatch(currentPage);
    }
  };

  render() {
    var self = this;

    Object.keys(this.state.projectData).map(pd => {
      console.log("data is here after search " + this.state.projectData);
    });

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    const withfilter =
      this.state.projectData &&
      Object.keys(this.state.projectData).map(pd => {
        return (
          <tr
            key={this.state.projectData[pd]._id}
            onClick={self.handleClick}
            className="odd ProjectTable-row project-details"
          >
            <td
              key={this.state.projectData[pd].title}
              className="ProjectTable-cell"
            >
              <b>{this.state.projectData[pd].title}</b>
              <br />
              Actors: {this.state.projectData[pd].actors} <br />
              Directed By: {this.state.projectData[pd].directors} <br />
              Genre : {this.state.projectData[pd].genre} <br />
              {this.state.projectData[pd].synopsis}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              {" "}
              {this.state.projectData[pd].year}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              {" "}
              {this.state.projectData[pd].studio}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              {" "}
              {this.state.projectData[pd].country}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              {" "}
              {this.state.projectData[pd].rating}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              {" "}
              {this.state.projectData[pd].price}
            </td>
            <td
              className="ProjectTable-cell"
              key={this.state.projectData[pd]._id}
            >
              <Button
                name="Play Movie"
                bsStyle="success"
                class="btn btn-primary"
                onClick={this.activateClass}
              >
                <NavLink to="/adminPlayMovie">Play</NavLink>
              </Button>
            </td>
          </tr>
        );
      });

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
                      Add Movie{" "}
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      bsStyle="danger"
                      bsSize="large"
                      onClick={this._onUpdateClick}
                    >
                      {" "}
                      Update or Delete Movie{" "}
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;
                    {/*<Button bsStyle="danger" bsSize="large" onClick={this._onDeleteClick}> Delete Movie </Button>*/}
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
              {this.state.showAddMovieComponent ? <AddMovie /> : null}
              {this.state.showUpdateMovieComponent ? <UpdateMovie /> : null}
              {this.state.showDeleteMovieComponent ? <DeleteMovie /> : null}
              <br />
              {!this.state.showDeleteMovieComponent &&
              !this.state.showAddMovieComponent &&
              !this.state.showUpdateMovieComponent ? (
                <div align="left">
                  &#x2705; What’s great about it? <br />
                  &#x2705; You only have to pay for work when it has been
                  completed and you’re 100% satisfied. <br />
                  &#x2705;You’ll receive free videos from our talented artists
                  within seconds. <br />
                  &#x2705; We’re always here to help. Our support consists of
                  real people who are available 24/7. <br />
                  &#x2705; You can live chat to get constant updates on the
                  progress of your work. <br />
                </div>
              ) : null}
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
