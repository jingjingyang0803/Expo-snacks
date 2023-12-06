import React from "react";
import { Platform, View, Text, StyleSheet, ActionSheetIOS } from "react-native";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "./Context/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const themeOptions = {
    Green: "#5B9A8B",
    Orange: "#EA906C",
    Pink: "#DC8686",
    Purple: "#8E8FFA",
    Brown: "#BCA37F",
  };

  const handleThemeChangeIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Object.keys(themeOptions),
        title: "Choose Theme",
      },
      (buttonIndex) => {
        setTheme(Object.values(themeOptions)[buttonIndex]);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Settings Screen!</Text>
      <Text style={[styles.description, { color: theme }]}>
        Here, you can customize the app's theme.
      </Text>
      {Platform.OS === "ios" ? (
        <Button
          title="Change Theme"
          onPress={handleThemeChangeIOS}
          buttonStyle={[styles.button, { backgroundColor: theme }]}
        />
      ) : (
        <>
          <Text style={styles.pickerTitle}>Select a Theme:</Text>
          <Picker
            selectedValue={theme}
            onValueChange={(itemValue) => setTheme(itemValue)}
            style={[styles.picker, { backgroundColor: theme }]}
          >
            {Object.entries(themeOptions).map(([colorName, colorValue]) => (
              <Picker.Item
                key={colorName}
                label={colorName}
                value={colorValue}
              />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#445069",
  },
  description: {
    fontSize: 18,
    marginBottom: 50,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
    borderColor: "#445069",
    borderWidth: 1,
    borderRadius: 4,
  },
  button: {
    borderRadius: 5,
    width: 200,
  },
});

// Exporting Settings component
export default Settings;
