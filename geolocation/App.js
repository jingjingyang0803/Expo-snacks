import { useEffect, useState } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        {location ? `Latitude: ${location.latitude}, \n\nLongitude: ${location.longitude}` : 'Loading...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationText: {
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Arial', 
  },
});

export default App;
