import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import Login from "./login";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteMovie from '../components/deleteMovie';
import * as CONSTANTS from "../constants";

let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '700px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};
var data = [];

var yearGenerate = () => {
  var yearOptions = [];
  for (var i = 1990; i <= 2019; i++) {
    yearOptions.push(<option value={i}>{i}</option>);
  }
  return yearOptions;
};

class UpdateMovie extends Component{
  constructor(props){
    super(props);
  }
    state = {

        projectData: [],
        length:0,
        search: '',
        filters:{
          year: 0,
          actors: '',
          rating: '',
          genre: '',
          numberOfStars: 0
        },
        page: 0,
        size: 0,
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
        updateMovieID: 0,

        search: '',
        filters:{
          year: 0,
          actors: '',
          rating: '',
          genre: '',
          numberOfStars: 0
        },
        search: "",
        Rating: "",
        stars: "",
        actors: "",
        genre: "",
        pageSize: 0,
        year: "",
        page: 0,
        size: 10

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

  handleWatch = currentPage => {
    console.log("in handle watch");

    let movie = { page: currentPage, size: CONSTANTS.PAGESIZE };
    //search keywords
    if (this.state.search !== "") {
      movie.search = this.state.search;
    }
    //filter options
    movie.filters = {};

    if (this.state.Rating !== "") {
      movie.filters.rating = this.state.Rating;
    }

    if (this.state.actors !== "") {
      movie.filters.actors = this.state.actors;
    }

    if (this.state.stars !== "") {
      movie.filters.numberOfStars = this.state.stars;
    }

    if (this.state.year !== "") {
      movie.filters.year = this.state.year;
    }

    if (this.state.genre !== "") {
      movie.filters.genre = this.state.genre;
    }

    if (Object.keys(movie.filters).length == 0) {
      delete movie.filters;
    }

    // {
    //   search: this.state.search,
    //   filters: {
    //     rating: this.state.Rating,
    //     actors: this.state.actors,
    //     numberOfStars: this.state.stars,
    //     year: this.state.year,
    //     genre: this.state.genre
    //   },
    //   page: 0,
    //   size: 10
    // };
    if (this.state.profileName != undefined) {
      // this.props.history.push('/dashboard');
      //Fetch all movies
      console.log("movie payload search ", movie);
      API.fetchAllMovies(movie).then(res => {
        console.log("status then");
        if (res.status === 200) {
          this.setState({
            isLoggedIn: true,
            //projectData: res
            projectData: res.data.content
          });
          data = res.data.content;
          console.log("search ", +this.state.projectData);
          this.props.history.push("/dashboard");
        } else if (res.status === "401") {
          this.setState({
            isLoggedIn: false,
            message: "No projects found..!!"
          });
        }
      });
      // fetch all project ends here
    }
  };

  handleSearch(searchText, filterValues, page, size ){
    console.log("**************************");
    console.log("Inside handle search API");
    console.log("Search: ", searchText);
    console.log("Filters: ",filterValues);
    console.log("Page: ", page);
    console.log("Size: ", size);
          // console.log("Searching for : ", this.state.moviedata.search);
                    API.searchMovie(searchText, filterValues, page, size)
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
                                // console.log("MovieData : ", this.state.moviedata);
                                // this.props.history.push("/updateMovie");
                                data = res;
                                let i = 0;
                                let len = 0;
                                len = data.length;
                                console.log("Movie list before is: ", this.state.movieList);
                                console.log("Movie Data before is: ", this.state.movieData);
                                // console.log("All data: ", data);
                                // console.log("Content is as: ", data.content);
                                // console.log("Content length is : ",len);

                                  if(!filterValues.year==0 || !filterValues.genre=="" || !filterValues.numberOfStars==0 || !filterValues.actors=="" || !filterValues.rating==""){
                                    console.log("IN HEREERERERER!!!!")
                                      for(i =0; i<=data.length -1; i++){

                                        if(filterValues.genre!="" && data[i].genre == filterValues.genre){
                                          console.log("----> ", filterValues.genre)
                                          this.state.movieList.push(data[i].title);
                                        }
                                        if(filterValues.year!=0 && data[i].year == filterValues.year && this.state.movieList.indexOf(data[i].title) < 0){
                                          this.state.movieList.push(data[i].title);
                                        }
                                        else if(filterValues.rating!="" && data[i].rating == filterValues.rating && this.state.movieList.indexOf(data[i].title) < 0){
                                          this.state.movieList.push(data[i].title);
                                        }
                                        else if(filterValues.numberOfStars!=0 && data[i].numberOfStars == filterValues.numberOfStars && this.state.movieList.indexOf(data[i].title) < 0){
                                          this.state.movieList.push(data[i].title);
                                        }
                                        else if(filterValues.actors!=0 && data[i].actors == filterValues.actors && this.state.movieList.indexOf(data[i].title) < 0){
                                          this.state.movieList.push(data[i].title);
                                        }


                                        // console.log("Movie name is: ",  data[i].title)
                                        // this.state.movieList.push(data[i].title);
                                      }
                                    }

                                    if(this.state.movieList.length>0){
                                    for(i =0; i<=this.state.movieData.length -1; i++){
                                      if(this.state.movieList.indexOf(this.state.movieData[i].title) > -1){
                                        console.log("KEEP!");
                                      }else{
                                        console.log("DELETEEEEEE!");
                                        delete this.state.movieData[i];
                                      }
                                    }
                                  }
                                console.log("MovieList: ", this.state.movieList);
                                console.log("MovieData ", this.state.movieData);

                                // if(filterValues.year==0 && filterValues.genre=="" && filterValues.numberOfStars==0 && filterValues.actors=="" && filterValues.rating==""){
                                //   this.state.movieData = res;
                                // }
                                // console.log("Updated movieData is : ", this.state.movieData);
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

handleNext = () => {
  if (this.state.length === CONSTANTS.PAGESIZE) {
    var currentPage = this.state.pageSize + 1;
    this.setState({ pageSize: currentPage });
    this.handleWatch(currentPage);
  }
};

handlePrev = () => {
  if (this.state.pageSize > 0) {
    var currentPage = this.state.pageSize - 1;
    this.setState({ pageSize: currentPage });
    this.handleWatch(currentPage);
  }
};

    render(){
      var self = this;
{/*return component for withKeys*/}

Object.keys(this.state.projectData).map(pd => {
  console.log(
    "data is here after search " + this.state.projectData[pd].country
  );
});

const withMorefilter =
  this.state.projectData &&
  Object.keys(this.state.projectData).map(pd => {
    return (
      <tr
        key={this.state.projectData[pd]._id}
        onClick={self.handleClick}

      >
        <td
          key={this.state.projectData[pd].title}

        >
        <td><Button name="Update Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary "
        onClick={() => this.handleUpdateNav(this.state.movieData[pd]._id, this.state.movieData[pd].title)}
         >Update</Button></td>
        <td><Button name="Delete Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary "
        onClick={() => this.handleDelete(this.state.movieData[pd]._id)} data-toggle="modal" data-target="#myDeleteModal">Delete</Button></td>

        </td>


        {/*<td className='ProjectTable-cell' key={this.state.projectData[pd]._id}>*/}
        {/*<Button bsStyle="danger" bsSize="sm" block*/}
        {/*onClick={() => this.handleWatch(this.state.projectData[pd]._id)}> Watch </Button>*/}
        {/*</td>*/}
      </tr>
    );
  });


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


            <input type="text" className="form-control" placeholder="Search by Movie" value={this.state.search}
            onChange={(event) => {
                this.setState({
                        search: event.target.value,
                        page: 0,
                        size : 10
                });
            }}/><br/>
            <input type="text" className="form-control" placeholder="Search by Actor"
            onChange={(event) => {
                this.setState({
                      filters:{
                          ...this.state.filters,
                          actors: event.target.value,
                                }

                });
            }}    /><br/>
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



            <select
              className="form-control"
              onChange={(event) => {
                  this.setState({
                      filters: {
                          ...this.state.filters,
                          genre: event.target.value,

                      }
                  });
              }}
            >
              <option value="">Select Genre</option>
              <option value="comedy">Comedy</option>
              <option value="romantic">Romantic</option>
              <option value="action">Action</option>
              <option value="drama">Drama</option>
            </select>
            <br />
            <select
              className="form-control"

              onChange={(event) => {
                  this.setState({
                      filters: {
                          ...this.state.filters,
                          year: event.target.value,

                      }
                  });
              }}
            >
            <option value="Select">Select Year</option>
            {yearGenerate().map(item => item)}
            </select>
            <br />

            <select
              className="form-control"
              onChange={(event) => {
                  this.setState({
                      filters: {
                          ...this.state.filters,
                          rating: event.target.value,
                        }
                  });
              }}
            >
              <option value="Select">Select Rating</option>
              <option value="R">R</option>
              <option value="U/A">U/A</option>
                        </select>
                        <br/>

                        <select
                          className="form-control"
                          onChange={(event) => {
                              this.setState({
                                  filters: {
                                      ...this.state.filters,
                                      numberOfStars: event.target.value,


                                  }
                              });
                          }}
                        >
                          <option value="">Select Stars</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                                    </select><br/>

            <Button name="Search Movie" bsStyle="info" class="btn btn-primary "
            onClick={() => this.handleSearch(this.state.search, this.state.filters, this.state.page, this.state.size)}>Search Movie</Button><br/>
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
                  {/*withMorefilter*/}
                  </tbody>
                </table>
                <button
                  type="button"
                  class="btn"
                  onClick={() => this.handlePrev()}
                >
                  &laquo; Previous
                </button>
                <button
                  type="button"
                  class="btn"
                  onClick={() => this.handleNext()}
                >
                  Next &raquo;
                </button>
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
