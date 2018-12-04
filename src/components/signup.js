import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link, Route, withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import registrationConfirmation from "./registrationConfirmation";
let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};

class Signup extends Component{
    state = {
        userdata: {
            username: '',
            password: '',
            // email:'',
            // role:'',
            profileName: ''
        },
        validation_error: [],
        isLoggedIn: false,
        message: ''
    };

    handleChange(e) {
        this.setState({ value: e });
    }

    handleSubmit = () => {
        //validations
        let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let noAlphabets=/[0-9]/g;
        let errors =[];

        if(this.state.userdata.username.length === 0){
            errors.push("Kindly enter user Name");
         }
         //else if(!noAlphabets.test(this.state.userdata.username)) {
        //     errors.push("Invalid Username");
        // }

        if(this.state.userdata.password.length === 0){
            errors.push("Kindly enter a password");
        }
        // else if(!noAlphabets.test(this.state.userdata.password)) {
        //     errors.push("Invalid Password");
        // }

        if(this.state.userdata.username.length === 0){
            errors.push("Kindly enter email");
        } else if (!email_regex.test(this.state.userdata.username)){
            errors.push("Invalid email");
        }

        if(errors.length === 0) {
            let signUpData = {
                username: this.state.userdata.username,
                password: this.state.userdata.password,
                profileName: this.state.userdata.profileName
            }
             API.saveData(signUpData)
                 .then((res) => {
                     console.log(res.status);
                     if (res.status === 200) {
                         this.setState({
                             isLoggedIn: true,
                             message: "Account Created! An email verification link has been send. Kindly Verify your email and login!!"
                         });
                         //console.log("after set", this.props);
                         this.props.history.push('/registrationConfirmation');
                         //console.log("after set", this.props);
                         //history.push('/login');
                     } else  {
                         this.setState({
                             isLoggedIn: false,
                             message: "Signup could not be processes. Pleae try again..!!",

                         });
                     }
                 });
         }else{
             this.setState ({
                 validation_error: errors
             })
         }
    };

    render(){
        return(
            <div>
                <Route exact path="/signup" render={() => (
                    <div>
                        <div className="container">
                            {/*<div className="col-md-3">*/}
                            {this.state.validation_error && (
                                <div>
                                    {this.state.validation_error.map((item,index)=><div key={index} className="alert alert-danger" role="alert">{item}</div>)}
                                </div>
                            )}

                            <div >
                                {/*<div className="col-md-3">*/}
                                {this.state.message && (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.message} <a href="/login">Login</a>
                                    </div>
                                )}
                                {/*</div>*/}
                            </div>
                            {/*</div>*/}
                        </div>
                        <div className="col-sm-4"> </div>

                        <div style={divStyle1} className="col-sm-3">

                            <img src={logo} style={imgStyle} alt="logo"/>
                            <hr color="#E3E1E1"/>
                            <input type="text" className="form-control" placeholder="Email" value={this.state.userdata.username}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               username: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <input type="text" className="form-control" placeholder="Enter User Name" value={this.state.userdata.profileName}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               profileName: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <input type="password" className="form-control" placeholder="Enter Password" value={this.state.userdata.password}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               password: event.target.value
                                           }
                                       });
                                   }}/><br/>

                            {/*<input type="text" className="form-control" placeholder="Enter profile Name" value={this.state.userdata.profileName}*/}
                                   {/*onChange={(event) => {*/}
                                       {/*this.setState({*/}
                                           {/*userdata: {*/}
                                               {/*...this.state.userdata,*/}
                                               {/*profileName: event.target.value*/}
                                           {/*}*/}
                                       {/*});*/}
                                   {/*}}/><br/>*/}


                            {/*<h4> Type of User</h4>*/}
                            {/*<input type="radio" name="payment" value="Admin" checked={this.state.userdata.role === 'Admin'} onChange={(event) => {*/}
                                {/*this.setState({*/}
                                    {/*userdata: {*/}
                                        {/*...this.state.userdata,*/}
                                        {/*role: event.target.value*/}
                                    {/*}*/}
                                {/*});*/}
                            {/*}} />  <span className="font-grey"> Admin </span>*/}
                            {/*<input type="radio" name="payment" value="User" onChange={(event) => {*/}
                                {/*this.setState({*/}
                                    {/*userdata: {*/}
                                        {/*...this.state.userdata,*/}
                                        {/*role: event.target.value*/}
                                    {/*}*/}
                                {/*});*/}
                            {/*}}/> <span className="font-grey"> User </span> <br/>*/}
                            {/*<br/> <br/>*/}


                            <Button bsStyle="danger" bsSize="sm" block
                                    onClick={() => this.handleSubmit()}> Create Account </Button> <br/>
                            <div>By registering you confirm that you accept the
                                <Link to="/login">Terms and Conditions</Link> and <Link to="/login">Privacy Policy</Link> </div>
                        </div>

                        <hr color="#E3E1E1"/>
                        {/*<div> Already a Freelancer.com member?<Link to="/login"> Log In</Link> </div>*/}
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                {this.state.message && (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.message}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}/>

                <Route exact path="/registrationConfirmation" render = {() => (
                    <div>
                        <registrationConfirmation/>
                    </div>
                )}/>

            </div>
        );
    }
}
export default withRouter(Signup);