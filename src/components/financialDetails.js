import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link, Route, withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import Login from "./login";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '500px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};
let formStyle1 = {align:'center', fontFamily : 'Open Sans', fontSize: '70'}
// let tableStyle1 = {align:'center', padding: '19px 9px 9px 9px'}

class FinancialDetails extends Component{
  constructor(props){
    super(props);
  }
    state = {
        financedata: {
            month: '',
            year: '',
            totalFreeUsers:'',
            totalSubscriptionUsers: '',
            totalPayPerUsers:'',
            totalPaidUsers:'',
            totalIncomeFreeUsers: 0,
            totalIncomeSubscriptionUsers: 0,
            totalIncomePayPerUsers: 0,
            totalIncomePaidUsers: 0
        },
        validation_error: [],
        isLoggedIn: false,
        message: '',
        totalIncome: 0

    };

    componentWillMount(){
      this.setState({
        totalFreeUsers: '0',
        totalSubscriptionUsers: '0',
        totalPayPerUsers:'0',
        totalPaidUsers:'0',
        totalIncomeFreeUsers:0,
        totalIncomeSubscriptionUsers: 0,
        totalIncomePayPerUsers:0,
        totalIncomePaidUsers:0,
        totalIncome: 0
      });


      API.getFinancials()
          .then((res) => {
              // console.log("response is here : ", res);
              // console.log("response length : ", res.length);
              // console.log("Title & Plays-->", res);
              // console.log("response is here-->", res);
              if (res.length > 0) {
                  // console.log("In success" +res.details[0].budgetRange);
                  this.setState({
                      isLoggedIn: true,
                      // allMovies: res
                  });
                  let i = 0;
                  // let len = 0;
                  // len = res.length;

                  console.log("Financials recieved: ", res);
                  // console.log("Succesfully found user list as: ", data);
                  // console.log("Content is as: ", res.content);
                  // console.log("Content length is : ",len);
                  for(i =0; i<= res.length -1; i++){
                    if(res[i].typeOfPayment === "Renewal"){
                      this.setState({ totalIncomeSubscriptionUsers: res[i].sum});
                      console.log("Subscription income: ", res[i].sum)
                    }else if(res[i].typeOfPayment === "PayPerView"){
                      this.setState({ totalIncomePayPerUsers: res[i].sum});
                      console.log("Ppv income: ", res[i].sum)
                    }
                    console.log("Sum is : ", parseInt(this.state.totalIncomePayPerUsers+this.state.totalIncomeSubscriptionUsers));
                      this.setState({totalIncome: this.state.totalIncomePayPerUsers+this.state.totalIncomeSubscriptionUsers});
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
              } else if (res.status === '401') {
                  this.setState({
                      isLoggedIn: false,
                      message: "Not able to fetch admin financials!!",
                  });
                  this.props.history.push('/login');
              }
          });

    }
    handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

    handleSubmit = () => {
        //validations


        // if(this.state.userdata.username.length === 0){
        //     errors.push("Kindly enter user Name");
        //  }
         //else if(!noAlphabets.test(this.state.userdata.username)) {
        //     errors.push("Invalid Username");
        // }

        // if(this.state.userdata.password.length === 0){
        //     errors.push("Kindly enter a password");
        // }
        // else if(!noAlphabets.test(this.state.userdata.password)) {
        //     errors.push("Invalid Password");
        // }

        // if(this.state.userdata.email.length === 0){
        //     errors.push("Kindly enter email");
        // } else if (!email_regex.test(this.state.userdata.email)){
        //     errors.push("Invalid email");
        // }
        //
        // if(errors.length === 0) {
        //     this.props.history.push('/dashboard');
        //     API.saveData(this.state.userdata)
        //         .then((res) => {
        //             console.log(res.status);
        //             if (res.status === '201') {
        //                 this.setState({
        //                     isLoggedIn: true,
        //                     message: "Account Created! You can Login..!!"
        //                 });
        //                 console.log("after set", this.props);
        //                 this.props.history.push('/signup');
        //                 console.log("after set", this.props);
        //                 //history.push('/login');
        //             } else if (res.status === '401') {
        //                 this.setState({
        //                     isLoggedIn: false,
        //                     message: "Signup. Try again..!!",
        //
        //                 });
        //             }
        //         });
        // }else{
        //     this.setState ({
        //         validation_error: errors
        //     })
         //}
    };

    render(){
        return(
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}><b><h3>Financial details of users in MovieCentral</h3></b></p>
            <hr color="#E3E1E1"/>
                <form style={formStyle1}>
                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="Select">Select month</option>
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="Jun">June</option>
                  <option value="Jul">July</option>
                  <option value="Aug">August</option>
                  <option value="Sep">September</option>
                  <option value="Oct">October</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </select><br/>
                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="Select">Select year</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                </select><br />
                <table>
                  <tr>
                    <td>Sr. No.</td>&nbsp;&nbsp;
                    <td>User type</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Total users</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Total income</td>
                  </tr>
                  <tr>
                    <td>1</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Free</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalFreeUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>2</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Subscribed</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalSubscriptionUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalIncomeSubscriptionUsers}</td>
                  </tr>
                  <tr>
                    <td>3</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>PayPerView</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalPayPerUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalIncomePayPerUsers}</td>
                  </tr>
                  <tr >
                    <td>4</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Paid</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{this.state.totalPaidUsers}</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>-</td>
                  </tr>
                </table><br/>
            <label>Total income for selected month:</label><input className="form-control" placeholder="$111" readonly="readonly" value={this.state.totalIncome} />
                </form>
                </div>
            </div>
        );
    }
  }

export default withRouter(FinancialDetails);
