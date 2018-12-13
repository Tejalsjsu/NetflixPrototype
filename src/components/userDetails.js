import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import logo from "../image/netflix-logo.jpg";
import * as API from "../api/index";
import Login from "./login";
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
var data = [];

class UserDetails extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    userdata: {
      profileName: "",
      subscribed: "",
      nextRenewalDate: ""
      // viewed_movie_list: []
    },
    userlist: "",
    searchUser: {
      search: "",
      page: 0,
      size: 10
    },
    currentCustomers: [],
    currentCustObject: {
      profileName: ""
    },
    top_ten_users: [],

    validation_error: [],
    isLoggedIn: false,
    message: "",
    top_ten_movies: []

    // currentCustomersHC: []
  };

  componentWillMount() {
    console.log("CompWillMount");
    this.setState({
      profileName: localStorage.getItem("profileName"),
      subscriptionType: "Free",
      renewalDate: "12/20",
      viewed_movie_list: ["Movie 12", "Movie 23", "Movie 34", "Movie 45"],
      userdata: "",
      // top_ten_users : ["User top1 B", "User top9", "User D", "User A", "User B", "User C", "User D"],
      // currentCustomers: ["Cust1 ", "CUst2, ", "Cust1 ", "CUst2, "],
      search: "",
      page: 0,
      size: 10
      // currentCustomers: [],
      // top_ten_users: []
    });
    // console.log("Search this: ", this.state.searchUser);
    // console.log("Search page: ", this.state.searchUser.page);
    // console.log("Search size: ", this.state.searchUser.size);

    API.getUsers(this.state.searchUser, this.state.page, this.state.size).then(
      res => {
        console.log("response from API on FE:  ", res);
        if (res.length > 0 || res.status == 200) {
          console.log(" Success");
          this.setState({
            userlist: res
          });
          // console.log('------->user list ', this.state.userlist)
          data = res;
          // this.state.userdata = res;
          let i = 0;
          let len = 0;
          len = res.length;
          console.log(
            "Succesfully found user list in userdata as : ",
            this.state.userdata
          );
          // console.log("User data array length is : ",len);
          for (i = 0; i <= data.length - 1; i++) {
            if (data[i].role === "USER") {
              let tempUser = "";
              tempUser = data[i].profileName;
              this.state.top_ten_users.push(tempUser);
              this.state.currentCustomers.push(tempUser);
            }
          }
          this.setState({
            profileName: JSON.stringify(this.state.currentCustomers)
          });
          // console.log("CURRENT customer list here: ",  this.state.userdata.profileName)
        } else if (res.status === "401") {
          console.log("No records");
          this.setState({
            isLoggedIn: true,
            message: "No records found..!!"
          });
        } else if (res.status === "402") {
          this.setState({
            isLoggedIn: false,
            message: "Session Expired..!!"
          });
          this.props.history.push("/login");
        }
      }
    );
  }

  handleUserSelect = userID => {
    console.log("Handling particular user fetch: ", userID);
    this.setState({
      isUpdateRequested: true,
      userdata: {
        profileName: "",
        subscribed: "",
        nextRenewalDate: ""
      }
    });
    console.log("User id selected is: ", userID);
    // console.log("User to be updated --->: ", this.state.userdata.title);

    Object.keys(this.state.userlist).map(pd => {
      if (this.state.userlist[pd]._id == userID) {
        console.log("UserID --> " + this.state.userlist[pd]._id);
        // console.log("Profile Name " + this.state.userlist[pd].profileName);
        // console.log("Subscription " + this.state.userlist[pd].subscribed);
        // console.log("Renewal Date " + this.state.userlist[pd].nextRenewalDate);
        this.state.profileName = this.state.userlist[pd].profileName;
        this.state.subscribed = this.state.userlist[pd].subscribed;
        this.state.nextRenewalDate = this.state.userlist[pd].nextRenewalDate;

        // this.setState({
        //   userdata:{
        //   profileName: this.state.userlist[pd].profileName,
        //   subscribed: this.state.userlist[pd].subscribed,
        //   nextRenewalDate: this.state.userlist[pd].nextRenewalDate,
        // }
        // });
        console.log("User data fetched is here : ", this.state.userdata);
        // console.log("State profile name ", this.state.profileName);
        // console.log("State subscribed: ", this.state.subscribed);
        // console.log("State renewal: ", this.state.nextRenewalDate);
      } else {
        console.log("Not matched");
      }
    });
  };

  handleUserSubmit = () => {
    console.log("Inside handleUserSubmit");
    console.log("CURRENT customer list -> ", this.state.currentCustomers);
    // this.setState({
    //   top_ten_users : ["User top1 B", "User top9", "User D", "User A", "User B", "User C", "User D"],
    //   currentCustomers: ["Cust1 ", "CUst2, ", "Cust1 ", "CUst2, "]
    // });
  };

  render() {
    // console.log("Inside render !!!")
    var self = this;
    const userFromList =
      this.state.userlist &&
      Object.keys(this.state.userlist)
        .filter(pd => this.state.userlist[pd].role == "USER")
        .map(pd => {
          return (
            <tr
              key={this.state.userlist[pd]._id}
              onClick={() => this.handleUserSelect(this.state.userlist[pd]._id)}
              className=""
            >
              <a
                href="#"
                data-toggle="modal"
                data-target="#myUserModal"
                key={this.state.userlist[pd]._id}
              >
                <td className="" key={this.state.userlist[pd]._id}>
                  {" "}
                  {this.state.userlist[pd].profileName}
                </td>
              </a>
            </tr>
          );
        });

    const withUserData =
      this.state.userlist &&
      Object.keys(this.state.userlist).map(pd => {
        return (
          <tr key={this.state.userlist[pd]._id} onClick={self.handleClick}>
            <td key={this.state.userlist[pd].profileName} />
          </tr>
        );
      });

    const CurrentUsers = this.state.currentCustomers.map(function(item) {
      return (
        <tr>
          {/*changed coloumn names as per mongo db column names*/}
          <td data-toggle="modal" data-target="#myModal">
            {item}
          </td>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </tr>
      );
    });

    console.log("Current users const ", CurrentUsers);

    const topTenUsers = this.state.top_ten_users.map(function(item) {
      return (
        <tr>
          <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </tr>
      );
    });

    const movieHistory = this.state.viewed_movie_list.map(function(item) {
      return (
        <tr>
          <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </tr>
      );
    });

    return (
      <div>
        <div className="col-sm-4"> </div>
        <div style={divStyle1} className="col-sm-6">
          {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

          <p style={formHead1}>Current active users in MovieCentral</p>
          <hr color="#E3E1E1" />
          {/*<Button name="UserList" bsStyle="info" class="btn btn-primary"   onClick={() => this.handleUserSubmit()}>Click here to view current customers</Button><br/>*/}
          <form style={formStyle1}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>
                      <i>Current Customers Using Movie Central </i>
                    </b>
                  </td>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </tr>
                {userFromList}
              </tbody>

              {/*<tr data-toggle="modal" data-target="#myModal">
                    <td>A</td>&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                  <tr data-toggle="modal" data-target="#myModal" >
                    <td>B</td>&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                  <tr data-toggle="modal" data-target="#myModal">
                    <td>C</td>&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                  <tr data-toggle="modal" data-target="#myModal" >
                    <td>D</td>&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>*/}
            </table>
            <br />
            <p />
            <select
              className="form-control"
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.handleChange}
            >
              <option value="day">Last 24 hours</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
            </select>
            <br />
            <Button
              name="Top10"
              bsStyle="info"
              class="btn btn-primary "
              data-toggle="modal"
              data-target="#myTop10Modal"
              onClick={() => this.handleUserSubmit()}
            >
              Click here to view top 10 users list
            </Button>
            <br />

            {/*Modal for customer list*/}
            <div class="modal fade" id="myUserModal" data-toggle="myUserModal">
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
                      User details of {this.state.profileName}
                    </h4>
                  </div>
                  <div class="modal-body">
                    <label> User name:</label>
                    <input
                      className="form-control"
                      name="type"
                      readonly="readonly"
                      placeholder="-"
                      value={this.state.profileName}
                    />
                    <br />
                    <label> Subscription:</label>
                    <input
                      className="form-control"
                      name="type"
                      readonly="readonly"
                      placeholder="Not subscribed"
                      value={this.state.subscribed}
                    />
                    <br />
                    <label> Renewal Date:</label>
                    <input
                      className="form-control"
                      name="type"
                      readonly="readonly"
                      placeholder="-"
                      value={this.state.nextRenewalDate}
                    />
                    <br />
                    <table>
                      <tbody>{/*Movie history here*/}</tbody>
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
            {/*<!-- /.modal -->*/}

            {/*Modal for customer list*/}
            <div
              class="modal fade"
              id="myTop10Modal"
              data-toggle="myTop10Modal"
            >
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
                    <h4 class="modal-title">Current top 10 user list</h4>
                  </div>
                  <div class="modal-body">
                    {/*<select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
        <option value="Select">Select duration</option>
        <option value="day">Last 24 hours</option>
        <option value="week">Last week</option>
        <option value="month">Last month</option>
      </select><br />*/}
                    <table>
                      <tbody>{topTenUsers}</tbody>
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
            {/*<!-- /.modal -->*/}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UserDetails);
