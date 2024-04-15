import {useEffect, useState} from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { fetchMovieDetails } from '../../Api/tmdbApi';
import css from './MovieDetailsPage.module.css';
import defaultImage from '../../assets/noPoster.jpg';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = location.state?.from || "/";
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  return (
    <div className={css.container}>
      <button className={css['btn-back']} onClick={() => navigate(backLink)}>Go Back</button>
     
      {movie ? (
         <div className={css.movieHeader}>
          
          <img className={css['img-info']}
            src={ movie.poster_path  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage}
            alt={movie.title} />
        <div className={css['info-movies']}>
            <h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p>{movie.overview}</p>
          <div>
            <strong>Genres:</strong> {movie.genres.map((genre, index) => (
          <span key={index} className={css['genre-badge']}>{genre.name}</span>))}
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
          <div>
            <h3 className={css.adition}>Additional information</h3>
          <Link className={css['adit-inf-item']}  to="cast" state={{ from: backLink }}>Cast</Link> | <Link className={css['adit-inf-item']} to="reviews" state={{ from: backLink }}>Reviews</Link>
            <Outlet />
            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;

