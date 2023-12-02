import { View,Image, Text, StyleSheet} from 'react-native';

const WeatherScreen = ({ weather, icon, temperature, windSpeed }) => {

  return (
    <View style={styles.container}>

      <Text style={styles.textBig}>{weather}</Text>
    <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} style={styles.weatherIcon} />
      <Text style={styles.textSmall}>Temperature: {temperature}°C</Text>
      <Text style={styles.textSmall}>Wind Speed: {windSpeed}m/s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%',
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  textBig: {
    marginBottom: '2%',
    fontSize: '32dp', 
    color: '#F4CE14',
  },
  textSmall: {
    marginBottom: '2%',
    fontSize: '20dp', 
    color: '#F4CE14',
  },
});


export default WeatherScreen;



