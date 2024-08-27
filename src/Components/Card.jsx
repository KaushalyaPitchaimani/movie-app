import React from "react";
import { Link } from "react-router-dom";


const Card = (movie) => {
    // console.log(movie.info);
    let img_path = "https://image.tmdb.org/t/p/w500";


    return (
        <Link to={`/movie/${movie.info.id}`}>
            <div className="movie">
                <img src={img_path + movie.info.poster_path} className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">Rating {movie.info.vote_average.toFixed(1)}</p>
                    </div>

                </div>

            </div>
        </Link>
    )
}

export default Card
