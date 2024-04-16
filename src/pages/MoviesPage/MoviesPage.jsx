import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovie } from '../../Api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

 
  useEffect(() => {
    const queryFromURL = searchParams.get('query');
    if (queryFromURL) {
      (async () => {
        const data = await searchMovie(queryFromURL);
        setMovies(data.results);
      })();
    }
  }, [searchParams]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;
    setSearchParams({ query }); 
  };

  return (
    <div className={css.form}>
      <form className={css['form-cont']} onSubmit={handleSearch}>
        <input
          className={css['inp-cont']}
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
