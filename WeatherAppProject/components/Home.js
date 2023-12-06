import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import Header from "./Current/CurrentWeatherHeader";
import WeatherInfo from "./Current/CurrentWeatherInfo";
import LocationUpdate from "./Current/CurrentWeatherLocationUpdate";
import CurrentLocation from "./Current/CurrentLocation";
import { LocationContext } from "./Context/LocationContext";

const Home = () => {
  // State variables declaration
  const { location, setLocation } = React.useContext(LocationContext);
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // API key for OpenWeatherMap
  const API_KEY = "395dc02446c77c0ac922cb465d9a395b";

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
      const temperature = Math.round(data.main.temp);
      const windSpeed = Number(data.wind.speed.toFixed(1));

      // Return fetched data
      return { icon, weather, temperature, windSpeed };
    } catch (error) {
      console.error("Error fetching weather data:", error);
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
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [location]);

  // Function to update weather data based on user's input
  const refreshWeather = async () => {
    if (inputValue.trim()) {
      try {
        // Check if the entered location is valid by attempting to fetch weather data
        const weatherData = await getWeatherData(inputValue.trim());

        // If weather data is successfully fetched, update the location
        setLocation(inputValue.trim());
      } catch (error) {
        // If there's an error fetching weather data, show an alert or toast based on platform
        const errorMessage = "Please enter a valid location.";

        if (Platform.OS === "ios") {
          Alert.alert("Invalid Input", errorMessage);
        } else if (Platform.OS === "android") {
          ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        }
      }
    } else {
      const errorMessage = "Please enter a valid location.";

      if (Platform.OS === "ios") {
        Alert.alert("Invalid Input", errorMessage);
      } else if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND
    );
    if (status === "granted") {
      const geo_location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync(geo_location.coords);
      setLocation(geocode[0].city);
      setInputValue(""); // clear the input value
    } else {
      // Permission denied
      if (Platform.OS === "ios") {
        Alert.alert("Permission denied");
      } else if (Platform.OS === "android") {
        ToastAndroid.show("Permission denied", ToastAndroid.SHORT);
      }
    }
  };

  // Render components
  return (
    <SafeAreaView style={styles.container}>
      <Header location={location} />
      {!isInputFocused && (
        <WeatherInfo
          icon={icon}
          weather={weather}
          temperature={temperature}
          windSpeed={windSpeed}
        />
      )}
      <LocationUpdate
        inputValue={inputValue}
        setInputValue={setInputValue}
        refreshWeather={refreshWeather}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />
      <CurrentLocation getCurrentLocation={getCurrentLocation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F5F7F8",
  },
});

// Exporting Home component
export default Home;
