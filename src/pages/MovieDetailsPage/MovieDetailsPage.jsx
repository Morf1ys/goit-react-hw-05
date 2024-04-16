import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../Api/tmdbApi';
import css from './MovieDetailsPage.module.css';
import defaultImage from '../../assets/noPoster.jpg';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Використання useRef для зберігання попередньої локації
  const prevLocation = useRef(location.state?.from || '/');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  const handleGoBack = () => {
    // Використання збереженої локації для повернення назад
    navigate(prevLocation.current);
  };

  return (
    <div className={css.container}>
      <button className={css['btn-back']} onClick={handleGoBack}>Go Back</button>
      {movie ? (
        <div className={css.movieHeader}>
          <img className={css['img-info']}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage}
            alt={movie.title} />
          <div className={css['info-movies']}>
            <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
            <p>{movie.overview}</p>
            <div>
              <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}
            </div>
            <div>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </div>
            <div>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </div>
            <div>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </div>
            <div>
              <strong>Homepage:</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
            </div>
            <div>
              <strong>Tagline:</strong> {movie.tagline}
            </div>
            <div>
              <strong>Status:</strong> {movie.status}
            </div>
            <div>
              <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
            </div>
            
          </div>
          <h3 className={css.adition}>Additional information</h3>
            <Link className={css['adit-inf-item']} to="cast" state={{ from: prevLocation.current }}>Cast</Link> |
            <Link className={css['adit-inf-item']} to="reviews" state={{ from: prevLocation.current }}>Reviews</Link>
            <Outlet />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
