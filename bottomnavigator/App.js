import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text style={styles.description}>This is our application's main page, where you can find the latest updates and features.</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Profile Screen!</Text>
      <Text style={styles.description}>Here, you can view and edit your personal information, check your achievements, and update your settings.</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Settings Screen!</Text>
      <Text style={styles.description}>Here, you can adjust your preferences, manage notifications, change the language, and customize the app's theme.</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={styles.bar}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: 'home'}}
         />
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{ tabBarLabel: 'Profile', tabBarIcon: 'account'}}
         />
        <Tab.Screen name="Settings" component={SettingsScreen}
          options={{ tabBarLabel: 'Settings', tabBarIcon: 'cog' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  container: {
    padding: 20,
    marginTop:100,
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
  bar: {
    backgroundColor: '#694fad',
  }
});
