import { View,Image, Text, StyleSheet} from 'react-native';

const CurrentWeatherInfo = ({ weather, icon, temperature, windSpeed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }} style={styles.weatherIcon} />
        <View style={styles.dataContainer}>
          <Text style={styles.textSmall}>{temperature}°C</Text>
          <Text style={styles.textSmall}>{windSpeed}m/s</Text>
        </View>
      </View>
      <Text style={styles.textBig}>{weather}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataContainer: {
    marginLeft: 30,
    marginTop: 24,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  textSmall: {
    marginBottom: 20,
    fontSize: 24,
    color:'#445069',
  },
  textBig: {
    fontSize: 32,
    textAlign: 'center',
    color:'#445069',
  },
});

export default CurrentWeatherInfo;
