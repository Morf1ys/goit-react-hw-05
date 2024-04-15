import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../Api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <div >
      <h1 className={css.tit}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
