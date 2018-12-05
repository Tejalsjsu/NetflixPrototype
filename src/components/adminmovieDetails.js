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
        duration: '',
        allMovies: [],
        movieWithPlays: [],

    };


    handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillMount(){
    this.setState({
      // searchMovie: '',
      // movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"],
      allMovies: [],
      movieWithPlays: [],
      top_ten_movies:[]
    });


    API.getMovieList()
        .then((res) => {
            console.log("response in getMovie List : ", res);
            console.log("response length : ", res.length);
            // console.log("Title & Plays-->", res);
            // console.log("response is here-->", res);
            if (res.length > 0) {
                // console.log("In success" +res.details[0].budgetRange);
                this.setState({
                    isLoggedIn: true,
                    allMovies: res
                });
                let i = 0;
                let len = 0;
                len = res.length;

                // console.log("Movie names before is: ", this.state.movieList);
                // console.log("Succesfully found user list as: ", data);
                // console.log("Content is as: ", data.content);
                console.log("Content length is : ",len);
                for(i =0; i<= res.length -1; i++){
                  console.log("Titles ",  res[i].title)
                  console.log("Plays ",  res[i].numberOfPlays)
                  let tempMovie = "";
                  tempMovie = res[i].title+" - "+ res[i].numberOfPlays;
                  this.state.top_ten_movies.push(res[i].title);
                  this.state.movieWithPlays.push(tempMovie);
                  console.log("All Movies : ", tempMovie);
                  console.log("Movie with plays array : ", this.state.movieWithPlays);
                  console.log("Top 10 Movies : ", this.state.top_ten_movies);
                  // this.state.movieList.push(data.content[i].title);
                }
                this.setState({allMovies : this.state.movieWithPlays});
                console.log("All Movies-> : ", this.state.allMovies);
                console.log("Top 10 : ", this.state.top_ten_movies);
            } else if (res.status === '401') {
                this.setState({
                    isLoggedIn: false,
                    message: "Not able to fetch admin financials!!",
                });
                this.props.history.push('/login');
            }
        });

  }

    render(){


    const movieAndPlays = this.state.movieWithPlays.map((function(item){
                                                          return(
                                                              <tr>
                                                                  <td><h4>{item}</h4></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                              </tr>
                                                          )
                                                      }))
      const topTenMovies = this.state.top_ten_movies.map((function(item){

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

            <p style={formHead1}><h3>Movie details in MovieCentral</h3></p>
            <hr color="#E3E1E1"/>
                <form style={formStyle1}>
                <table align="center">
                  <tr>
                    <td><h4><b>Movie Name - Number of plays</b></h4></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                  {movieAndPlays}
                </table><br/>
                <hr/>
                  <h4><b>Select duration for Top 10 list:</b></h4>
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
        <h4 class="modal-title"><b>Current top 10 movie list</b></h4>
      </div>
      <div class="modal-body">
      {/*<select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
        <option value="Select">Select duration</option>
        <option value="day">Last 24 hours</option>
        <option value="week">Last week</option>
        <option value="month">Last month</option>
      </select><br />*/}
      <table align="center">
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
