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

class MovieDetails extends Component{
  constructor(props){
    super(props);
  }
    state = {
        moviedata: [{
            movieTitle: '',
            numberOfPlays: '',
        }],
        validation_error: [],
        isLoggedIn: false,
        message: '',
        top_ten_movies : [],
        duration: ''

    };


    handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillMount(){
    this.setState({
      moviedata: [
        {
        movieTitle: 'Tin Tin',
        numberOfPlays: '23'
      },
      {
        movieTitle: 'Star Trek',
        numberOfPlays: '123'
      },
      {
        movieTitle: 'Mad Max Fury Road',
        numberOfPlays: '290'
      },
      {
        movieTitle: 'Twilight',
        numberOfPlays: '125'
      }
    ],
    // top_ten_movies : ["A", "B", "C", "D", "1", "2", "3", "4", "5"]

    });

    API.getMovieList()
        .then((res) => {
            console.log("response ", res);
            if (res.status === '200') {
                // console.log("In success" +res.details[0].budgetRange);
                this.setState({
                    isLoggedIn: true,
                    top_ten_movies: res
                });
                console.log("All Movies are here : ", this.top_ten_movies);
                console.log("Title : ",  this.top_ten_movies.title);
            } else if (res.status === '401') {
                this.setState({
                    isLoggedIn: false,
                    message: "Not able to fetch admin financials!!",
                });
                this.props.history.push('/login');
            }
        });


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

      const movieAndPlays = this.state.moviedata.map((function(item){
                      return(
                          <tr>
                              {/*changed coloumn names as per mongo db column names*/}

                              <td>{item.movieTitle}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <td>{item.numberOfPlays}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </tr>
                      )
                  }))
      const topTenMovies = this.state.top_ten_movies.map((function(item){
                                  console.log(item);
                                  return(
                                      <tr>
                                          <td>{item.title}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      </tr>
                                  )
                              }))
        return(
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Movie details in MovieCentral</p>
            <hr color="#E3E1E1"/>
                <form style={formStyle1}>
                <table>
                  <tr>
                    <td><b><i>Movie Name</i></b></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td><b><i>Number of plays</i></b></td>
                  </tr>
                  {movieAndPlays}
                </table><br/>
                  Select duration for Top 10 list:
                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>

                  <option selected="true" value="day">Last 24 hours</option>
                  <option value="week">Last week</option>
                  <option value="month">Last month</option>
                </select><br />
                <Button name="Top10" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myTop10Modal">Click here to view top 10 movie list</Button><br/>

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
                      <label> Enrolled since:</label><input className="form-control" name="type" readonly="readonly" placeholder="11/30/18"/><br/>
                      <p>Movie History for user:</p>
                        <p>Movie 1</p>
                        <p>Movie 2</p>
                        <p>Movie 3</p>
                        <p>Movie 4</p>
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
        <h4 class="modal-title">Current top 10 movie list </h4>
      </div>
      <div class="modal-body">
      {/*<select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
        <option value="Select">Select duration</option>
        <option value="day">Last 24 hours</option>
        <option value="week">Last week</option>
        <option value="month">Last month</option>
      </select><br />*/}
      <table>
      {topTenMovies}
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

export default withRouter(MovieDetails);
