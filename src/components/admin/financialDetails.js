import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import logo from "../../image/netflix-logo.jpg";
import * as API from "../../api/index";
import Login from "../login";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

let imgStyle = { height: "100px", padding: "10px", width: "300px" };
let divStyle2 = { height: "45px" };
let divStyle3 = { backgroundColor: "#E3E1E1" };
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

class FinancialDetails extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    financedata: {
      totalSubscriptionUsers: 0,
      totalPayPerViewUsers: 0,
      totalFreeUsers: 0,
      totalPaidUsers: 0,
      totalIncomeFreeUsers: 0,
      totalIncomeSubscriptionUsers: 0,
      totalIncomePayPerUsers: 0,
      totalIncomePaidUsers: 0
    },
    validation_error: [],
    isLoggedIn: false,
    message: "",
    usermessage: "",
    totalIncome: 0,
    totalUsers: 0,
    month: "",
    year: ""
  };

  componentWillMount() {
    this.setState({
      totalSubscriptionUsers: 0,
      totalPayPerViewUsers: 0,
      totalFreeUsers: 0,
      totalPaidUsers: 0,
      totalIncomeFreeUsers: 0,
      totalIncomeSubscriptionUsers: 0,
      totalIncomePayPerUsers: 0,
      totalIncomePaidUsers: 0,
      totalIncome: 0,
      totalUsers: 0
    });

    API.getFinancials().then(res => {
      // console.log("response is here : ", res);
      // console.log("response length : ", res.length);
      // console.log("Title & Plays-->", res);
      // console.log("response is here-->", res);
      if (res.length > 0) {
        // console.log("In success" +res.details[0].budgetRange);
        this.setState({
          isLoggedIn: true
          // allMovies: res
        });
        let i = 0;
        // let len = 0;
        // len = res.length;

        console.log("Financials recieved: ", res);
        // console.log("Succesfully found user list as: ", data);
        // console.log("Content is as: ", res.content);
        // console.log("Content length is : ",len);
        for (i = 0; i <= res.length - 1; i++) {
          if (res[i].typeOfPayment === "renewal") {
            this.setState({ totalIncomeSubscriptionUsers: res[i].sum });
            console.log("Subscription income: ", res[i].sum);
          } else if (res[i].typeOfPayment === "PayPerView") {
            this.setState({ totalIncomePayPerUsers: res[i].sum });
            console.log("Ppv income: ", res[i].sum);
          }
          console.log(
            "Sum is : ",
            parseInt(
              this.state.totalIncomePayPerUsers +
                this.state.totalIncomeSubscriptionUsers
            )
          );
          this.setState({
            totalIncome:
              this.state.totalIncomePayPerUsers +
              this.state.totalIncomeSubscriptionUsers
          });
        }
        // console.log("Titles ",  res[i].title)
        // console.log("Plays ",  res[i].numberOfPlays)
        // let tempMovie = "";
        // tempMovie = res[i].title+" - "+ res[i].numberOfPlays;
        // this.state.movieWithPlays.push(tempMovie);
        // console.log("All Movies : ", tempMovie);
        // console.log("Movie with plays array : ", this.state.movieWithPlays);
        // this.state.movieList.push(data.content[i].title);
        // }
        // console.log("All Movies : ", this.state.allMovies);
      } else {
        if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            message: "Not able to fetch admin financials!!"
          });
          this.props.history.push("/login");
        }
        this.setState({
          isLoggedIn: true,
          message: "There is no financial record for this month"
        });
      }
    });

    API.getUserStats().then(res => {
      if (res.length > 0) {
        this.setState({
          isLoggedIn: true
        });
        let i = 0;
        console.log("Total number of users yearly/until now: ", res);
        for (i = 0; i <= res.length - 1; i++) {
          if (res[i].typeOfUser === "Subcribed") {
            this.setState({ totalSubscriptionUsers: res[i].numberOfUsers });
            console.log("Subscription users: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "PayPerView") {
            this.setState({ totalPayPerViewUsers: res[i].numberOfUsers });
            console.log("Ppv users: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "Active") {
            this.setState({ totalFreeUsers: res[i].numberOfUsers });
            console.log("Free income: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "Uniqued") {
            this.setState({ totalPaidUsers: res[i].numberOfUsers });
            console.log("Paid users: ", res[i].numberOfUsers);
          }
          this.setState({
            totalUsers:
              this.state.totalPayPerViewUsers +
              this.state.totalSubscriptionUsers +
              this.state.totalPaidUsers +
              this.state.totalFreeUsers
          });
        }
      } else {
        if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            usermessage: "Not able to fetch yearly user details!!"
          });
          this.props.history.push("/login");
        }
        this.setState({
          isLoggedIn: true,
          usermessage: "There is no user record for this year!",
          totalSubscriptionUsers: 0,
          totalPayPerViewUsers: 0,
          totalFreeUsers: 0,
          totalPaidUsers: 0,
          totalUsers: 0
        });
      }
    });
  }

  handleMonthly = () => {
    API.getFinancialsByMonthly(this.state.year, this.state.month).then(res => {
      if (res.length > 0) {
        // console.log("In success" +res.details[0].budgetRange);
        this.setState({
          isLoggedIn: true,
          // allMovies: res
          message: ""
        });
        let i = 0;
        console.log("Financials recieved Monthly: ", res);
        for (i = 0; i <= res.length - 1; i++) {
          if (res[i].typeOfPayment === "renewal") {
            this.setState({ totalIncomeSubscriptionUsers: res[i].sum });
            console.log("Subscription income: ", res[i].sum);
          } else if (res[i].typeOfPayment === "PayPerView") {
            this.setState({ totalIncomePayPerUsers: res[i].sum });
            console.log("Ppv income: ", res[i].sum);
          }
          console.log(
            "Sum is : ",
            parseInt(
              this.state.totalIncomePayPerUsers +
                this.state.totalIncomeSubscriptionUsers
            )
          );
          this.setState({
            totalIncome:
              this.state.totalIncomePayPerUsers +
              this.state.totalIncomeSubscriptionUsers
          });
        }
      } else {
        if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            message: "Not able to fetch admin financials!!"
          });
          this.props.history.push("/login");
        }
        this.setState({
          isLoggedIn: true,
          message: "Thee is no financials record!!",
          totalIncomeSubscriptionUsers: 0,
          totalIncomePayPerUsers: 0
        });
      }
    });

    API.getUserStatsByMonthly(this.state.year, this.state.month).then(res => {
      if (res.length > 0) {
        // console.log("In success" +res.details[0].budgetRange);
        this.setState({
          isLoggedIn: true,
          // allMovies: res
          usermessage: ""
        });
        let i = 0;
        console.log("Users count: ", res);
        for (i = 0; i <= res.length - 1; i++) {
          if (res[i].typeOfUser === "Subcribed") {
            this.setState({ totalSubscriptionUsers: res[i].numberOfUsers });
            console.log("Subscription users: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "PayPerView") {
            this.setState({ totalPayPerViewUsers: res[i].numberOfUsers });
            console.log("Ppv users: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "Active") {
            this.setState({ totalFreeUsers: res[i].numberOfUsers });
            console.log("Free income: ", res[i].numberOfUsers);
          } else if (res[i].typeOfUser === "Uniqued") {
            this.setState({ totalPaidUsers: res[i].numberOfUsers });
            console.log("Paid users: ", res[i].numberOfUsers);
          }
          this.setState({
            totalUsers:
              this.state.totalPayPerViewUsers +
              this.state.totalSubscriptionUsers +
              this.state.totalPaidUsers +
              this.state.totalFreeUsers
          });
        }
      } else {
        if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            usermessage: "Not able to fetch user number of different types!!"
          });
          this.props.history.push("/login");
        }
        this.setState({
          isLoggedIn: true,
          usermessage: "There is no user record for selected month!!",
          totalSubscriptionUsers: 0,
          totalPayPerViewUsers: 0,
          totalFreeUsers: 0,
          totalPaidUsers: 0,
          totalUsers: 0
        });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="col-sm-4"> </div>
        <div style={divStyle1} className="col-sm-3">
          {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

          <p style={formHead1}>
            <b>
              <h3>Financial details of users in MovieCentral</h3>
            </b>
          </p>
          <hr color="#E3E1E1" />
          {this.state.message && (
            <div className="alert alert-warning" role="alert">
              {this.state.message}
            </div>
          )}
          {this.state.usermessage && (
            <div className="alert alert-warning" role="alert">
              {this.state.usermessage}
            </div>
          )}
          <form style={formStyle1}>
            <select
              className="form-control"
              value={this.state.month}
              onChange={event => {
                this.setState({
                  month: event.target.value
                });
              }}
            >
              <option value="Select">Select month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <br />
            <select
              className="form-control"
              value={this.state.year}
              onChange={event => {
                this.setState({
                  year: event.target.value
                });
              }}
            >
              <option value="Select">Select year</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
            </select>
            <br />
            <div className="btn btn-primary" onClick={this.handleMonthly}>
              Process
            </div>
            <table>
              <tr>
                <td>Sr. No.</td>&nbsp;&nbsp;
                <td>Financial type</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>User type</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Total users</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Total income</td>
              </tr>
              <tr>
                <td>1</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>-</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Active</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalFreeUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>-</td>
              </tr>
              <tr>
                <td>2</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Subscribed</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Subscribed</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalSubscriptionUsers}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalIncomeSubscriptionUsers}</td>
              </tr>
              <tr>
                <td>3</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>PayPerView</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>PayPerView</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalPayPerViewUsers}</td>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalIncomePayPerUsers}</td>
              </tr>
              <tr>
                <td>4</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>-</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>Uniqued</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>{this.state.totalPaidUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                <td>-</td>
              </tr>
            </table>
            <br />
            <label>Total income for selected duration:</label>
            <input
              className="form-control"
              placeholder="$111"
              readonly="readonly"
              value={this.state.totalIncome}
            />
            <label>Total users for selected duration:</label>
            <input
              className="form-control"
              placeholder="$111"
              readonly="readonly"
              value={this.state.totalUsers}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default FinancialDetails;
