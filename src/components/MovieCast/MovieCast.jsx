import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../Api/tmdbApi'; 
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import css from './MovieCast.module.css';
import defaultImage from '../../assets/noFoto.jpg';


const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]); 
  useEffect(() => {
    fetchMovieCast(movieId)
      .then(data => {
        setCast(data || []);  
      })
      .catch(error => {
        console.error('Error fetching movie cast:', error);
        setCast([]);  
      });
  }, [movieId]);

 return (
    <div className={css['cast-container']}>
      
      <div className={css['cast-grid']}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <div className={css['cast-item']} key={actor.id || uuidv4()}>
              <img 
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : defaultImage} 
                alt={actor.name} 
                className={css['cast-image']} 
              />
              <p className={css['cast-name']}>{actor.name}</p>
              <p className={css['cast-character']}>{actor.character}</p>
            </div>
          ))
        ) : (
          <p className={css['csast-mising']}>There is no cast.</p>
        )}
      </div>
    </div>
  );
};

export default MovieCast;
