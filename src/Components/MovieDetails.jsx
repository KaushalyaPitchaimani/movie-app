import React, { useEffect, useState } from 'react';
import Main from './Main';
import { useParams } from 'react-router-dom';

let API_key = "&api_key=9396cdb682320f99d4335d97dc6f02ce";
let base_url = "https://api.themoviedb.org/3";
let img_path = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const maxOverviewLength = 400;


    useEffect(() => {

        setMovie(null);
        setCast([]);


        fetch(`${base_url}/movie/${id}?${API_key}`)
            .then(res => res.json())
            .then(data => setMovie(data));

        fetch(`${base_url}/movie/${id}/credits?${API_key}`)
            .then(res => res.json())
            .then(data => setCast(data.cast.slice(0, 8)));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    const truncateOverview = (overview) => {
        if (overview.length > maxOverviewLength) {
            return overview.slice(0, maxOverviewLength) + '...'; // Add ellipsis if text is too long
        }
        return overview;
    };


    //let img_path = "https://image.tmdb.org/t/p/original";

    return (
        <div className="movie-details-page">
            <div className="movie-header">
                <img src={img_path + movie.backdrop_path} alt={movie.title} className="full-poster" />
                <div className="movie-info">
                    <img src={img_path + movie.poster_path} className='small-poster' />
                    <h2>{movie.title}</h2>
                    <p className="rating">Rating: {movie.vote_average.toFixed(1)}</p>
                    <p>{movie.runtime} min | {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <h3>Overview</h3>
                    <p>{truncateOverview(movie.overview)}</p>
                </div>
            </div>
            <div className="movie-cast">
                <h2>Cast</h2>
                <div className="cast-list">
                    {cast.map(member => (
                        <div key={member.cast_id} className="cast-member">
                            <img src={img_path + member.profile_path} alt={member.name} className="cast-photo" />
                            <p>{member.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
