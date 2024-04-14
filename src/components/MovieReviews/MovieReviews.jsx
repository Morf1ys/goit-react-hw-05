import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../Api/tmdbApi';  


const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(data => {
        setReviews(data.results || []); 
      })
      .catch(error => {
        console.error("Error fetching movie reviews:", error);
        setReviews([]);
      });
  }, [movieId]);

  return (
    <div>
      <h2>Огляди</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>Огляди відсутні.</p>
      )}
    </div>
  );
};

export default MovieReviews;

