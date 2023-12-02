import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import WeatherScreen from './components/WeatherScreen';
import InputButton from './components/InputButton';

const App = () => {
  // State variables declaration
  const [location, setLocation] = useState('Beijing');
  const [weather, setWeather] = useState('');
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [inputValue, setInputValue] = useState('');

  // API key for OpenWeatherMap
  const API_KEY = '395dc02446c77c0ac922cb465d9a395b';

  // Function to fetch weather data from OpenWeatherMap API
  const getWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temperature = data.main.temp;
      const windSpeed = data.wind.speed;

      // Return fetched data
      return { icon, weather, temperature, windSpeed };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  // Fetching data whenever 'location' changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherData = await getWeatherData(location);
        const { weather, icon, temperature, windSpeed } = weatherData;

        // Set state variables with fetched data
        setWeather(weather);
        setIcon(icon);
        setTemperature(temperature);
        setWindSpeed(windSpeed);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, [location]);

  // Function to update weather data based on user's input
  const refreshWeather = () => {
    if (inputValue) {
      setLocation(inputValue);
    }
  };

  // Render components
  return (
    <View style={styles.container}>
      <Header location={location} />
      <WeatherScreen
        icon={icon}
        weather={weather}
        temperature={temperature}
        windSpeed={windSpeed}
      />
      <InputButton
        inputValue={inputValue}
        setInputValue={setInputValue}
        refreshWeather={refreshWeather}
      />
    </View>
  );
};

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    backgroundColor: '#F5F7F8'
  }
});


// Exporting App component
export default App;


