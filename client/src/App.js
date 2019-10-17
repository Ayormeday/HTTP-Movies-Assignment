import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";

const initialMovieFormState = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: ""
};

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesForm, setMoviesForm] = useState(initialMovieFormState);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const onFormChange = e => {
    e.preventDefault();
    const input = { [e.target.name]: e.target.value };
    setMoviesForm({
      ...moviesForm,
      ...input
    });
  };

  const onEditMovie = id => e => {
		setMoviesForm({
			...moviesForm,
			...movies.find(movie => movie.id === id)
		})
		props.history.push(`/update-movie/${id}`);
	}

	const onDeleteMovie = id => e => {
		axios
			.delete(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				setMovies(movies.filter(movie => movie.id !== id))
			})
			.catch(err => console.log(err.response));
	}

  const onSubmitMovie = e => {
    e.preventDefault();
    if (moviesForm.id !== null) {
      let stars = Array.isArray(moviesForm.stars)
        ? [...moviesForm.stars]
        : [...moviesForm.stars.split(",")];
      axios
        .put(`http://localhost:5000/api/movies/${moviesForm.id}`, {
          ...moviesForm,
          stars
        })
        .then(res => {
          setMoviesForm(initialMovieFormState);
          props.history.push("/");
        })
        .catch(err => alert(err.response));
    } else {
      // stretch
      const newMovie = {
        title: moviesForm.title,
        director: moviesForm.director,
        metascore: moviesForm.metascore,
        stars: [...moviesForm.stars.split(",")]
      };
      axios
        .post(`http://localhost:5000/api/movies`, newMovie)
        .then(res => {
          setMoviesForm(initialMovieFormState);
          setMovies(res.data);
          props.history.push("/");
        })
        .catch(err => alert(err.response));
      props.history.push("/");
    }
  };

  return (
		<>
			<SavedList list={savedList} />
			<Route exact path="/" render={props => <MovieList
				{...props}
				setMovies={setMovies}
				movies={movies}
				onEditMovie={onEditMovie}
				onDeleteMovie={onDeleteMovie}
			/>}
			/>
			<Route
				path="/movies/:id"
				render={props => <Movie {...props} addToSavedList={addToSavedList} />}
			/>
			<Route
				path="/update-movie/:id"
				render={props => <MovieForm
					{...props}
					movies={movies.length}
					moviesForm={moviesForm}
					setMovies={setMovies}
					setMoviesForm={setMoviesForm}
					onFormChange={onFormChange}
					onSubmitMovie={onSubmitMovie}
				/>}
			/>
			<Route
				path="/add-movie"
				render={props => <MovieForm
					{...props}
					moviesForm={moviesForm}
					onFormChange={onFormChange}
					onSubmitMovie={onSubmitMovie}
				/>}
			/>
		</>
	);
};

export default App;
