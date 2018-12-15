import React, { Component } from "react";
import * as API from "../api";
import * as CONSTANTS from "../constants";
import { OrderedMap } from "immutable";
import { Button } from "react-bootstrap";

var data = [];

var yearGenerate = () => {
  var yearOptions = [];
  for (var i = 1900; i <= 2019; i++) {
    yearOptions.push(<option value={i}>{i}</option>);
  }
  return yearOptions;
};

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      message: "",
      search: "",
      size: CONSTANTS.PAGESIZE,
      movieHistoryList: [],
      page: 0
    };
  }

  componentWillMount() {
    if (localStorage.getItem("JWTToken")) {
      // this.props.history.push('/dashboard');
      //Fetch all movies
      console.log(this.state.page);
      API.getUsers("", 0, CONSTANTS.PAGESIZE).then(res => {
        console.log("response from API on FE:  ", res);
        if (res.length >= 0 || res.status == 200) {
          console.log(" Success", res);
          this.setState({
            userlist: res
          });
        }
      });
      // fetch all project ends here
    }
  }

  handleUserSearch = currentPage => {
    console.log("fasfa", this.state.search);
    API.getUsers(this.state.search, currentPage, CONSTANTS.PAGESIZE).then(
      res => {
        console.log("response from API on FE:  ", res);
        if (res.length >= 0 || res.status == 200) {
          console.log(" Success");
          this.setState({
            userlist: res
          });
        }
      }
    );
    // fetch all project ends here
  };

  handleNext = () => {
    console.log(this.state.userlist.length);
    if (this.state.userlist.length === CONSTANTS.PAGESIZE) {
      var currentPage = this.state.page + 1;
      this.setState({ page: currentPage });
      this.handleUserSearch(currentPage);
    }
  };

  handlePrev = () => {
    if (this.state.page > 0) {
      var currentPage = this.state.page - 1;
      this.setState({ page: currentPage });
      this.handleUserSearch(currentPage);
    }
  };

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
    var self = this;

    const withfilter =
      this.state.userlist &&
      Object.keys(this.state.userlist)
        .filter(pd => this.state.userlist[pd].role == "USER")
        .map(pd => {
          return (
            <tr
              key={this.state.userlist[pd]._id}
              onClick={self.handleClick}
              className="odd ProjectTable-row project-details"
            >
              <td className="ProjectTable-cell">
                {this.state.userlist[pd].username}
              </td>
              <td className="ProjectTable-cell">
                {" "}
                {this.state.userlist[pd].profileName}
              </td>
              <td className="ProjectTable-cell">
                {this.state.userlist[pd].role === "ADMIN" ? "AD" : ""}
                {this.state.userlist[pd].role === "USER" ? "REG" : ""}
              </td>
              <td className="ProjectTable-cell">
                {" "}
                {new Date(
                  this.state.userlist[pd].startMemberDate
                ).toLocaleDateString()}
              </td>
              <td className="ProjectTable-cell">
                {this.state.userlist[pd].subcribed
                  ? new Date(
                      this.state.userlist[pd].startSubcribedDate
                    ).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="ProjectTable-cell">
                {this.state.userlist[pd].subcribed
                  ? new Date(
                      this.state.userlist[pd].nextRenewalDate
                    ).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="ProjectTable-cell">
                <Button
                  bsStyle="info"
                  class="btn btn-primary "
                  data-toggle="modal"
                  data-target="#movieHistory"
                  onClick={() =>
                    this.viewMovieHistory(this.state.userlist[pd]._id)
                  }
                >
                  View Movie History
                </Button>
              </td>
            </tr>
          );
        });

    const historyMovie =
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
      <div>
        <div className="container">
          <div className="text-left">
            <h1> Browse Users </h1> <br /> <br />
            <div className="section-heading text-left">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="search">
                  {" "}
                  <h4> Search</h4>{" "}
                </label>

                <div className="col-sm-10">
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-search" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search User"
                        defaultValue={this.state.search}
                        id="search"
                        onChange={event => {
                          this.setState({
                            search: event.target.value
                          });
                        }}
                      />{" "}
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        bsStyle="success"
                        bsSize="sm"
                        onClick={() => {
                          this.setState({ page: 0 });
                          this.handleUserSearch(0);
                        }}
                      >
                        {" "}
                        Search{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
            <table className="ProjectTable">
              <thead className="ProjectTable-head">
                <tr>
                  <th className="ProjectTable-header ProjectTable-summaryColumn">
                    Email
                  </th>
                  <th className="ProjectTable-header">Name</th>
                  <th className="ProjectTable-header">ROLE</th>
                  <th className="ProjectTable-header">Member Since</th>
                  <th className="ProjectTable-header">Subc Since</th>
                  <th className="ProjectTable-header">Renewal Date</th>
                  <th className="ProjectTable-header" />
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
          <div class="modal fade" id="movieHistory" data-toggle="myTop10Modal">
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
                    <tbody>{historyMovie}</tbody>
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
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
