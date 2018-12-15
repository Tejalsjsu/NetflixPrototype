import React, { Component } from "react";
import { Link, withRouter, Route, NavLink } from "react-router-dom";
import * as API from "../../../api";
import * as CONSTANTS from "../../../constants";

import { Button } from "react-bootstrap";

var data = [];

var yearGenerate = () => {
  var yearOptions = [];
  for (var i = 1900; i <= 2019; i++) {
    yearOptions.push(<option value={i}>{i}</option>);
  }
  return yearOptions;
};

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoggedIn: "",
      userId: "",
      projectData: [],
      message: "",
      profileName: "",
      search: "",
      Rating: "",
      stars: "",
      actors: "",
      genre: "",
      pageSize: 0,
      year: ""
    };
  }

  //

  componentWillMount() {
    if (localStorage.hasOwnProperty("profileName")) {
      this.setState({
        profileName: localStorage.getItem("profileName")
      });
    }
    console.log("profileName when load " + this.state.profileName);
    let movie = {
      page: this.state.pageSize,
      size: CONSTANTS.PAGESIZE
    };
    if (this.state.profileName != undefined) {
      // this.props.history.push('/dashboard');
      //Fetch all movies
      console.log("movie payload ", movie);
      API.fetchAllMoviesByRating(movie).then(res => {
        console.log("status then");
        if (res.status === 200) {
          this.setState({
            isLoggedIn: true,
            //projectData: res
            projectData: res.data.content
          });
          data = res.data.content;
          console.log(this.state.projectData);
          this.props.history.push("/movieScoreboard");
        } else if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            message: "No projects found..!!"
          });
        }
      });
      // fetch all project ends here
    }
  }

  handleWatch = currentPage => {
    console.log("in handle watch");

    let movie = { page: currentPage, size: CONSTANTS.PAGESIZE };

    if (this.state.profileName != undefined) {
      // this.props.history.push('/dashboard');
      //Fetch all movies
      console.log("movie payload search ", movie);
      API.fetchAllMoviesByRating(movie).then(res => {
        console.log("status then");
        if (res.status === 200) {
          this.setState({
            isLoggedIn: true,
            //projectData: res
            projectData: res.data.content
          });
          data = res.data.content;
          console.log("search ", +this.state.projectData);
          this.props.history.push("/movieScoreboard");
        } else if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            message: "No projects found..!!"
          });
        }
      });
      // fetch all project ends here
    }
  };

  handleNext = () => {
    if (this.state.projectData.length === CONSTANTS.PAGESIZE) {
      var currentPage = this.state.pageSize + 1;
      this.setState({ pageSize: currentPage });
      this.handleWatch(currentPage);
    }
  };

  handlePrev = () => {
    if (this.state.pageSize > 0) {
      var currentPage = this.state.pageSize - 1;
      this.setState({ pageSize: currentPage });
      this.handleWatch(currentPage);
    }
  };

  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
  }

  render() {
    var self = this;

    Object.keys(this.state.projectData).map(pd => {
      console.log(
        "data is here after search " + this.state.projectData[pd].country
      );
    });

    function compare(a, b) {
      const starsA = a.numberOfStars;
      const starsB = b.numberOfStars;

      let comparison = 0;
      if (starsA > starsB) {
        comparison = 1;
      } else if (starsA < starsB) {
        comparison = -1;
      }
      return comparison * -1;
    }

    const withfilter =
      this.state.projectData &&
      Object.keys(this.state.projectData.sort(compare)).map(pd => {
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
              <a
                href={`/movieDetails?MovieId=${this.state.projectData[pd]._id}`}
              >
                {this.state.projectData[pd].title}
              </a>
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
              {this.state.projectData[pd].numberOfStars}
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
            {/*<td className='ProjectTable-cell' key={this.state.projectData[pd]._id}>*/}
            {/*<Button bsStyle="danger" bsSize="sm" block*/}
            {/*onClick={() => this.handleWatch(this.state.projectData[pd]._id)}> Watch </Button>*/}
            {/*</td>*/}
          </tr>
        );
      });

    return (
      <div>
        <div className="container">
          <div className="text-left">
            <h1> Movies Scoreboard, {this.state.profileName} </h1> <br />
            <div className="dashboard_tab_wrapper">
              <div className="dashboard_tab  tab-clicked">
                {" "}
                <NavLink to="/movieScoreboard">Highly Rated</NavLink>
              </div>
              <div className="dashboard_tab">
                <NavLink to="/ScoreboardByMostWatchedMovies">
                  Most Watched
                </NavLink>
              </div>
            </div>
          </div>
          <table className="ProjectTable">
            <thead className="ProjectTable-head">
              <tr>
                <th className="ProjectTable-header ProjectTable-summaryColumn">
                  Title
                </th>
                <th className="ProjectTable-header">Stars</th>
                <th className="ProjectTable-header">Year</th>
                <th className="ProjectTable-header">Studio</th>
                <th className="ProjectTable-header">Country</th>
                <th className="ProjectTable-header">Ratings</th>
                <th className="ProjectTable-header">Price</th>
              </tr>
            </thead>
            <tbody>
              {/*{nameslist}*/}
              {withfilter}
            </tbody>
          </table>
          {/*Container ends here */}
          <button type="button" class="btn" onClick={() => this.handlePrev()}>
            &laquo; Previous
          </button>
          <button type="button" class="btn" onClick={() => this.handleNext()}>
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default Scoreboard;
