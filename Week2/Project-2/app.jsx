import React, { useState } from 'react';
import { MovieProvider } from './context/MovieContext';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Watchlist from './components/Watchlist';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('search'); // search, favorites, watchlist

  return (
    <MovieProvider>
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1>🎬 Movie Search</h1>
              <p>Discover and save your favorite movies</p>
            </div>

            <nav className="nav-tabs">
              <button
                className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => setActiveTab('search')}
              >
                🔍 Search
              </button>
              <button
                className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                ❤️ Favorites
              </button>
              <button
                className={`nav-tab ${activeTab === 'watchlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('watchlist')}
              >
                📋 Watchlist
              </button>
            </nav>
          </div>
        </header>

        <main className="main">
          <div className="container">
            {activeTab === 'search' && (
              <>
                <SearchBar />
                <MovieList />
              </>
            )}
            
            {activeTab === 'favorites' && <Favorites />}
            
            {activeTab === 'watchlist' && <Watchlist />}
          </div>
        </main>

        <MovieDetails />
      </div>
    </MovieProvider>
  );
}

export default App;