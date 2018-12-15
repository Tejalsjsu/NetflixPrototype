import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter, Route, NavLink } from "react-router-dom";
import * as API from "../api";
import cookie from "react-cookies";
import avatar from "../image/avatar.jpg";

let imgHeight = { height: "190px" };
let img = require("../image/profile.jpg");
let profilePic = { width: "300px" };
let bgcolor = { backgroundColor: "#EAECEC" };
let bgwhite = { backgroundColor: "#FDFFFF" };
let footerText = { color: "#5DADE2" };

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      name: "",
      userId: localStorage.getItem("userId"),
      email: "",
      role: localStorage.getItem("role"),
      isSubcribed: false,
      nextRenewalDate: null,
      startSubcribedDate: null,
      movieHistoryList: []
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e });
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  componentWillMount() {
    API.fetchUserProfile(this.state.userId).then(res => {
      console.log("status ", res);
      if (!res.username) {
        this.props.history.push("/login");
      }
      //update username
      this.setState({
        email: res.username,
        name: res.profileName,
        isSubcribed: res.subcribed,
        nextRenewalDate: res.nextRenewalDate ? res.nextRenewalDate : null,
        startSubcribedDate: res.startSubcribedDate
          ? res.startSubcribedDate
          : null
      });
    });
  }

  componentDidMount() {
    if (!localStorage.getItem("JWTToken")) {
      this.props.history.push("/");
    }
  }

  viewMovieHistory = userId => {
    API.getUserMovieHistory(userId).then(result => {
      console.log(result);
      this.setState({
        movieHistoryList: result
      });
    });
  };

  render() {
    const withfilter =
      this.state.movieHistoryList &&
      Object.keys(this.state.movieHistoryList).map(pd => {
        return (
          <tr
            key={this.state.movieHistoryList[pd].movie._id}
            className="odd ProjectTable-row project-details"
          >
            <td
              key={this.state.movieHistoryList[pd].movie.title}
              className="ProjectTable-cell"
            >
              <a
                href={`/movieDetails?MovieId=${
                  this.state.movieHistoryList[pd].movie._id
                }`}
              >
                {this.state.movieHistoryList[pd].movie.title}
              </a>
              <br />
              Actors: {this.state.movieHistoryList[pd].movie.actors} <br />
              Directed By: {
                this.state.movieHistoryList[pd].movie.directors
              }{" "}
              <br />
              Genre : {this.state.movieHistoryList[pd].movie.genre} <br />
              {this.state.movieHistoryList[pd].movie.synopsis}
            </td>
          </tr>
        );
      });

    return (
      <div style={bgcolor}>
        <div className="container" style={bgcolor}>
          <div className="col-md-4" style={bgwhite}>
            <br />
            <div className="media">
              <div className="media-left padding-img" style={bgwhite}>
                <img
                  src={avatar}
                  className="media-object img-circle"
                  style={profilePic}
                />
              </div>{" "}
              <br />
            </div>
          </div>
          <div className="col-md-8" style={bgwhite}>
            <div className="media-body text-left padding">
              <h3 className="media-heading font-grey">
                {this.state.proffesionHeading}
              </h3>{" "}
              <br />
              <br /> <br />
              <h2>
                Welcome {this.state.role} : {this.state.name}
              </h2>
              <div className="well well-lg font-grey">
                <div className="padding">
                  <div>
                    {" "}
                    Subcribed since:{" "}
                    {this.state.isSubcribed
                      ? new Date(
                          this.state.startSubcribedDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div>
                    {" "}
                    Subcribed Until:{" "}
                    {this.state.isSubcribed
                      ? new Date(
                          this.state.nextRenewalDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div> Email: {this.state.email} </div>

                  <Button
                    name="Top10"
                    bsStyle="info"
                    class="btn btn-primary "
                    data-toggle="modal"
                    data-target="#myTop10Modal"
                    onClick={() =>
                      this.viewMovieHistory(localStorage.getItem("userId"))
                    }
                  >
                    Click here to view watched movie history
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <br />
          <footer className="footer">
            <p style={footerText}>
              Freelancer ® is a registered Trademark of Freelancer Technology
              Pty Limited (ACN 142 189 759) Copyright © 2018 Freelancer
              Technology Pty Limited (ACN 142 189 759)
            </p>
          </footer>
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
                  {/*<select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
        <option value="Select">Select duration</option>
        <option value="day">Last 24 hours</option>
        <option value="week">Last week</option>
        <option value="month">Last month</option>
      </select><br />*/}
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
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
      </div>
    );
  }
}

export default Profile;
