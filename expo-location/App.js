// The application below initializes a state variable to hold the location, 
// then defines a function that requests location permissions. 
// If granted, it retrieves the current location and sets it in the state. 
// The latitude and longitude are then displayed in a Text component. 
// A Button component triggers the getLocation function.

import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === 'granted') {
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
      <Button title="Get Current Location" onPress={getLocation} color="green"/>
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



