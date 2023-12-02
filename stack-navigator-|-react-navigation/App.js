import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text style={styles.description}>This is the main page of our application. Here, you can find the latest updates and features.</Text>
      <View>
        <Button buttonStyle={styles.button} title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        <Button buttonStyle={styles.button} title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Profile Screen!</Text>
      <Text style={styles.description}>Here, you can view and edit your personal information, check your achievements, and update your settings.</Text>
      <View>
        <Button buttonStyle={styles.button} title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button buttonStyle={styles.button} title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Settings Screen!</Text>
      <Text style={styles.description}>You can adjust your preferences, manage notifications, change language, and customize the app's theme here.</Text>
      <View>
        <Button buttonStyle={styles.button} title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button buttonStyle={styles.button} title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:100,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color:'#B0578D',
  },
  description: {
    fontSize: 18,
    marginBottom: 50,
    color:'#D988B9',
  },
  button: {
    backgroundColor: '#FACBEA',
    borderRadius: 8,
    marginBottom: 20,
  }
});


