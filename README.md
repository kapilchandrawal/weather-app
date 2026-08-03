# 🌤️ Weather App

A responsive weather dashboard built with **React.js**, **Vite**, and the **OpenWeather API**.

The application detects the user's current location and displays real-time weather information. Users can also search for weather conditions in different cities, view local time, weather details, and a short-term forecast.

---

## ✨ Features

- 📍 Automatic location detection using browser Geolocation API
- 🌡️ Current temperature
- 🌤️ Dynamic weather icons
- 🌧️ Weather condition information
- 💧 Humidity information
- 🌬️ Wind speed
- 🤗 Feels-like temperature
- 🕐 Live local time for the selected city
- 📅 Local date based on city timezone
- 🔎 Search weather by city
- 🌎 Displays country code for searched cities
- 🌦️ Short-term weather forecast
- 🖼️ Dynamic background based on weather condition
- ⏳ Loading and fallback UI while detecting location
- ❌ Error handling for failed API requests
- 📱 Responsive layout for different screen sizes
- 💾 API key stored securely using environment variables

---

# 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Build Tool

- Vite

### API

- OpenWeather API

### Other

- Browser Geolocation API
- React Icons / Weather Icons
- Git & GitHub
- Vercel

---

# 📁 Project Structure

```text
src/
├── assets/
│   └── backgrounds/
│
├── components/
│   ├── CurrentLocationCard.jsx
│   ├── ForecastList.jsx
│   ├── LiveClock.jsx
│   ├── SearchBar.jsx
│   └── SearchWeatherCard.jsx
│
├── services/
│   └── weatherService.js
│
├── styles/
│   ├── App.css
│   └── WeatherCard.css
│
├── utils/
│   ├── backgroundImages.js
│   ├── dateBuilder.js
│   ├── timeUtils.js
│   └── weatherIcons.js
│
├── App.jsx
└── main.jsx