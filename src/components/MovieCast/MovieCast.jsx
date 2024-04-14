import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../Api/tmdbApi'; 
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



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
    <div>
      <h2>Акторський склад</h2>
      {cast.length > 0 ? (
        cast.map(actor => (
          <div key={uuidv4()}>
            {actor.profile_path && (
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} style={{ width: 50 }} />
            )}
            <p>{actor.name} as {actor.character}</p>
          </div>
        ))
      ) : (
        <p>Акторський склад відсутній.</p>
      )}
    </div>
  );
};

export default MovieCast;
