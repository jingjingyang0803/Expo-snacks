import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { ThemeContext } from "../Context/ThemeContext";

const CurrentWeatherLocationUpdate = ({
  inputValue,
  setInputValue,
  refreshWeather,
  onFocus,
  onBlur,
}) => {
  const { theme } = React.useContext(ThemeContext);

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={styles.inputButtonContainer}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder="Enter a city"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button
        title="Refresh"
        onPress={refreshWeather}
        buttonStyle={[styles.button, { backgroundColor: theme }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputButtonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 15,
    alignSelf: "center",
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: 200,
    alignSelf: "center", // to center the input
  },
  button: {
    borderRadius: 5,
    width: 200,
  },
});

export default CurrentWeatherLocationUpdate;
