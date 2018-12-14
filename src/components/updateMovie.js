import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as API from "../api/index";

import * as CONSTANTS from "../constants";

let divStyle1 = {
  align: "right",
  backgroundColor: "#FEFDFD",
  padding: "12px",
  marginTop: "27px",
  width: "700px"
};
let formHead1 = {
  color: "blue",
  fontFamily: "Open Sans",
  fontSize: "55",
  fontWeight: "bold"
};
var data = [];

var yearGenerate = () => {
  var yearOptions = [];
  for (var i = 1990; i <= 2019; i++) {
    yearOptions.push(<option value={i}>{i}</option>);
  }
  return yearOptions;
};

class UpdateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateMovieData: {},
      message: ""
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpdate = (movieID, movieData) => {
    console.log("Handling update movie with pid", movieID);

    API.updateMovie(movieID, movieData).then(res => {
      console.log("adsnfjansf", res);
      if (res.status === 200) {
        this.setState({
          message: "Movie was updated - in the database successfully."
        });
      } else {
        console.log("in fail");
        this.setState({
          message: "Unable to update the movie. Please try again"
        });
      }
    });
  };

  handleDelete = movieID => {
    console.log("Handling delete movie with pid", movieID);

    API.deleteMovie(movieID).then(res => {
      if (res.status === 200) {
        this.setState({
          message: "Movie Deleted successfully!!"
        });
      } else if (!res.status === 200) {
        console.log("in fail");
        this.setState({
          message: "Unable to update the movie. Please try again"
        });
      }
    });
  };

  componentDidMount() {
    if (this.props.updateMovieData) {
      console.log("Updated movie", this.props.updateMovieData);
      this.setState({
        updateMovieData: this.props.updateMovieData
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.updateMovieData ? (
            <div style={divStyle1} className="col-sm-3">
              {/*<img src={logo} style={imgStyle} alt="logo"/>*/}
              <p style={formHead1}>Update movie details below :</p>{" "}
              <hr color="#E3E1E1" />
              <form>
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  readOnly="readonly"
                  value={this.state.updateMovieData.title}
                />{" "}
                <br />
                <label>Genre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre"
                  value={this.state.updateMovieData.genre}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        genre: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Year</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Year"
                  value={this.state.updateMovieData.year}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        year: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Studio</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Studio"
                  value={this.state.updateMovieData.studio}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        studio: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Synopsis</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Short movie synopsis"
                  value={this.state.updateMovieData.synopsis}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        synopsis: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="image.jpg"
                  value={this.state.updateMovieData.imgURL}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        imgURL: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Movie URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Movie URL"
                  value={this.state.updateMovieData.movieURL}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        movieURL: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>
                  Actor list (Please enter as this format ['abc' , 'cde']){" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Actor"
                  value={this.state.updateMovieData.actors}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        actors: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>
                  Director list (Please enter as this format ['abc' , 'cde']){" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Director"
                  value={this.state.updateMovieData.directors}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        directors: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={this.state.updateMovieData.country}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        country: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Rating</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rating"
                  value={this.state.updateMovieData.rating}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        rating: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <label>Availability</label>
                <select
                  className="form-control"
                  name="subscription"
                  value={this.state.updateMovieData.availability}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        availability: event.target.value
                      }
                    });
                  }}
                >
                  <option value="Select">Select subscription type</option>
                  <option value="Free">Free</option>
                  <option value="Subcribed">Subscription only</option>
                  <option value="PayPerView">Pay-per-view</option>
                  {/*<option value="Paid">Paid</option>*/}
                </select>
                <br />
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price in $"
                  value={this.state.updateMovieData.price}
                  onChange={event => {
                    this.setState({
                      updateMovieData: {
                        ...this.state.updateMovieData,
                        price: event.target.value
                      }
                    });
                  }}
                />
                <br />
                <Button
                  name="Update Movie"
                  bsStyle="info"
                  className="btn btn-primary "
                  data-toggle="modal"
                  data-target="#myModal"
                  value={this.state.updateMovieID}
                  onClick={() =>
                    this.handleUpdate(
                      this.state.updateMovieData._id,
                      this.state.updateMovieData
                    )
                  }
                >
                  Update
                </Button>
                {"   "}
                <Button
                  name="Delete Movie"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#myModal"
                  value={this.state.updateMovieID}
                  onClick={() =>
                    this.handleDelete(this.state.updateMovieData._id)
                  }
                >
                  Delete
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>

        {/*Modal for delete movie*/}
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
                <h4 class="modal-title">Movie Update Delete Status!</h4>
              </div>
              <div class="modal-body">
                <p>{this.state.message}</p>
                <p>
                  {" "}
                  Please note any current ongoing activity would not be affected
                  for any user.
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
      </div>
    );
  }
}

export default withRouter(UpdateMovie);
