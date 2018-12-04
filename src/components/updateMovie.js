import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import Login from "./login";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '700px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};

class UpdateMovie extends Component{
  constructor(props){
    super(props);
  }
    state = {
        moviedata: {
            searchMovie: '',
            movieList: []
        },
        validation_error: [],
        isLoggedIn: false,
        message: ''
    };


    componentWillMount() {
      this.setState({
        searchMovie: '',
        movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"]
      });
    //             API.fetchMovieData()
    //                 .then((res) => {
    //                     //console.log("status " +[res]);
    //                     if (res) {
    //                         console.log(' Success')
    //                         this.setState({
    //                             isLoggedIn: true,
    //                             sensorData: res
    //                         });
    //                         data = res;
    //                         //console.log("state " +data[0].sensor_make);
    //                         this.props.history.push('/icons');
    //                     } else if (res.status === '401') {
    //                         console.log("No records");
    //                         this.setState({
    //                             isLoggedIn: true,
    //                             message: "No Senosrs found..!!",
    //                         });
    //                     } else if (res.status === '402') {
    //                         this.setState({
    //                             isLoggedIn: false,
    //                             message: "Session Expired..!!",
    //                         });
    //                         this.props.history.push('/login');
    //                     }
    //                 });
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
{/*return component for withKeys*/}

const withKeys = this.state.movieList.map((function(item){
                return(
                    <tr>
                        {/*changed coloumn names as per mongo db column names*/}
                        <td><input type="radio" checked={false}/></td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Update Movie" bsStyle="info" class="btn btn-primary ">Update</Button></td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Delete Movie" bsStyle="info" class="btn btn-primary ">Delete</Button></td>
                    </tr>
                )
            }))


        return(
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Search and update Movie details below</p>
            <hr color="#E3E1E1"/>
            <input type="text" className="form-control" placeholder="Search movie"/> <br/>
            <Button name="Search Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#mySearchModal">Search Movie</Button><br/>
            <hr color="#E3E1E1"/>
                <form>
                <table>
                  <tr>
                    <td>Sr. No.</td>&nbsp;&nbsp;
                    <td>Movie Title</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Update</td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>Delete</td>
                  </tr>
                  {withKeys}
                </table>
{/*
                <input type="text" className="form-control" placeholder="Title" value={this.state.userdata.email} readonly="readonly"/> <br/>
                <input type="text" className="form-control" placeholder="Genre" onChange={this.handleInputChange} /><br />
                <input type="number" className="form-control" placeholder="Year" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Studio" onChange={this.handleInputChange} /><br />
                <textarea type="text" className="form-control" placeholder="Short movie synopsis" onChange={this.handleInputChange} /><br />
                <label>Current Image:</label>
                <input type="text" className="form-control" placeholder="current-image.jpg" onChange={this.handleInputChange} /><br />
                <label>Choose another</label>
                <input type="file" className="form-control" placeholder="upload image" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Movie URL" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Actor" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Director" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Country" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Rating" onChange={this.handleInputChange} /><br />

                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="Select">Select option</option>
                  <option value="Free">Free</option>
                  <option value="Subscription">Subscription only</option>
                  <option value="Pay-per-view">Pay-per-view</option>
                  <option value="Paid">Paid</option>
                </select><br />
                <input type="number" className="form-control" placeholder="Price in $" onChange={this.handleInputChange} /><br />
                <Button name="Add Movie" bsStyle="success" class="btn btn-primary " data-toggle="modal" data-target="#myModal">Update Movie</Button><br/>*/}
                    {/*Modal for update movie*/}
                <div class="modal fade" id="myModal" data-toggle="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie features updated successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Users will now be able to view updated features for movie ABC!!</p>
                        <p>Following features updated: </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                    {/*<!-- /.modal-content -->*/}
                  </div>{/*<!-- /.modal-dialog -->*/}
                </div>{/*<!-- /.modal -->*/}

                  {/*Modal for search movie*/}
                  <div class="modal fade" id="mySearchModal" data-toggle="mySearchModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title">Movie search was successful/unsuccessful message.</h4>
                        </div>
                        <div class="modal-body">
                          <p>You can now update the movie features populated.</p>
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

export default withRouter(UpdateMovie);
