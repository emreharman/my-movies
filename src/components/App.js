import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };
  //json-server çalıştırdıktan sonra fetch ile apideki verileri async olarak alıp state'teki movies'e atadık
  /*async componentDidMount() {
    const baseURL = "http://localhost:3002/movies";
    const response = await fetch(baseURL);
    const data = await response.json();
    this.setState({ movies: data });
  }*/

  //axios ile api'ye request.Axios response olarak direkt object döndürür ve response.data ile veriye ulaşabiliriz.
  componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const baseURL = "http://localhost:3002/movies";
    const response = await axios.get(baseURL);
    this.setState({ movies: response.data });
  }
  //FETCH API ile delete
  /*deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    await fetch(baseURL, { method: "DELETE" });
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({
      movies: newMovieList,
    });
  };*/

  //Axios ile delete
  deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    axios.delete(baseURL);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({
      movies: newMovieList,
    });
  };
  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
    this.getMovies();
  };
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie);
    this.getMovies();
  };
  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
