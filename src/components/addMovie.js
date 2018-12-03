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

class AddMovie extends Component{
  constructor(props){
    super(props);

    this.state = {
        addmoviedata: {
            title: '',
            genre: '',
            year:'',
            studio:'',
            synopsis: '',
            image: '',
            url: '',
            actor: '',
            director: '',
            country: '',
            rating: '',
            subscription: '',
            price: '',
            jwtToken: ''

        },
        loginDetails:
        {
                  username: '',
                  password: ''
        },
        validation_error: [],
        isLoggedIn: false,
        message: '',
        isSubmitted: false,


    };
    // this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
      this.setState({
        title: '',
        genre: '',
        year:'',
        studio:'',
        synopsis: '',
        image: '',
        url: '',
        actor: '',
        director: '',
        country: '',
        rating: '',
        subscription: '',
        price: '',
        jwtToken: '',
        username: 'tuan.ung@sjsu.edu',
        password: 'user'
      }
    );

    API.getJWTToken(this.loginDetails)
    .then((res) => {
      // console.log("Response from getJWTToken(): ", res);
      console.log("JWTToken: ", res.JWTToken);
      if(res){
        this.setState({
          jwtToken : res.JWTToken,
          isLoggedIn: true,
          message: "User not validated. Wrong username or password."

        });
        this.props.history.push("/adminAddMovie");
        console.log("Recieved JWTtoken from Login: ", this.state.jwtToken);
      } else if (res.status === 401 || res.status === 403 || res.status === 500){
        console.log("Error while receiving JWT token.");

      }
    });
  }

  //   handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }


    handleSubmit = () => {
      const isSubmitted="true"
      // const submitted = "true",
      const isEnabled = this.state.addmoviedata.title.length > 0;
      console.log("Submitted");
      console.log("Title : " +this.state.addmoviedata.title);
      console.log("length : " +this.state.addmoviedata.title.length);
      console.log(this.isEnabled);
    


          API.addMovie(this.state.addmoviedata)
            .then((res) => {
                if (res) {
                    this.setState({
                        message: "Movie Added!!",
                    });
                    this.props.history.push("/adminAddMovie");
                    console.log("In add movie call.");
                } else if (res.status === '401') {
                    console.log("in fail");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });

                }
            });
    };

    render(){
        return(
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Add Movie details below</p>
            <hr color="#E3E1E1"/>
                <form>
                <input name="title" type="text" className="form-control" placeholder="Title"  value={this.state.addmoviedata.title}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,title: event.target.value}});}}/> <br/>
                <input name="genre" type="text" className="form-control" placeholder="Genre" value={this.state.addmoviedata.genre}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,genre: event.target.value}});}}/><br />
                <input name="year" type="number" className="form-control" placeholder="Year" value={this.state.addmoviedata.year}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,year: event.target.value}});}}/><br />
                <input name="studio" type="text" className="form-control" placeholder="Studio"  value={this.state.addmoviedata.studio}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,studio: event.target.value}});}}/><br />
                <textarea name="synopsis" type="text" className="form-control" placeholder="Short movie synopsis"  value={this.state.addmoviedata.synopsis}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,synopsis: event.target.value}});}}/><br />
                <input name="image" type="text" className="form-control" placeholder="Image URL" value={this.state.addmoviedata.image}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,image: event.target.value}});}}/><br />
                <input name="url" type="text" className="form-control" placeholder="Movie URL" value={this.state.addmoviedata.url}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,url: event.target.value}});}}/><br />
                <input name="actor" type="text" className="form-control" placeholder="Actor" value={this.state.addmoviedata.actor}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,actor: event.target.value}});}}/><br />
                <input name="director" type="text" className="form-control" placeholder="Director" value={this.state.addmoviedata.director}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,director: event.target.value}});}}/><br />
                <input name="country" type="text" className="form-control" placeholder="Country" value={this.state.addmoviedata.country}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,country: event.target.value}});}}/><br />
                <input name="rating" type="text" className="form-control" placeholder="Rating"  value={this.state.addmoviedata.rating}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,rating: event.target.value}});}}/><br />

                <select className="form-control" name="subscription" value={this.state.addmoviedata.subscription}>
                  <option value="Select">Select subscription type</option>
                  <option value="Free">Free</option>
                  <option value="Subscription">Subscription only</option>
                  <option value="Pay-per-view">Pay-per-view</option>
                  <option value="Paid">Paid</option>
                </select><br />
                <input name="price" type="number" className="form-control" placeholder="Price in $" value={this.state.addmoviedata.price}
                onChange={(event) => {this.setState({addmoviedata: {...this.state.addmoviedata,price: event.target.value}});}}/><br />
                <Button name="Add Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myModal" onClick={this.handleSubmit}>Add Movie</Button><br/>

                <div class="modal fade" id="myModal" data-toggle="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie <b><i>{this.state.addmoviedata.title}</i></b> added successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Users now can access <b><i>{this.state.addmoviedata.title}</i></b> movie from their profiles!</p>
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

export default withRouter(AddMovie);
