import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../Api/tmdbApi';  
import css from './MovieReviews.module.css';

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
    <div className={css['reviews-container']}>
  <h2 className={css['reviews-title']}>Reviews</h2>
  {reviews.length > 0 ? (
    reviews.map(review => (
      <div key={review.id} className={css['review-item']}>
        <h4 className={css['review-author']}>{review.author}</h4>
        <p className={css['review-content']}>{review.content}</p>
      </div>
    ))
  ) : (
    <p className={css['no-reviews']}>Reviews none.</p>
  )}
</div>
  );
};

export default MovieReviews;

