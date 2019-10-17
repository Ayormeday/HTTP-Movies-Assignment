import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";


const initialMovieFormState = {
  id: null,
  title: "",
  director: "",
	metascore: "",
	stars: ""
};

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  const[moviesForm, setMoviesForm] = useState(initialMovieFormState);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  
  const onFormChange = e => {
    e.preventDefault();
    const input = {[e.target.name]: e.target.value};
    setMoviesForm({
      ...moviesForm,
      ...input
    })
  };

  const onSubmitMovie = e => {
    
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id"
      
      
      />
    </>
  );
};

export default App;
