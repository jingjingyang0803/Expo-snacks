import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const InputButton = ({ inputValue, setInputValue, refreshWeather }) => {
  return (
    <View style={styles.inputButtonContainer}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        placeholder="Enter a City name"
      />
      <Button
        title="Refresh"
        onPress={refreshWeather}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '2%',
  },
  input: {
    height: '15%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: '5%',
    paddingHorizontal: '15%',
    width: '100%',
    alignSelf: 'center', // to center the input
  },
  button: {
    backgroundColor: '#186F65',
    borderRadius: '2%',
    width: '100%',
    alignSelf: 'center', // to center the button
  },
  buttonText: {
    color: 'white',
  },
});

export default InputButton;




