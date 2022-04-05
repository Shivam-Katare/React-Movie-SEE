import { useEffect, useState, React } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCards from './MovieCards';


const API_URL = "http://www.omdbapi.com?apikey=7ed78cd0"
const movie1 =
{
    "Title": "Dark Shadows",
    "Year": "2012",
    "imdbID": "tt1077368",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjc0NzAyMzI1MF5BMl5BanBnXkFtZTcwMTE0NDQ1Nw@@._V1_SX300.jpg"
}
const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchmovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchmovies('Dark');
    }, []);

    return (

        <div className='app'>
            <h1>Movie See</h1>

            <div className="search">
                <input placeholder='Search any Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <img src={SearchIcon} alt='search'
                    onClick={() => searchmovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCards movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h1>No Movies Found</h1>
                        </div>
                    )
            }

        </div>
    );
}

export default App;