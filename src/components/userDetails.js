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

class UserDetails extends Component{
  constructor(props){
    super(props);
  }
    state = {
        userdata: {
            profileName: '',
            subscriptionType: '',
            renewalDate: '',
            viewed_movie_list: []
        },
        currentCustomers: [],
        validation_error: [],
        isLoggedIn: false,
        message: '',
        top_ten_movies : []
    };

    componentWillMount() {
        this.setState({
                profileName: 'Aparna',
                subscriptionType: 'Free',
                renewalDate: '12/20',
                viewed_movie_list: ["Movie 12", "Movie 23", "Movie 34","Movie 45"],
              top_ten_users : ["User top1 B", "User top9", "User D", "User A", "User B", "User C", "User D"],
              currentCustomers: ["Amy","Bob", "John", "Tom"]
        });
}
        // API.fetchSensorData()
        //     .then((res) => {
        //         //console.log("status " +[res]);
        //         if (res) {
        //             console.log(' Success')
        //             this.setState({
        //                 isLoggedIn: true,
        //                 sensordata: res
        //             });
        //             data = res;
        //             console.log('ID: ', this.state.sensordata.sensorID)
        //             console.log('map', data)
        //             this.props.history.push('/addSensor');
        //         } else if (res.status === '401') {
        //             console.log("No records");
        //             this.setState({
        //                 isLoggedIn: true,
        //                 message: "No Senosrs found..!!",
        //             });
        //         } else if (res.status === '402') {
        //             this.setState({
        //                 isLoggedIn: false,
        //                 message: "Session Expired..!!",
        //             });
        //             this.props.history.push('/login');
        //         }
        //     });



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
      const customers = this.state.currentCustomers.map((function(item){
                      return(
                          <tr>
                              {/*changed coloumn names as per mongo db column names*/}
                              <td data-toggle="modal" data-target="#myModal">{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </tr>
                      )
                  }))
      const topTenUsers = this.state.top_ten_users.map((function(item){
                                              return(
                                                  <tr>
                                                      <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                  </tr>
                                              )
                                          }))
      const movieHistory = this.state.viewed_movie_list.map((function(item){
                                                                                  return(
                                                                                      <tr>
                                                                                          <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                      </tr>
                                                                                  )
                                                                              }))

        return(

            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Current active users in MovieCentral</p>
            <hr color="#E3E1E1"/>
                <form style={formStyle1}>
                <table>
                  <tr>
                    <td><b><i>Current Customers Using Movie Central </i></b></td>&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                  {customers}
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
                </table><br/>
                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="day">Last 24 hours</option>
                  <option value="week">Last week</option>
                  <option value="month">Last month</option>
                </select><br />
                <Button name="Top10" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myTop10Modal">Click here to view top 10 users list</Button><br/>

              {/*Modal for customer list*/}
                <div class="modal fade" id="myModal" data-toggle="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">User details and movie history of user ABC</h4>
                      </div>
                      <div class="modal-body">
                      <label> User name:</label><input className="form-control" name="type" readonly="readonly" placeholder="ABC"/><br/>
                      <label> Subscription:</label><input className="form-control" name="type" readonly="readonly" placeholder="Free"/><br/>
                      <label> Renewal Date:</label><input className="form-control" name="type" readonly="readonly" placeholder="11/30/18"/><br/>
                      <table>
                      {movieHistory}
                      </table>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                    {/*<!-- /.modal-content -->*/}
                  </div>{/*<!-- /.modal-dialog -->*/}
                </div>{/*<!-- /.modal -->*/}

{/*Modal for customer list*/}
<div class="modal fade" id="myTop10Modal" data-toggle="myTop10Modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
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
        {topTenUsers}
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

      </div>
    </div>
    {/*<!-- /.modal-content -->*/}
  </div>{/*<!-- /.modal-dialog -->*/}
</div>{/*<!-- /.modal -->*/}

                </form>
                </div>
            </div>
        );
    }
  }

export default withRouter(UserDetails);
