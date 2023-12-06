import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';

const CurrentWeatherHeader = ({ location }) => {
  const { theme } = React.useContext(ThemeContext);
  
  const currentDate = new Date().toLocaleDateString('fi-FI');

  return (
    <View style={[styles.header, {backgroundColor: theme}]}>
      <Text style={styles.title}>Current weather</Text>
      <Text style={styles.subtitle}>{location}   {currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});


export default CurrentWeatherHeader;
