import React, { Component } from "react";
import * as API from "../../../api";
import * as CONSTANTS from "../../../constants";
import { Link, withRouter, Route, NavLink } from "react-router-dom";

import { Button } from "react-bootstrap";

var data = [];

var yearGenerate = () => {
  var yearOptions = [];
  for (var i = 1900; i <= 2019; i++) {
    yearOptions.push(<option value={i}>{i}</option>);
  }
  return yearOptions;
};

class scoreboardByMostWatchedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      top_ten_movies: [],
      movieWithPlays: []
    };
  }

  //

  componentWillMount() {
    this.handleViewTopTenMovie(10000, true, false);
  }

  handleViewTopTenMovie = days => {
    API.getMovieList(days).then(res => {
      if (res.length > 0) {
        let topTen = res.length < 10 ? res.length : 10;
        let tempTopTenMovielist = [];
        for (var i = 0; i < topTen; i++) {
          tempTopTenMovielist.push(res[i]);
        }
        this.setState({
          top_ten_movies: tempTopTenMovielist
        });
      } else if (res.status === "401") {
        this.setState({
          message: "Not able to fetch movies!!!"
        });
        this.props.history.push("/login");
      }
    });
  };

  render() {
    const withfilter =
      this.state.top_ten_movies &&
      Object.keys(this.state.top_ten_movies).map(pd => {
        return (
          <tr
            key={this.state.top_ten_movies[pd]._id}
            className="odd ProjectTable-row project-details"
          >
            <td
              key={this.state.top_ten_movies[pd]._id}
              className="ProjectTable-cell"
            >
              <a
                href={`/movieDetails?MovieId=${
                  this.state.top_ten_movies[pd]._id
                }`}
              >
                {this.state.top_ten_movies[pd].title}
              </a>
            </td>
            <td
              key={this.state.top_ten_movies[pd]._id}
              className="ProjectTable-cell"
            >
              {this.state.top_ten_movies[pd].numberOfPlays}
            </td>
          </tr>
        );
      });

    return (
      <div>
        <div className="container">
          <div className="text-left">
            <h1> Movies Scoreboard, {this.state.profileName} </h1> <br />
            <div className="dashboard_tab_wrapper">
              <div className="dashboard_tab">
                {" "}
                <NavLink to="/movieScoreboard">Highly Rated</NavLink>
              </div>
              <div className="dashboard_tab tab-clicked">
                <NavLink to="/ScoreboardByMostWatchedMovies">
                  Most Watched
                </NavLink>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Number of Plays</th>
              </tr>
            </thead>
            <tbody>{withfilter}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default scoreboardByMostWatchedMovies;
