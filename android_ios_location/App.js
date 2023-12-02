import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status === RESULTS.GRANTED) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      // Permission denied
      alert("Permission denied");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Button title="GET LOCATION" onPress={getLocation} color="green"/>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        location && (
          <>
            <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
            <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop:30,
  },
});
