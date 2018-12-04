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
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '300px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};

class DeleteMovie extends Component{
  constructor(props){
    super(props);
  }
    state = {
        userdata: {
            username: '',
            password: '',
            email:'',
            typeOfUser:''
        },
        validation_error: [],
        isLoggedIn: false,
        message: ''
    };


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

            <p style={formHead1}>Update movie details below :</p>
            <hr color="#E3E1E1"/>
                <form>
                <input type="text" className="form-control" placeholder="Title" value={this.state.userdata.email} readonly="readonly"/> <br/>
                <input type="text" className="form-control" placeholder="Genre" onChange={this.handleInputChange} /><br />
                <input type="number" className="form-control" placeholder="Year" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Studio" onChange={this.handleInputChange} /><br />
                <textarea type="text" className="form-control" placeholder="Short movie synopsis" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="image.jpg" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Movie URL" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Actor" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Director" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Country" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Rating" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Subscription type" onChange={this.handleInputChange} /><br />

                {/*
                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="Select">Select option</option>
                  <option value="Free">Free</option>
                  <option value="Subscription">Subscription only</option>
                  <option value="Pay-per-view">Pay-per-view</option>
                  <option value="Paid">Paid</option>
                </select><br />*/}

                <input type="number" className="form-control" placeholder="Price in $" onChange={this.handleInputChange} /><br />
                <Button name="Add Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myModal">Update</Button><br/>

                  {/*Modal for delete movie*/}
                <div class="modal fade" id="myModal" data-toggle="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie updated successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Movie was updated in the database successfully.</p>
                        <p> Please note any current ongoing activity would not be affected for any user.</p>
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

export default withRouter(DeleteMovie);
