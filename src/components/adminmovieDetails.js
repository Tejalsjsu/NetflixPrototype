import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import * as API from "../api/index";

let divStyle1 = {
  align: "right",
  backgroundColor: "#FEFDFD",
  padding: "12px",
  marginTop: "27px",
  width: "500px"
};
let formHead1 = {
  color: "blue",
  fontFamily: "Open Sans",
  fontSize: "55",
  fontWeight: "bold"
};
let formStyle1 = { align: "center", fontFamily: "Open Sans", fontSize: "70" };
// let tableStyle1 = {align:'center', padding: '19px 9px 9px 9px'}

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      top_ten_movies: [],
      movieWithPlays: [],
      days: 1
    };
  }

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
        <div className="col-sm-4"> </div>
        <div style={divStyle1} className="col-sm-3">
          {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

          <p style={formHead1}>
            <h3>Movie Plays Monitoring</h3>
          </p>
          <hr color="#E3E1E1" />

          <h4>
            <b>Select duration for Top 10 list:</b>
          </h4>
          <select
            className="form-control"
            name={this.props.name}
            value={this.state.days}
            onChange={event => {
              this.setState({
                days: event.target.value
              });
            }}
          >
            <option selected="true" value="1">
              Last 24 hours
            </option>
            <option value="7">Last week</option>
            <option value="30">Last month</option>
          </select>
          <br />
          <Button
            name="Top10"
            bsStyle="info"
            class="btn btn-primary "
            data-toggle="modal"
            data-target="#myTop10Modal"
            onClick={() =>
              this.handleViewTopTenMovie(this.state.days, false, true)
            }
          >
            Click here to view top 10 movie list1
          </Button>
        </div>

        <div class="modal fade" id="myTop10Modal" data-toggle="myTop10Modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">
                  <b>Movie history</b>
                </h4>
                <h4>{this.state.message}</h4>
              </div>
              <div class="modal-body">
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
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
            {/*<!-- /.modal-content -->*/}
          </div>
          {/*<!-- /.modal-dialog -->*/}
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetails);
