import axios from "axios";
import React, { Component } from "react";

class EditMovie extends Component {
  state = {
    name: "",
    rating: "",
    overview: "",
    imageURL: "",
  };
  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, rating, overview, imageURL } = this.state;
    const id = this.props.match.params.id;
    const updatedMovie = {
      name,
      rating,
      overview,
      imageURL,
    };
    this.props.onEditMovie(id, updatedMovie);
    this.props.history.push("/");
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get(`http://localhost:3002/movies/${id}`);
    const movie = response.data;
    this.setState({
      name: movie.name,
      rating: movie.rating,
      overview: movie.overview,
      imageURL: movie.imageURL,
    });
  }
  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handleFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Edit The Form To Update The Movie.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={this.state.rating}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                value={this.state.overview}
                onChange={this.onInputChange}
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Update Movie"
          />
        </form>
      </div>
    );
  }
}

export default EditMovie;
