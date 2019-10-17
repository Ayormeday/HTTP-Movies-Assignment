import React, { useState, useEffect } from 'react';
import axios from 'axios';

const movieUrl = "http://localhost:5000/api/movies"

const MovieForm = ({ match, movies, setMovies, moviesForm, setMoviesForm, onFormChange, onSubmitMovie }) => {
    const fetchMovies = () => {
        axios.get(movieUrl)
        .then(res => {
            setMovies(res.data);
            let movie = res.data.find(movie => movie.id ===Number(match.params.id));
            movie.stars = movie.stars.join(',');
            setMoviesForm(movie);
        })
        .catch(error => alert(error.message));
    };

    if (movies < 1 && match.params.id !== 'add') {
		fetchMovies();
		return 'Loading...';
	}
	return (
		<form className="movie-form" onSubmit={onSubmitMovie}>
			<label htmlFor="title">Title</label>
			<input
				id="title"
				name="title"
				type="text"
				value={moviesForm.title}
				onChange={onFormChange}
			/>
			<label htmlFor="director">Director</label>
			<input
				id="director"
				name="director"
				type="text"
				value={moviesForm.director}
				onChange={onFormChange}
			/>
			<label htmlFor="metascore">Metascore</label>
			<input
				id="metascore"
				name="metascore"
				type="number"
				value={moviesForm.metascore}
				onChange={onFormChange}
			/>
			<label htmlFor="stars">Stars</label>
			<input
				id="stars"
				name="stars"
				type="text"
				value={moviesForm.stars}
				onChange={onFormChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);

};


export default MovieForm;