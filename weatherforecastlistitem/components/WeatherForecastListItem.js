import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

async function fetchWeatherData() {
  const city = 'Tampere';
  const API_KEY = '395dc02446c77c0ac922cb465d9a395b';
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const forecastData = data.list.map((item) => ({
      id: String(item.dt),
      day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temperature: String(Math.round(item.main.temp)),
      windSpeed: String(item.wind.speed),
    }));
    return forecastData;
  } catch (error) {
    console.error(error);
  }
}

function Item({ day, temperature, windSpeed }) {
  return (
    <View style={styles.item}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.data}>{temperature}°C</Text>
      <Text style={styles.data}>Wind Speed: {windSpeed} m/s</Text>
    </View>
  );
}

export default function WeatherForecastListItem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchWeatherData().then(setData);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item day={item.day} temperature={item.temperature} windSpeed={item.windSpeed} />
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
});
