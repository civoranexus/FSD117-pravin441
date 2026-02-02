import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const MovieContext = createContext();

// Custom hook to use the Movie Context
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

// Movie Provider Component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  // OMDB API - Free API for movies
  const API_KEY = 'YOUR_API_KEY'; // Get from http://www.omdbapi.com/apikey.aspx
  const API_URL = 'https://www.omdbapi.com/';

  // Load favorites and watchlist from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Search movies
  const searchMovies = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}&type=movie`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
      setLoading(false);
    }
  };

  // Get movie details
  const getMovieDetails = async (imdbID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch movie details.');
      setLoading(false);
    }
  };

  // Add to favorites
  const addToFavorites = (movie) => {
    if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
  };

  // Check if movie is in favorites
  const isFavorite = (imdbID) => {
    return favorites.some(movie => movie.imdbID === imdbID);
  };

  // Add to watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.find(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID));
  };

  // Check if movie is in watchlist
  const isInWatchlist = (imdbID) => {
    return watchlist.some(movie => movie.imdbID === imdbID);
  };

  // Clear selected movie
  const clearSelectedMovie = () => {
    setSelectedMovie(null);
  };

  const value = {
    movies,
    searchQuery,
    loading,
    error,
    favorites,
    selectedMovie,
    watchlist,
    searchMovies,
    getMovieDetails,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearSelectedMovie
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};