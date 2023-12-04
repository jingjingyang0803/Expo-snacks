import { useEffect, useState, useCallback } from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [batteryLevel, setBatteryLevel] = useState(null); // Initialize batteryLevel state
  const [subscription, setSubscription] = useState(null); // Initialize subscription state

  const _subscribe = async () => { // Define a subscribe function
    const batteryLevel = await Battery.getBatteryLevelAsync(); // Get the battery level
    setBatteryLevel(batteryLevel); // Set the battery level to state

    // Subscribe to battery level changes
    setSubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel); // Update the state every time the battery level changes
        console.log('batteryLevel changed!', batteryLevel); // Log battery level changes
      })
    );
  };

  const _unsubscribe = useCallback(() => { // Define an unsubscribe function
    subscription && subscription.remove(); // Remove the subscription if it exists
    setSubscription(null); // Reset the subscription state
  }, [subscription]);

  useEffect(() => { // React useEffect hook
    _subscribe(); // Subscribe when the component mounts
    return () => _unsubscribe(); // Unsubscribe when the component unmounts
  }, [_unsubscribe]); // Run useEffect whenever _unsubscribe updates

  // Render the battery level or 'Loading...' if it's not yet loaded
  return (
    <View style={styles.container}>
      <Text>Current Battery Level: {batteryLevel !== null ? 
        Math.round(batteryLevel * 100) + '%' : 'Loading...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App; // Export the BatteryScreen component

