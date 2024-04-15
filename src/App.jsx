
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import css from'./index.module.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

const App = () => (
  <div className={css['main-cont']}>
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
      
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/movies" element={<MoviesPage />} />
  <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
    <Route path="cast" element={<MovieCast />} />
    <Route path="reviews" element={<MovieReviews />} />
  </Route>
  <Route path="*" element={<NotFoundPage />} />
</Routes>

    </Suspense>
  </div>
);

export default App;

