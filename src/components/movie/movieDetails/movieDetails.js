import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../../../App.css";
import { Button } from "react-bootstrap";
import * as API from "../../../api/index";
import Dashboard from "../dashboard/dashboard";

import queryString from "query-string";

let divStyle3 = { backgroundColor: "#E3E1E1" };

class movieDetails extends Component {
  constructor(props) {
    super(props);
    // console.log({props.param.projectName});
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.MovieId;
    console.log("here " + temp);

    this.state = {
      userdata: {
        username: "",
        password: "",
        email: "",
        userId: localStorage.getItem("userId"),
        movieId: temp,
        movieTitle: "",
        Synopsis: "",
        actors: "",
        genre: "",
        year: "",
        duration: "",
        Image: "",
        studio: "",
        director: "",
        country: "",
        rating: "",
        availability: "",
        price: "",
        movieURL: ""
      },
      reviewText: "",
      postStars: "",
      reviews: [],
      isLoggedIn: true,
      message: ""
    };
  }

  componentWillMount() {
    var pid = queryString.parse(this.props.location.search);
    var temp = pid && pid.MovieId;

    var temPid = this.state.userdata.movieId;

    API.fetchMovieById(this.state.userdata.movieId).then(res => {
      //console.log("status " +res.data.title);
      if (res.status === 200) {
        console.log("In success");
        this.setState({
          isLoggedIn: true,
          userdata: {
            projectId: temPid,
            movieTitle: res.data.title,
            Synopsis: res.data.synopsis,
            price: res.data.price,
            actors: res.data.actors,
            genre: res.data.genre,
            studio: res.data.studio,
            director: res.data.director,
            country: res.data.country,
            rating: res.data.rating,
            availability: res.data.availability,
            year: res.data.year,
            movieId: temp,
            movieURL: res.data.movieURL
          }
        });
      } else if (res.status === "401") {
        this.setState({
          isLoggedIn: false,
          message: "No projects found..!!"
        });
        this.props.history.push("/movieDetails");
      }
    });

    //Fetch Review
    let moviepayload = {
      movieId: this.state.userdata.movieId,
      page: 0,
      size: 2
    };

    //console.log('movie payload ', moviepayload)
    API.fetchMovieReviewsById(moviepayload).then(res => {
      console.log("status reviews " + res);
      if (res.status === 200) {
        console.log("In success");
        this.setState({
          isLoggedIn: true,
          reviews: res.data.content
        });
        console.log("reviews ", this.state.reviews);
      } else if (res.status === "401") {
        this.setState({
          isLoggedIn: false,
          message: "No projects found..!!"
        });
        this.props.history.push("/movieDetails");
      }
    });
  }

  postReview = () => {
    //this.props.history.push('/playMovie');
    let reviewDetails = {
      customerId: localStorage.getItem("userId"),
      movieId: this.state.userdata.movieId,
      reviewText: this.state.reviewText
    };
    console.log("Star review ", this.state.postStars);
    if (this.state.postStars !== "") {
      reviewDetails.reviewRate = this.state.postStars;
    }
    console.log("payload ", reviewDetails);
    API.postReview(reviewDetails).then(res => {
      if (res.status === 200) {
        console.log("after watch ", res);
        const reviewsList = this.state.reviews;
        reviewsList.push(res.data);

        this.setState({
          isLoggedIn: true,
          message: "Review Posted Successfully..!!",
          reviews: reviewsList
        });
        // this.props.history.push(
        //   "/movieDetails?MovieId=" + this.state.userdata.movieId
        // );
      } else {
        this.setState({
          message: "post Failed. Try again..!!"
        });
      }
    });
  };

  handleWatch = () => {
    //this.props.history.push('/playMovie');
    let watchDetails = {
      movieId: this.state.userdata.movieId,
      customerId: localStorage.getItem("userId")
    };
    console.log(this.props.location);
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.detail !== undefined) {
        watchDetails.orderId = this.props.location.state.detail;
      }
    }

    console.log("payload ", watchDetails);
    API.ValidateMovieForWatch(watchDetails).then(res => {
      console.log(res.status);
      if (res.status === 200) {
        if (res.data.allowed == true) {
          this.props.history.push({
            pathname: "/playMovie",
            state: { movieURL: this.state.userdata.movieURL }
          });
        } else if (
          res.data.typeOfMovie == "PayPerView" ||
          res.data.typeOfMovie == "Paid"
        ) {
          this.props.history.push(
            "/addMoney?total=" +
              res.data.total +
              "&&MovieId=" +
              this.state.userdata.movieId
          );
        } else {
          console.log("what is res ", res.data);
          this.props.history.push("/subscription");
        }
        this.setState({
          isLoggedIn: true,
          message: "Bid Posted Successfully..!!"
        });
      } else {
        let total = "25";
        this.props.history.push("/addMoney?total=" + total);
        this.setState({
          message: "post Failed. Try again..!!"
        });
      }
    });
  };

  render() {
    var self = this;
    const reviews =
      this.state.reviews &&
      Object.keys(this.state.reviews).map(pd => {
        return (
          <tr
            key={this.state.reviews[pd]._id}
            onClick={self.handleClick}
            className="odd ProjectTable-row project-details"
          >
            <td className="ProjectTable-cell" key={this.state.reviews[pd]._id}>
              {" "}
              {this.state.reviews[pd].reviewText}
            </td>
            <td className="ProjectTable-cell" key={this.state.reviews[pd]._id}>
              {" "}
              {this.state.reviews[pd].reviewRate}
            </td>
            <td className="ProjectTable-cell" key={this.state.reviews[pd]._id}>
              {" "}
              {this.state.reviews[pd].profileName}
            </td>
          </tr>
        );
      });

    return (
      <div style={divStyle3}>
        <div className="container">
          <div>
            {/*<div className="col-md-3">*/}
            {this.state.message && (
              <div className="alert alert-warning" role="alert">
                {this.state.message}
              </div>
            )}
          </div>

          <h2 className="project_name padding-b20">
            {" "}
            &nbsp; &nbsp;{this.state.userdata.movieTitle}{" "}
          </h2>
          <div className="col-sm-12">
            <div className="panel panel-default text-center">
              <div className="panel-body text-left">
                <div className="block align-c">
                  <p className="project-p padding-l10 padding-r10">Year</p>
                  <div className="text-blue padding-l10 padding-r10">
                    {this.state.userdata.year}
                  </div>
                </div>
                <div className="block align-c border-l border-r">
                  <p className="project-p padding-l10 padding-r10">Price</p>
                  <div className="text-blue  padding-l10 padding-r10">
                    ${this.state.userdata.price}
                  </div>
                </div>
                <div className="block align-c border-r">
                  <p className="project-p padding-l10 padding-r10"> Rating </p>
                  <div className="text-blue  padding-l10 padding-r10">
                    {this.state.userdata.rating}
                  </div>
                </div>

                <div className="block align-c right">
                  <div className="text-green bold larger margin-b5 padding-r10">
                    {" "}
                    OPEN{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.userdata.movieTitle != undefined && (
            <div className="col-sm-12">
              <div className="panel panel-default text-center">
                {/*<div className="panel-heading">*/}
                {/*<h4>{this.state.userdata.projectName}</h4>*/}
                {/*</div>*/}
                <div className="panel-body text-left projectBrief-inner">
                  <div className="project-brief margin-b5 col-sm-8">
                    <h2 className="project-brief-subheading bold">
                      {" "}
                      Movie Synopsis{" "}
                    </h2>
                    <p className="project-p">{this.state.userdata.Synopsis}</p>

                    <h2 className="project-brief-subheading bold"> Studio </h2>
                    <p className="project-p">{this.state.userdata.studio}</p>

                    <h2 className="project-brief-subheading bold">
                      {" "}
                      Start Cast{" "}
                    </h2>
                    <p className="project-p">{this.state.userdata.actors}</p>
                  </div>
                  <div className="project-sidebar col-sm-4 padding-r10">
                    <div className="padding-r10 padding-l10 padding-t20">
                      <Button
                        bsStyle="success"
                        bsSize="sm"
                        onClick={() => this.handleWatch()}
                      >
                        Watch Movie{" "}
                      </Button>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="panel-body text-left projectBrief-inner">
                  <div className="project-brief margin-b5 col-sm-10">
                    <a
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapse1"
                      className="btn-large btn-primary-green"
                    >
                      Post Review
                    </a>
                  </div>
                  <div className="block align-right padding-r10 right">
                    <div className="ProjectReport">
                      <span>Movie ID:</span>
                      <span> {this.state.userdata.movieId}</span>
                    </div>
                  </div>
                </div>
                <div />
                <div className="panel-footer">
                  <div id="collapse1" className="panel-collapse collapse">
                    <div className="panel-body">
                      <span>Review :</span> &nbsp; &nbsp;
                      <input
                        type="text"
                        defaultValue={this.state.reviewText}
                        onChange={event => {
                          this.setState({
                            reviewText: event.target.value
                          });
                        }}
                      />
                      <span> &nbsp;&nbsp; Stars:</span> &nbsp; &nbsp;
                      <select
                        id="ddlCurrency"
                        className="input-lg"
                        defaultValue={this.state.postStars}
                        value={this.state.postStars}
                        onChange={event => {
                          this.setState({
                            postStars: event.target.value
                          });
                        }}
                      >
                        <option value="" />
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      {/*<input type="number" placeholder="15" value={this.state.userdata.projectId}*/}
                      {/*maxLength={8}/>*/}
                      <br /> <br />
                      <Button
                        bsStyle="success"
                        bsSize="sm"
                        onClick={() => this.postReview()}
                      >
                        Post Review{" "}
                      </Button>
                    </div>
                  </div>
                </div>

                <table className="ProjectTable">
                  <thead className="ProjectTable-head">
                    <tr>
                      <th className="ProjectTable-header">Review Text</th>
                      <th className="ProjectTable-header">Rating</th>
                      <th className="ProjectTable-header">Reviewd By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*{nameslist}*/}
                    {reviews}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default movieDetails;
