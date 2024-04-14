import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovie } from '../../Api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Пошук фільмів..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Пошук</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
