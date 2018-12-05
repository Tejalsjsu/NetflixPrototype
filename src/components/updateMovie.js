import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import Login from "./login";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteMovie from '../components/deleteMovie';

let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '700px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};
var data = [];

class UpdateMovie extends Component{
  constructor(props){
    super(props);
  }
    state = {
        moviedata: {
            search: '',
            page: 0,
            size: 0
        },
        validation_error: [],
        isLoggedIn: false,
        message: '',
        movieList: [],
        delMovieName : '',
        movieDict : [],
        isUpdateRequested: false,
        movieData: [],
        movieID: "",
        delmessage: "",
        movieToUpdate: "",
        movieToUpdateTitle: "",
        updateMovieData:{
          title: '',
          genre: '',
          year:'',
          studio:'',
          synopsis: '',
          image: '',
          url: '',
          actor: [],
          director: [],
          country: '',
          rating: '',
          subscription: '',
          price: 0,
          updateMovieID: 0

        }
    };


    componentWillMount() {
      this.setState({

        // movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"]
        movieList: [],
        search: '',
        page: 0,
        size: 0,
        delMovieName: '',
        isUpdateRequested: false,
        movieID: "",
        delmessage: "",
        movieToUpdateTitle: "",
        title: '',
        genre: '',
        year:'',
        studio:'',
        synopsis: '',
        image: '',
        url: '',
        actor: [],
        director: [],
        country: '',
        rating: '',
        subscription: '',
        price: 0,
        updateMovieID: 0
      });
      this.state.movieDict.push({
        key:"1",
        value:"1111"
      });
            }

    handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelMovie(event){
    console.log("Delete movie: ", this.state.delMovieName);
    // console.log("Movie Dict: ", this.state.movieDict)
  }

  // handleUpdateMovie(event){
  //   console.log("Update movie: ");
  //   this.setState({
  //     isUpdateRequested: true
  //   });
  //
  //   // console.log("Movie Dict: ", this.state.movieDict)
  // }

  handleSearch(movieData){
    console.log("Searching for movie : ", movieData);
          // console.log("Searching for : ", this.state.moviedata.search);
                    API.searchMovie(movieData)
                        .then((res) => {
                            // console.log("response:  " , res);
                            if (res.length > 0 ) {
                                console.log(' Success')
                                this.setState({
                                    isLoggedIn: true,
                                    moviedata: res,
                                    movieList: [],
                                    movieData: res
                                });
                                // data = res.data.content;
                                console.log("MovieData : ", this.state.movieData);
                                // this.props.history.push("/updateMovie");
                                data = res;
                                let i = 0;
                                let len = 0;
                                len = data.length;
                                console.log("Movie names before is: ", this.state.movieList);
                                console.log("Suceesfully found movie with details as: ", data);
                                // console.log("Content is as: ", data.content);
                                console.log("Content length is : ",len);
                                for(i =0; i<=data.length -1; i++){
                                  console.log("Movie name : ",  data[i].title)
                                  this.state.movieList.push(data[i].title);
                                }
                                console.log("Movie names after are: ", this.state.movieList);
                                this.props.history.push('/adminAddMovie');
                            } else if (res.status === '401') {
                                console.log("No records");
                                this.setState({
                                    isLoggedIn: true,
                                    message: "No records found..!!",
                                });
                            } else if (res.status === '402') {
                                this.setState({
                                    isLoggedIn: false,
                                    message: "Session Expired..!!",
                                });
                                this.props.history.push('/login');
                            }
                        });


  }

  handleUpdateNav = (movieID, movieTitle) => {
    console.log("Render update movie section", movieTitle);
    this.setState({
      isUpdateRequested: true,
      movieToUpdate: "movieID",
      movieToUpdateTitle: movieTitle,
      title: movieTitle
    });
    console.log("Movie title params --->: ", movieTitle);
    console.log("Movie name to be updated --->: ", this.state.updateMovieData.title);

    Object.keys(this.state.movieData).map(pd => {
      if(this.state.movieData[pd].title == movieTitle){
        console.log("MovieID --> " + this.state.movieData[pd]._id);
      console.log("Title " + this.state.movieData[pd].title);
      console.log("Genre " + this.state.movieData[pd].genre);
      console.log("Year " + this.state.movieData[pd].year);
      console.log("Synopsis" + this.state.movieData[pd].synopsis);
      console.log("Actors " + this.state.movieData[pd].actors);
      console.log("Director"  + this.state.movieData[pd].directors);
      console.log("Country " + this.state.movieData[pd].country);
      console.log("Rating " + this.state.movieData[pd].rating);
      console.log("Subscription " + this.state.movieData[pd].availability);
      console.log("Price  " + this.state.movieData[pd].price);

      this.setState({
        updateMovieData:{
        title: movieTitle,
        genre: this.state.movieData[pd].genre,
        year: this.state.movieData[pd].year,
        studio: this.state.movieData[pd].studio,
        synopsis: this.state.movieData[pd].synopsis,
        imgURL: this.state.movieData[pd].imgURL,
        movieURL: this.state.movieData[pd].movieURL,
        actors: this.state.movieData[pd].actors,
        directors: this.state.movieData[pd].directors,
        country: this.state.movieData[pd].country,
        rating: this.state.movieData[pd].rating,
        availability: this.state.movieData[pd].availability,
        price: this.state.movieData[pd].price,
        updateMovieID : this.state.movieData[pd]._id
      }
      });
      let i = 0;
      for(i=0; i<this.state.movieData[pd].actor-1; i++){
        this.state.actors.push(this.state.movieData[pd].actor);
      }
      let j = 0;
      for(j=0; j<this.state.movieData[pd].actor-1; i++){
        this.state.directors.push(this.state.movieData[pd].director);
      }


      // console.log("TITLE RECIEVEDDDDDDDDDDDDDDDDDDDD : ", this.state.title);
}

    });

    }

handleUpdate = (movieID, movieData) => {
  console.log("Handling update movie with pid", movieID);

  API.updateMovie(movieID, movieData)
    .then((res) => {
        if (res.status === 200) {
            this.setState({
                message: "Movie updated successfully!!",
            });

            console.log("In update movie call.");
            alert("Movie was updated successfully!!");
            this.props.history.push("/adminAddMovie");
        } else if (!res.status === 200) {
            console.log("in fail");
            this.setState({
                isLoggedIn: false,
                message: "Wrong username or password. Try again..!!"
            });


        }
    });
}

handleInputChange(){
  console.log("Handling input change !!");
}

handleDelete = (movieID) => {
  console.log("Handling delete movie with pid",movieID);

  API.deleteMovie(movieID)
    .then((res) => {
        if (res.status === 200) {
            this.setState({
                delmessage: "Movie Deleted successfully!!",
            });

            console.log("In delete movie call.");
            alert("Movie was deleted successfully!!");
            this.props.history.push("/adminAddMovie");
        } else if (!res.status === 200) {
            console.log("in fail");
            this.setState({
                isLoggedIn: false,
                message: "Wrong username or password. Try again..!!"
            });

        }
    });

}


    render(){
      var self = this;
{/*return component for withKeys*/}

Object.keys(this.state.movieData).map(pd => {
  // console.log("Title " + this.state.movieData[pd].title);
  // console.log("Genre " + this.state.movieData[pd].genre);
  // console.log("Year " + this.state.movieData[pd].year);
  // console.log("Synopsis" + this.state.movieData[pd].synopsis);
  // console.log("Cast " + this.state.movieData[pd].cast);
  // console.log("data is here after search " + this.state.movieData[pd].title);
  // console.log("data is here after search " + this.state.movieData[pd].title);
  // console.log("data is here after search " + this.state.movieData[pd].title);
  // console.log("data is here after search " + this.state.movieData[pd].title);
  // console.log("data is here after search " + this.state.movieData[pd].title);
  // console.log("data is here after search " + this.state.movieData[pd].title);

});


const withKeys = this.state.movieList.map((function(item){
                return(
                    <tr value={item}>
                        {/*changed coloumn names as per mongo db column names
                        <td><input type="radio" checked={false}/></td>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Update Movie" bsStyle="info" class="btn btn-primary ">Update</Button></td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Delete Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myDeleteModal"
                        >Delete</Button></td>
                    </tr>
                )
            }))


const withfilter = this.state.movieData &&
              Object.keys(this.state.movieData).map(pd => {
                return (
                  <tr
                    key={this.state.movieData[pd]._id}>
                  <td key={this.state.movieData[pd]._id} >{this.state.movieData[pd].title}</td>

                    <td><Button name="Update Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary "
                    onClick={() => this.handleUpdateNav(this.state.movieData[pd]._id, this.state.movieData[pd].title)}
                     >Update</Button></td>
                    <td><Button name="Delete Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary "
                    onClick={() => this.handleDelete(this.state.movieData[pd]._id)} data-toggle="modal" data-target="#myDeleteModal">Delete</Button></td>
                    {/*<td className='ProjectTable-cell' key={this.state.projectData[pd]._id}>*/}
                    {/*<Button bsStyle="danger" bsSize="sm" block*/}
                    {/*onClick={() => this.handleWatch(this.state.projectData[pd]._id)}> Watch </Button>*/}
                    {/*</td>*/}
                  </tr>
                );
              });



        return(
          <div>

            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Search and update Movie details below</p>
            <hr color="#E3E1E1"/>
            <input type="text" className="form-control" placeholder="Search movie"
            onChange={(event) => {
                this.setState({
                    moviedata: {
                        ...this.state.moviedata,
                        search: event.target.value,
                        page: 0,
                        size : 10
                    }
                });
            }}    />

          {/*<input type="text" className="form-control" placeholder="Node ID" value={this.state.updatenodedata.unodeID}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          updatenodedata: {
                                                              ...this.state.updatenodedata,
                                                              unodeID: event.target.value
                                                          }
                                                      });
                                                  }}/>
                                                  <br/>*/}
            <Button name="Search Movie" bsStyle="info" class="btn btn-primary "
            onClick={() => this.handleSearch(this.state.moviedata)}>Search Movie</Button><br/>
            <hr color="#E3E1E1"/>
                <form>
                <p>Below are the movie results from search:</p>
                <hr/>
                <table>
                <tbody>
                  <tr>
                    <td><b>Movie Title</b></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td><b>Update</b></td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td><b>Delete</b></td>
                  </tr>
                  {withfilter}

                  </tbody>
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
                <div class="modal fade" id="myUpdateModal" data-toggle="myUpdateModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie features updated with id : {this.state.movieToUpdate} successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Users will now be able to view updated features for movie ABC!!</p>
                        <p>Following features updated: {this.state.movieToUpdate}</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                    {/*<!-- /.modal-content -->*/}
                  </div>{/*<!-- /.modal-dialog -->*/}
                </div>{/*<!-- /.modal -->*/}

                  {/*Modal for delete movie*/}
                  <div class="modal fade" id="myDeleteModal" data-toggle="myDeleteModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title"> Movie deleted succussfully</h4>
                        </div>
                        <div class="modal-body">
                          <p> Selected movie removed from the database!</p>
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
          {this.state.isUpdateRequested ?
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Update movie details below :</p>
            <hr color="#E3E1E1"/>
                <form>
                <input type="text" className="form-control" placeholder="Title" readOnly="readonly" value={this.state.title}
                /> <br/>
                <input type="text" className="form-control" placeholder="Genre" value={this.state.updateMovieData.genre}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,genre: event.target.value}});}} /><br />
                <input type="number" className="form-control" placeholder="Year" value={this.state.updateMovieData.year}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,year: event.target.value}});}} /><br />
                <input type="text" className="form-control" placeholder="Studio" value={this.state.updateMovieData.studio}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,studio: event.target.value}});}} /><br />
                <textarea type="text" className="form-control" placeholder="Short movie synopsis" value={this.state.updateMovieData.synopsis}
              onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,synopsis: event.target.value}});}} /><br />
                <input type="text" className="form-control" placeholder="image.jpg" value={this.state.updateMovieData.imgURL}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,imgURL: event.target.value}});}}/><br />
                <input type="text" className="form-control" placeholder="Movie URL" value={this.state.updateMovieData.movieURL}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,movieURL: event.target.value}});}}
                 /><br />
                <input type="text" className="form-control" placeholder="Actor" value={this.state.updateMovieData.actors}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,actors: event.target.value}});}}
                  /><br />
                <input type="text" className="form-control" placeholder="Director" value={this.state.updateMovieData.directors}
                 onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,directors: event.target.value}});}} /><br />
                <input type="text" className="form-control" placeholder="Country" value={this.state.updateMovieData.country}
                 onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,country: event.target.value}});}}/><br />
                <input type="text" className="form-control" placeholder="Rating" value={this.state.updateMovieData.rating}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,rating: event.target.value}});}} /><br />
              { /* <input type="text" className="form-control" placeholder="Subscription type" value={this.state.updateMovieData.availability}
                 onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,availability: event.target.value}});}} /><br />*/}
                 <select className="form-control" name="subscription" value={this.state.updateMovieData.availability}
                  onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,availability: event.target.value}});}}>
                   <option value="Select">Select subscription type</option>
                   <option value="Free">Free</option>
                   <option value="SubscriptionOnly">Subscription only</option>
                   <option value="PayPerView">Pay-per-view</option>
                   {/*<option value="Paid">Paid</option>*/}
                 </select><br />

                <input type="number" className="form-control" placeholder="Price in $" value={this.state.updateMovieData.price}
                onChange={(event) => {this.setState({updateMovieData: {...this.state.updateMovieData,price: event.target.value}});}}/><br />
                <Button name="update Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myModal" value={this.state.updateMovieID}
                onClick={() => this.handleUpdate(this.state.updateMovieData.updateMovieID, this.state.updateMovieData)}>Update</Button><br/>

                  {/*Modal for delete movie*/}
                <div class="modal fade" id="myModal" data-toggle="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie updated successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Movie was updated - in the database successfully.</p>
                        <p> Please note any current ongoing activity would not be affected for any user.</p>
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

            : null}
          </div>


        );
    }
  }

export default withRouter(UpdateMovie);
