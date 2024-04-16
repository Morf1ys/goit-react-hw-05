import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovie } from '../../Api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';



const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromURL = searchParams.get('query');

  useEffect(() => {
    if (queryFromURL) {
      (async () => {
        const data = await searchMovie(queryFromURL);
        setMovies(data.results);
      })();
    }
  }, [queryFromURL]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;
    const data = await searchMovie(query);
    setMovies(data.results);
    navigate(`/movies?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className={css.form}>
      <form className={css['form-cont']} onSubmit={handleSearch}>
        <input className={css['inp-cont']}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css['btn-inp']} type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
