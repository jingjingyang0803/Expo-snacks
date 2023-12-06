import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";

import { LocationContext } from "./Context/LocationContext";
import { ThemeContext } from "./Context/ThemeContext";

// Location and API key for the OpenWeatherMap API
const API_KEY = "395dc02446c77c0ac922cb465d9a395b";

// Component to render each weather item
function Item({ day, time, temperature, windSpeed, icon }) {
  return (
    <View style={styles.item}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.time}>{time}:00</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.data}>{temperature}°C</Text>
      <Text style={styles.data}>{windSpeed} m/s</Text>
    </View>
  );
}

const Forecast = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { location } = React.useContext(LocationContext);
  const [data, setData] = useState([]);

  // Use an effect to fetch the data once on component mount
  useEffect(() => {
    // Function to fetch weather data from the OpenWeatherMap API
    async function fetchWeatherData() {
      try {
        // Fetch the weather data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        // Map the response data to a more usable format
        let forecastData = data.list.map((item) => ({
          id: String(item.dt),
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            new Date(item.dt * 1000).getDay()
          ],
          time: new Date(item.dt * 1000)
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .slice(0, -3),
          temperature: Math.round(item.main.temp),
          windSpeed: Number(item.wind.speed.toFixed(1)),
          icon: item.weather[0].icon,
        }));

        return forecastData;
      } catch (error) {
        console.error(error);
      }
    }
    fetchWeatherData().then(setData);
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme }]}>
        <Text style={styles.title}>Hourly Forecast</Text>
        <Text style={styles.subtitle}>{location}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            day={item.day}
            time={item.time}
            temperature={item.temperature}
            windSpeed={item.windSpeed}
            icon={item.icon}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F8",
    paddingTop: 40,
  },
  header: {
    width: "100%",
    padding: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  item: {
    padding: 5,
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: "#D8DEE9",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    width: 50,
    fontSize: 16,
    fontWeight: "bold",
    color: "#445069",
    textAlign: "center",
  },
  time: {
    width: 50,
    fontSize: 14,
    color: "#445069",
  },
  weatherIcon: {
    width: 40,
    height: 50,
  },
  data: {
    width: 70,
    fontSize: 14,
    color: "#445069",
  },
});

// Exporting Forecast component
export default Forecast;
