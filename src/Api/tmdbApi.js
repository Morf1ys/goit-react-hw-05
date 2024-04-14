import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWRhOTY4NWI0OWQ0MzQwM2FjNzMxMjczNmZmYjI0YiIsInN1YiI6IjY2MWJmZWJiYTM5ZDBiMDE2NGJmZWZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pcypqY_AxpihSxBgxtFON30GDYt-8qcS9o6PDwOxtjY";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const searchMovie = async (query) => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movie:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get(
      `/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`, {
      params: { language: "en-US", page: "1" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await tmdbApi.get(
      `/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};
export default {
  fetchMovieCast,
  searchMovie,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
