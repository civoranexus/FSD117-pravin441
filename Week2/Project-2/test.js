// src/context/MovieContext.test.jsx
import { renderHook, act, waitFor } from '@testing-library/react';
import { MovieProvider, useMovies } from './MovieContext';

global.fetch = jest.fn();

const wrapper = ({ children }) => <MovieProvider>{children}</MovieProvider>;

describe('MovieContext', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('provides initial state', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    
    expect(result.current.movies).toEqual([]);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  test('searches for movies', async () => {
    const mockMovies = {
      Response: 'True',
      Search: [
        { Title: 'Movie 1', imdbID: '1' },
        { Title: 'Movie 2', imdbID: '2' }
      ]
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockMovies
    });

    const { result } = renderHook(() => useMovies(), { wrapper });
    
    await act(async () => {
      await result.current.searchMovies('test');
    });
    
    await waitFor(() => {
      expect(result.current.movies.length).toBe(2);
      expect(result.current.loading).toBe(false);
    });
  });

  test('adds movie to favorites', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    
    const movie = { Title: 'Test Movie', imdbID: '123' };
    
    act(() => {
      result.current.addToFavorites(movie);
    });
    
    expect(result.current.favorites).toContainEqual(movie);
    expect(result.current.isFavorite('123')).toBe(true);
  });

  test('removes movie from favorites', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    
    const movie = { Title: 'Test Movie', imdbID: '123' };
    
    act(() => {
      result.current.addToFavorites(movie);
    });
    
    expect(result.current.favorites.length).toBe(1);
    
    act(() => {
      result.current.removeFromFavorites('123');
    });
    
    expect(result.current.favorites.length).toBe(0);
  });

  test('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useMovies(), { wrapper });
    
    const movie = { Title: 'Test Movie', imdbID: '123' };
    
    act(() => {
      result.current.addToFavorites(movie);
    });
    
    const saved = JSON.parse(localStorage.getItem('movieFavorites'));
    expect(saved).toContainEqual(movie);
  });
});