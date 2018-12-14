import React, { Component } from "react";
import { Link, withRouter, Route } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";

import FinancialDetails from "./financialDetails";
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
      adminFinances: []
    };
    this._onAddClick = this._onAddClick.bind(this);
    this._onUpdateClick = this._onUpdateClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }
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
    // var temPid = this.state.userdata.projectId;
    this.setState({
      adminFinances: []
    });
    console.log("Admin financials will be fetched!! ");
    // API.getFinancials()
    //     .then((res) => {
    //         console.log("response ", res);
    //         if (res.status === '200') {
    //             // console.log("In success" +res.details[0].budgetRange);
    //             this.setState({
    //                 isLoggedIn: true,
    //                 adminFinances: res
    //             });
    //             console.log("Financial details : ", this.adminFinances);
    //         } else if (res.status === '401') {
    //             this.setState({
    //                 isLoggedIn: false,
    //                 message: "Not able to fetch admin financials!!",
    //             });
    //             this.props.history.push('/login');
    //         }
    //     });
  }
  handleSubmit = () => {
    // API.postBid(this.state.userdata)
    //     .then((res) => {
    //         console.log(res.status);
    //         if (res.status === '201') {
    //             this.setState({
    //                 isLoggedIn: true,
    //                 message: "Bid Posted Successfully..!!"
    //             });
    //             this.props.history.push('/projectdetails');
    //         } else if (res.status === '401') {
    //             this.setState({
    //                 message: "post Failed. Try again..!!",
    //             });
    //         }
    //     });
  };

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
                      Subscription and Movie Financials{" "}
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
              <FinancialDetails />
              <br />
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
}

export default AdminAddMovie;
