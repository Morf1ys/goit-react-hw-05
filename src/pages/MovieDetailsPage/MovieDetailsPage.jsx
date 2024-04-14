import React from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../Api/tmdbApi';
import { useNavigate } from 'react-router-dom';




const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBack = () => {
    navigate('/');  
  };

  return (
    <div>
      {movie ? (
        <>
          <button onClick={handleGoBack}>Go Back</button>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
          <Outlet />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;

