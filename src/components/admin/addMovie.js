import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import logo from "../../image/netflix-logo.jpg";
import * as API from "../../api/index";
import Login from "../login";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

let imgStyle = { height: "100px", padding: "10px", width: "300px" };
let divStyle2 = { height: "45px" };
let divStyle3 = { backgroundColor: "#E3E1E1" };
let divStyle1 = {
  align: "right",
  backgroundColor: "#FEFDFD",
  padding: "12px",
  marginTop: "27px",
  width: "900px",
  marginLeft: "100px"
};
let formHead1 = {
  color: "blue",
  fontFamily: "Open Sans",
  fontSize: "55",
  fontWeight: "bold"
};
let borderStyle = {
  width: "200px"
};

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addmoviedata: {
        title: "",
        genre: "",
        year: "",
        studio: "",
        synopsis: "",
        imgURL: "",
        movieURL: "",
        actors: [],
        directors: [],
        country: "",
        rating: "",
        availability: "",
        price: "",
        jwtToken:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk4MTE1NCwicm9sZSI6IkFETUlOIn0.ELV6EYtKuHBE3ANhYOOSNbf7kQ2z07pO0nXaV_fskRdXRfHh-XwBOYDrlLV8AhK9fbaTO2M4gBuABXECOIymog"
      },
      loginDetails: {
        username: "",
        password: ""
      },
      validation_error: [],
      isLoggedIn: true,
      message: "",
      isSubmitted: false
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      title: "",
      genre: "",
      year: "",
      studio: "",
      synopsis: "",
      imgURL: "",
      movieURL: "",
      actors: [],
      directors: [],
      country: "",
      rating: "",
      availability: "",
      price: 0,
      jwtToken: "",
      username: "tuan.ung@sjsu.edu",
      password: "user"
    });

    // API.doLogin(this.loginDetails)
    // .then((res) => {
    //   // console.log("Response from getJWTToken(): ", res);
    //   console.log("JWTToken: ", res.JWTToken);
    //   if(res){
    //     this.setState({
    //       jwtToken : res.JWTToken,
    //       isLoggedIn: true,
    //       message: "User not validated. Wrong username or password."
    //
    //     });
    //     this.props.history.push("/adminAddMovie");
    //     console.log("Recieved JWTtoken from Login: ", this.state.jwtToken);
    //   } else if (res.status === 401 || res.status === 403 || res.status === 500){
    //     console.log("Error while receiving JWT token.");
    //
    //   }
    // });
  }

  //   handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  handleSubmit = () => {
    const isSubmitted = "true";
    // const submitted = "true",
    const isEnabled = this.state.addmoviedata.title.length > 0;
    console.log("Submitted");
    console.log("Title : " + this.state.addmoviedata.title);
    console.log("length : " + this.state.addmoviedata.title.length);
    console.log(this.isEnabled);

    API.addMovie(this.state.addmoviedata).then(res => {
      if (res) {
        this.setState({
          message: "Movie Added!!"
        });
      } else if (res.status === "401") {
        console.log("in fail");
        this.setState({
          isLoggedIn: false,
          message: "Wrong username or password. Try again..!!"
        });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div style={borderStyle}> </div>
        <div style={divStyle1}>
          {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

          <p style={formHead1}>Add Movie details below</p>
          <hr color="#E3E1E1" />
          <form>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="Title"
              value={this.state.addmoviedata.title}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    title: event.target.value
                  }
                });
              }}
            />{" "}
            <br />
            <select
              id="ddlCurrency"
              className="form-control"
              value={this.state.addmoviedata.genre}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    genre: event.target.value
                  }
                });
              }}
            >
              <option value="" selected="true" />
              <option value="comedy">Comedy</option>
              <option value="action">Action</option>
              <option value="romantic">Romantic</option>
              <option value="drama">Drama</option>
            </select>
            <br />
            <input
              name="year"
              type="number"
              className="form-control"
              placeholder="Year"
              value={this.state.addmoviedata.year}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    year: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="studio"
              type="text"
              className="form-control"
              placeholder="Studio"
              value={this.state.addmoviedata.studio}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    studio: event.target.value
                  }
                });
              }}
            />
            <br />
            <textarea
              name="synopsis"
              type="text"
              className="form-control"
              placeholder="Short movie synopsis"
              value={this.state.addmoviedata.synopsis}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    synopsis: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="image"
              type="text"
              className="form-control"
              placeholder="Image URL"
              value={this.state.addmoviedata.imgURL}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    imgURL: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="url"
              type="text"
              className="form-control"
              placeholder="Movie URL"
              value={this.state.addmoviedata.movieURL}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    movieURL: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="actor"
              type="text"
              className="form-control"
              placeholder="Actor"
              value={this.state.addmoviedata.actors}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    actors: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="director"
              type="text"
              className="form-control"
              placeholder="Director"
              value={this.state.addmoviedata.directors}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    directors: event.target.value
                  }
                });
              }}
            />
            <br />
            <input
              name="country"
              type="text"
              className="form-control"
              placeholder="Country"
              value={this.state.addmoviedata.country}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    country: event.target.value
                  }
                });
              }}
            />
            <br />
            <select
              id="ddlCurrency"
              className="form-control"
              value={this.state.addmoviedata.rating}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    rating: event.target.value
                  }
                });
              }}
            >
              <option value="" />
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
            <br />
            <select
              className="form-control"
              name="subscription"
              value={this.state.addmoviedata.availability}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    availability: event.target.value
                  }
                });
              }}
            >
              <option value="Select">Select subscription type</option>
              <option value="Free">Free</option>
              <option value="Subcribed">Subscription only</option>
              <option value="PayPerView">Pay per view</option>
              <option value="Paid">Paid</option>
            </select>
            <br />
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price in $"
              value={this.state.addmoviedata.price}
              onChange={event => {
                this.setState({
                  addmoviedata: {
                    ...this.state.addmoviedata,
                    price: event.target.value
                  }
                });
              }}
            />
            <br />
            <Button
              name="Add Movie"
              bsStyle="info"
              class="btn btn-primary "
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.handleSubmit}
            >
              Add Movie
            </Button>
            <br />
            <div class="modal fade" id="myModal" data-toggle="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                    <h4 class="modal-title">
                      Movie{" "}
                      <b>
                        <i>{this.state.addmoviedata.title}</i>
                      </b>{" "}
                      added successfully!
                    </h4>
                  </div>
                  <div class="modal-body">
                    <p>
                      Users now can access{" "}
                      <b>
                        <i>{this.state.addmoviedata.title}</i>
                      </b>{" "}
                      movie from their profiles!
                    </p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/*<!-- /.modal-content -->*/}
              </div>
              {/*<!-- /.modal-dialog -->*/}
            </div>
            {/*<!-- /.modal -->*/}
          </form>
        </div>
      </div>
    );
  }
}

export default AddMovie;
