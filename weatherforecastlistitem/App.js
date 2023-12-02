import { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Image, Text, StyleSheet } from 'react-native';

// Location and API key for the OpenWeatherMap API
const location = 'Tampere';
const API_KEY = '395dc02446c77c0ac922cb465d9a395b';

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData() {
  try {
    // Fetch the weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    // Map the response data to a more usable format
    let forecastData = data.list.map((item) => ({
      id: String(item.dt),
      day: new Date(item.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short' }),
      temperature: Math.round(item.main.temp),
      windSpeed: item.wind.speed,
      icon: item.weather[0].icon,
    }));

    // Group data by day
    const groupedData = forecastData.reduce((acc, curr) => {
      (acc[curr["day"]] = acc[curr["day"]] || []).push(curr);
      return acc;
    }, {});

    // Calculate average temperature, maximum wind speed and most common icon for each day
    forecastData = Object.keys(groupedData).map(day => {
      const dayData = groupedData[day];
      const avgTemp = Math.round(dayData.reduce((a, b) => a + b.temperature, 0) / dayData.length);
      const maxWindSpeed = Math.max(...dayData.map(item => item.windSpeed)).toFixed(0);
      const icon = dayData.reduce((a, b) => dayData.filter(item => item.icon === a.icon).length >= dayData.filter(item => item.icon === b.icon).length ? a : b).icon;
      return {
        id: dayData[0].id,
        day: day,
        temperature: avgTemp,
        windSpeed: maxWindSpeed,
        icon: icon
      }
    });

    return forecastData;
  } catch (error) {
    console.error(error);
  }
}

// Component to render each weather item
function Item({ day, temperature, windSpeed, icon }) {
  return (
    <View style={styles.item}>
      <Text style={styles.day}>{day}</Text>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} style={styles.weatherIcon} />
      <Text style={styles.data}>{temperature}°C</Text>
      <Text style={styles.data}>{windSpeed} m/s</Text>
    </View>
  );
}

// Main App component
export default function App() {
  const [data, setData] = useState([]);

  // Use an effect to fetch the data once on component mount
  useEffect(() => {
    fetchWeatherData().then(setData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{location}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item day={item.day} temperature={item.temperature} windSpeed={item.windSpeed} icon={item.icon} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    height: 60,
    backgroundColor: '#81A1C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  headerText: {
    fontSize: 32,
    color: '#2E3440'
  },
  item: {
    padding: 5,
    marginHorizontal:10,
    marginBottom:5,
    backgroundColor: '#D8DEE9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weatherIcon: {
    width: 50,
    height: 50
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2E3440'
  },
  data: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2E3440'
  },
});





