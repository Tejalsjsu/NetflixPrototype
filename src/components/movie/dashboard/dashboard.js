import React, { Component } from "react";
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

class Dashboard extends Component {
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
          this.props.history.push("/dashboard");
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

  handleLogout = () => {
    console.log("in logout");
    API.logout(this.state.username).then(res => {
      if (res.status === "201") {
        console.log("in 201");
        this.setState({
          isLoggedIn: false
        });
        this.props.history.push("/login");
      } else if (res.status === "401") {
        this.setState({
          isLoggedIn: true
        });
        // this.props.history.push("/login");
      }
    });
  };

  handleWatch = currentPage => {
    console.log("in handle watch");

    let movie = { page: currentPage, size: CONSTANTS.PAGESIZE };
    //search keywords
    if (this.state.search !== "") {
      movie.search = this.state.search;
    }
    //filter options
    movie.filters = {};

    if (this.state.Rating !== "") {
      movie.filters.rating = this.state.Rating;
    }

    if (this.state.actors !== "") {
      movie.filters.actors = this.state.actors;
    }

    if (this.state.stars !== "") {
      movie.filters.numberOfStars = this.state.stars;
    }

    if (this.state.year !== "") {
      movie.filters.year = this.state.year;
    }

    if (this.state.genre !== "") {
      movie.filters.genre = this.state.genre;
    }

    if (Object.keys(movie.filters).length == 0) {
      delete movie.filters;
    }

    if (this.state.profileName != undefined) {
      // this.props.history.push('/dashboard');
      //Fetch all movies
      console.log("movie payload search ", movie);
      API.fetchAllMovies(movie).then(res => {
        console.log("status then");
        if (res.status === 200) {
          this.setState({
            isLoggedIn: true,
            //projectData: res
            projectData: res.data.content
          });
          data = res.data.content;
          console.log("search ", +this.state.projectData);
          this.props.history.push("/dashboard");
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
            <h1> Browse Movies, {this.state.profileName} </h1> <br /> <br />
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
                        placeholder="Search Movies"
                        defaultValue={this.state.search}
                        id="search"
                        onChange={event => {
                          this.setState({
                            search: event.target.value
                          });
                        }}
                      />{" "}
                      <Button
                        bsStyle="success"
                        bsSize="sm"
                        onClick={() => {
                          this.setState({ pageSize: 0 });
                          this.handleWatch(0);
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
            <div className="section-heading text-left">
              <div className="form-group">
                <label
                  className="control-label col-sm-2 padding"
                  htmlFor="skills"
                >
                  {" "}
                  <h4> Rating </h4>{" "}
                </label>

                <div className="col-sm-3">
                  <select
                    id="ddlCurrency"
                    className="input-lg"
                    value={this.state.Rating}
                    onChange={event => {
                      this.setState({
                        Rating: event.target.value
                      });
                    }}
                  >
                    <option value="" />
                    <option value="R">R</option>
                    <option value="U/A">U/A</option>
                  </select>{" "}
                  &nbsp; &nbsp;
                </div>

                <div className="col-sm-4 form-group">
                  <label
                    className="control-label col-sm-2 padding"
                    htmlFor="types"
                  >
                    {" "}
                    <h4> Genre: </h4>{" "}
                  </label>
                  <select
                    id="ddlCurrency"
                    className="input-lg"
                    value={this.state.genre}
                    onChange={event => {
                      this.setState({
                        genre: event.target.value
                      });
                    }}
                  >
                    <option value="" selected="true" />
                    <option value="comedy">Comedy</option>
                    <option value="action">Action</option>
                    <option value="romantic">Romantic</option>
                    <option value="drama">Drama</option>
                  </select>{" "}
                  &nbsp; &nbsp;
                </div>

                <div className="col-sm-3 form-group">
                  <label
                    className="control-label col-sm-2 padding"
                    htmlFor="types"
                  >
                    {" "}
                    <h4> Year: </h4>{" "}
                  </label>
                  <select
                    id="ddlCurrency"
                    className="input-lg"
                    value={this.state.year}
                    onChange={event => {
                      this.setState({
                        year: event.target.value
                      });
                    }}
                  >
                    <option value="" />
                    {yearGenerate().map(item => item)}
                  </select>{" "}
                  &nbsp; &nbsp;
                </div>
              </div>
              <br />
            </div>
            <div className="section-heading text-left">
              <div className="form-group">
                <div className="col-sm-10">
                  <label className="control-label col-sm-2" htmlFor="search">
                    {" "}
                    <h4> Actor</h4>{" "}
                  </label>

                  <div className="col-sm-5">
                    <div className="form-group ">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Actor name"
                          defaultValue={this.state.actors}
                          id="search"
                          onChange={event => {
                            this.setState({
                              actors: event.target.value
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4 form-group">
                    <label
                      className="control-label col-sm-2 padding"
                      htmlFor="types"
                    >
                      {" "}
                      <h4> Stars: </h4>{" "}
                    </label>
                    <select
                      id="ddlCurrency"
                      className="input-lg"
                      value={this.state.stars}
                      onChange={event => {
                        this.setState({
                          stars: event.target.value
                        });
                      }}
                    >
                      <option value="" />
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>{" "}
                    &nbsp; &nbsp;
                  </div>
                </div>
              </div>
              <br />
            </div>
            <table className="ProjectTable">
              <thead className="ProjectTable-head">
                <tr>
                  <th className="ProjectTable-header ProjectTable-summaryColumn">
                    Title
                  </th>
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
      </div>
    );
  }
}

export default Dashboard;
