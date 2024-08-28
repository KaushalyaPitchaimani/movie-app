import React, { useEffect, useState } from 'react'
import Card from './Card'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Pagination from './Pagination';

const API_key = "9396cdb682320f99d4335d97dc6f02ce";
const base_url = "https://api.themoviedb.org/3";
const initialUrl = `${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`;
const arr = ["Popular", "Top Rated", "Upcoming"];
const itemsPerPage = 5;

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(initialUrl);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(url_set + `&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                setData(data.results);
                setTotalPages(data.total_pages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [url_set, currentPage]);

    const getData = (movieType) => {
        let url;
        switch (movieType) {
            case "Popular":
                url = `${base_url}/discover/movie?sort_by=popularity.desc&api_key=${API_key}`;
                break;
            case "Top Rated":
                url = `${base_url}/discover/movie?sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_key}`;
                break;
            case "Upcoming":
                url = `${base_url}/discover/movie?sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=${API_key}`;
                break;
            default:
                url = initialUrl;
        }
        setUrl(url);
        setCurrentPage(1); // Reset to first page

    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = `${base_url}/search/movie?api_key=${API_key}&query=${search}`;
            setUrl(searchUrl);
            setSearch("");
            setCurrentPage(1);

        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Router>
            <div className='header'>
                <Link to="/" className='logo'>MovieDB</Link>
                <div className='nav-container'>
                    <nav>
                        <ul>
                            {arr.map((value) => (
                                <li key={value}>
                                    <Link to="/" name={value} onClick={(e) => getData(e.target.name)}>{value}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <form>
                        <div className='search-btn'>
                            <input
                                type='text'
                                placeholder='Movie Name'
                                className='inputText'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                onKeyUp={searchMovie}
                            />
                            <button type='button' className='search'>Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='container'>
                <Routes>
                    <Route path="/" element={
                        <>
                            {movieData.length === 0 ? (
                                <p className='not found'>Not Found</p>
                            ) : (
                                movieData.map((res, pos) => <Card info={res} key={pos} />)
                            )}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                            />
                        </>
                    } />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Main;
