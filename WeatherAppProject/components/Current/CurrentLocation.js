import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { ThemeContext } from '../Context/ThemeContext';

const CurrentLocation = ({ getCurrentLocation }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Button title="Local Weather" onPress={getCurrentLocation} buttonStyle={[styles.button, {backgroundColor: theme}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    width: 200,
    alignSelf: 'center', 
  },
});

// Exporting CurrentLocation component
export default CurrentLocation;
