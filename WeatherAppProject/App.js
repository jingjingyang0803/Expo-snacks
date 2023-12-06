import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "./components/Home";
import ForecastScreen from "./components/Forecast";
import SettingsScreen from "./components/Settings";

import { LocationContext } from "./components/Context/LocationContext";
import { ThemeContext } from "./components/Context/ThemeContext";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [theme, setTheme] = useState("#5B9A8B");
  const [location, setLocation] = React.useState("Helsinki");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="white"
            inactiveColor="#445069"
            barStyle={{ backgroundColor: theme }} // Apply theme styles to the bar
            shifting={true} // Enable shifting behavior for icons on Android
            labeled={true} // Show labels below icons
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{ tabBarLabel: "Home", tabBarIcon: "home" }}
            />
            <Tab.Screen
              name="Forecast"
              component={ForecastScreen}
              options={{ tabBarLabel: "Forecast", tabBarIcon: "calendar" }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ tabBarLabel: "Settings", tabBarIcon: "cog" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </LocationContext.Provider>
    </ThemeContext.Provider>
  );
}
