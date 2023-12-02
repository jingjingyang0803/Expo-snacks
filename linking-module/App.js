// The code below includes functions to open maps at current location, route to a specific destination, 
// and dial a phone number provided in a TextInput element. 
// Additionally, a regular expression validates if the input phone number is in a valid international format, 
// with or without the '+' sign. 
// If validated, the app dials the number; otherwise, an alert about an invalid phone number is displayed.

import { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Linking, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const getLocation = async () => {
    setLoading(true);
    const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      alert("Permission denied");
    }
    setLoading(false);
  };

  const openMaps = () => {
    if(!location) {
      alert('Location not available. Please get your current location first.');
      return;
    }
    const url = Platform.select({
      android: `geo:${location.coords.latitude}, ${location.coords.longitude}`,
      ios: `maps://?q=${location.coords.latitude}, ${location.coords.longitude}`,
    });
    Linking.openURL(url);
  };

  const routeToDestination = () => {
    const url = Platform.select({
      android: "geo:0,0?q=Kuntokatu+3,+33520+Tampere",
      ios: "maps://0,0?q=Kuntokatu+3,+33520+Tampere",
    });
    Linking.openURL(url);
  };

  const callNumber = () => {
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>=====Feature one=====</Text>
      <Button title="Get Current Location" onPress={getLocation} color="#89B9AD"/>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        location && (
          <>
            <Text style={styles.textsmall}>Latitude: {location.coords.latitude}</Text>
            <Text style={styles.textsmall}>Longitude: {location.coords.longitude}</Text>
          </>
        )
      )}
      <Text>      </Text>
      <Button title="Show on Maps" onPress={openMaps} color="#89B9AD" />
      <Text style={styles.text}>=====Feature two=====</Text>
      <Text style={styles.textsmall}>Kuntokatu 3,33520 Tampere</Text>
      <Button title="Route to destination" onPress={routeToDestination} color="#5272F2" />
      <Text style={styles.text}>=====Feature three=====</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
      />
      <Button title="Call Number" onPress={callNumber} color="#EC8F5E" />
    </View>
  );
};

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
    marginTop:40,
  },
  textsmall: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default App;


