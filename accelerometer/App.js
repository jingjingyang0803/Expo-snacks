import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors'; // Import Accelerometer from expo-sensors

export default function App() {
  const [data, setData] = useState({}); // Initialize state to hold accelerometer data

  useEffect(() => {
    let subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData); // Set accelerometer data to state
    });

    return () => {
      subscription && subscription.remove(); // Cleanup function to remove the listener
    };
  }, []);

  let { x, y, z } = data; // Destructure x, y, and z values from state
  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}></View>
      {/* Content section */}
      <View style={styles.content}>
        {/* Box 1 */}
        <View style={styles.box}>
          <Text>X: {round(x)}</Text>
        </View>
        {/* Box 2 */}
        <View style={styles.box}>
          <Text>Y: {round(y)}</Text> 
        </View>
        {/* Box 3 */}
        <View style={styles.box}>
          <Text>Z: {round(z)}</Text> 
        </View>
      </View>
      {/* Footer section */}
      <View style={styles.footer}></View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100; // Function to round the values to two decimal places
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    backgroundColor: '#FECDA6',
  },
  content: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9130',
 },
  box: {
    flex: 1,
    aspectRatio: 1,
    margin: 'auto',
    borderWidth: 1,
    backgroundColor: '#687EFF',
    justifyContent: 'center', // center the text vertically
    alignItems: 'center', // center the text horizontally
  },
  footer: {
    flex: 2,
    backgroundColor: '#FF5B22',
  },
});
