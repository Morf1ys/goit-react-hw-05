import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import defaultImage from '../../assets/noPoster.jpg'; 

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul className={css['cont-movie']}>
        {movies.map(movie => (
          <li className={css['movie-item']} key={movie.id}>
            <Link className={css.Link} to={`/movies/${movie.id}`} state={{ from: location }}>
              <img
                className={css.imglist}
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImage}
                alt={movie.title}
              />
              <div>{movie.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;


