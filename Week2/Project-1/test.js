// src/App.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';

// Mock fetch API
global.fetch = jest.fn();

describe('Weather App', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('renders weather app', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /weather app/i })).toBeInTheDocument();
  });

  test('searches for a city and displays weather', async () => {
    const mockWeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      main: {
        temp: 15,
        feels_like: 13,
        humidity: 70,
        pressure: 1013
      },
      weather: [
        { description: 'cloudy', icon: '04d' }
      ],
      wind: { speed: 5 },
      visibility: 10000,
      dt: 1640000000
    };

    const mockForecastData = {
      list: [
        {
          dt: 1640000000,
          main: { temp: 14 },
          weather: [{ main: 'Clouds', icon: '04d' }]
        },
        {
          dt: 1640086400,
          main: { temp: 16 },
          weather: [{ main: 'Clear', icon: '01d' }]
        }
      ]
    };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastData
      });

    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter city/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    await userEvent.type(input, 'London');
    await userEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeInTheDocument();
      expect(screen.getByText(/15/)).toBeInTheDocument();
      expect(screen.getByText(/cloudy/i)).toBeInTheDocument();
    });
  });

  test('displays error for invalid city', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter city/i);
    await userEvent.type(input, 'InvalidCity123');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/city not found/i)).toBeInTheDocument();
    });
  });

  test('toggles temperature unit', async () => {
    const mockData = {
      name: 'Paris',
      sys: { country: 'FR' },
      main: { temp: 20, feels_like: 18, humidity: 60, pressure: 1015 },
      weather: [{ description: 'sunny', icon: '01d' }],
      wind: { speed: 3 },
      visibility: 10000,
      dt: 1640000000
    };

    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockData })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ list: [] }) });

    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter city/i);
    await userEvent.type(input, 'Paris');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/20/)).toBeInTheDocument();
    });
    
    // Toggle unit
    const unitButton = screen.getByRole('button', { name: /°c/i });
    await userEvent.click(unitButton);
    
    // Should refetch with imperial units
    expect(fetch).toHaveBeenCalledTimes(4); // 2 initial + 2 after toggle
  });

  test('saves search history to localStorage', async () => {
    const mockData = {
      name: 'Tokyo',
      sys: { country: 'JP' },
      main: { temp: 25, feels_like: 24, humidity: 55, pressure: 1010 },
      weather: [{ description: 'clear', icon: '01d' }],
      wind: { speed: 2 },
      visibility: 10000,
      dt: 1640000000
    };

    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => mockData })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ list: [] }) });

    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter city/i);
    await userEvent.type(input, 'Tokyo');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    
    await waitFor(() => {
      const history = JSON.parse(localStorage.getItem('weatherSearchHistory'));
      expect(history).toContain('Tokyo');
    });
  });
});