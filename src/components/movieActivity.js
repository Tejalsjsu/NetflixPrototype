import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import "../App.css"
import {Button} from 'react-bootstrap';
import  logo from '../image/fl-logo.png';
import * as API from '../api/index';
import Dashboard from './dashboard';
import Signup from './signup';
// import NavBar from '../components/navbar';
import AdminNavBar from '../components/adminNavBar';
import AddMovie from '../components/addMovie';
import UpdateMovie from '../components/updateMovie';
import DeleteMovie from '../components/deleteMovie';
import AdminFinancials from '../components/adminFinancials';
import UserDetails from '../components/userDetails';
import AdminMovieDetails from '../components/adminmovieDetails';
// import Signup from '../components/signup';

import queryString from 'query-string';
import cookie from "react-cookies";
// let imgStyle = {height: '70px', padding: '10px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
var Carousel = require('react-bootstrap').Carousel;
let imgStyle = {width: '100%', height: '400px'};
let footerText = {color: '#5DADE2'}
var img1 = require('../image/netflixBG.jpg');
var data = [];

class MovieActivity extends Component{
    constructor(props){
        super(props);
        // console.log({props.param.projectName});
         var pid = queryString.parse(this.props.location.search);
         var temp = pid && pid.projectid;

        this.state =  {
            userdata: {
                username: '',
                password: '',
                email: '',
                userId: cookie.load('userId'),
                projectId: temp,
                projectName:'',
                projectDescription:'',
                projectBudget:'',
                projectSkills:'',
                bidamount:'',
                duration:''
            },
            isLoggedIn: false,
            message: '',
            showAddMovieComponent : false,
            showUpdateMovieComponent : false,
            showDeleteMovieComponent : false,
            allMovies : [],
            noOfPlays : '',
            movieWithPlays : []

        };
          this._onAddClick = this._onAddClick.bind(this);
          this._onUpdateClick = this._onUpdateClick.bind(this);
          this._onDeleteClick = this._onDeleteClick.bind(this);
    }
    _onAddClick() {
        this.setState({
          showAddMovieComponent: true,
          showUpdateMovieComponent : false,
          showDeleteMovieComponent : false
        });
      }
      _onUpdateClick() {
          this.setState({
            showAddMovieComponent: false,
            showUpdateMovieComponent: true,
            showDeleteMovieComponent : false
          });
        }
      _onDeleteClick() {
            this.setState({
              showAddMovieComponent: false,
              showUpdateMovieComponent : false,
              showDeleteMovieComponent: true,
            });
          }
    componentWillMount(){

      this.setState({
        // searchMovie: '',
        // movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"],
        allMovies: [],
        movieWithPlays: []
      });

      //
      // API.getMovieList()
      //     .then((res) => {
      //         console.log("response is here : ", res);
      //         console.log("response length : ", res.length);
      //         // console.log("Title & Plays-->", res);
      //         // console.log("response is here-->", res);
      //         if (res.length > 0) {
      //             // console.log("In success" +res.details[0].budgetRange);
      //             this.setState({
      //                 isLoggedIn: true,
      //                 allMovies: res
      //             });
      //             let i = 0;
      //             let len = 0;
      //             len = res.length;
      //
      //             // console.log("Movie names before is: ", this.state.movieList);
      //             // console.log("Succesfully found user list as: ", data);
      //             // console.log("Content is as: ", data.content);
      //             console.log("Content length is : ",len);
      //             for(i =0; i<= res.length -1; i++){
      //               console.log("Titles ",  res[i].title)
      //               console.log("Plays ",  res[i].numberOfPlays)
      //               let tempMovie = "";
      //               tempMovie = res[i].title+" - "+ res[i].numberOfPlays;
      //               this.state.movieWithPlays.push(tempMovie);
      //               console.log("All Movies : ", tempMovie);
      //               // this.state.movieList.push(data.content[i].title);
      //             }
      //             console.log("All Movies : ", this.state.allMovies);
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

handleClick=(movieID) =>
{
  console.log(movieID);
}
    render(){
      // let withKeys = "";
      // if(!this.state.fetchedMovies){
      //  withKeys = this.state.fetchedMovies.map((function(item){
      //                 return(
      //                     <tr>
      //                         {/*changed coloumn names as per mongo db column names*/}
      //                         // <td><input type="radio" checked={false}/></td>&nbsp;&nbsp;&nbsp;&nbsp;
      //                         <td>{item._id}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      //                         <td><Button name="Update Movie" bsStyle="info" class="btn btn-primary onClick={this.handleClick(item._id)} ">More Details</Button></td>&nbsp;&nbsp;&nbsp;&nbsp;
      //                         // <td><Button name="Delete Movie" bsStyle="info" class="btn btn-primary ">Delete</Button></td>
      //                     </tr>
      //                 )
      //             }))
      //           };
        return(



            <div style={divStyle3}>
                <AdminNavBar/>
                <div className=".container-fluid">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                <Carousel>
                    <Carousel.Item>
                        <img style={imgStyle} alt="freelance.com" src={img1} />
                        <Carousel.Caption>
                            <Button bsStyle="danger" bsSize="large" onClick={this._onAddClick}> Movie Activity and Monitoring</Button> &nbsp;&nbsp;&nbsp;

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
                    <div  className="col-sm-8">
                        <AdminMovieDetails />
                        <br/>
                    </div>
                    </div>
                    <div ><br/>
                        <footer className="footer">
                        <p style={footerText}>Netflix ® is a registered Trademark of Freelancer Technology Pty Limited (ACN 142 189 759)

                            Copyright © 2018 Netflix Technology Pty Limited (ACN 142 189 759)</p>
                        </footer>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(MovieActivity);
