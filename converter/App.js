import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const Converter = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  const convertCurrency = () => {
    const result = inputValue * 7.81;
    setResultValue(result.toString());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
        keyboardType='numeric'
        placeholder='Enter amount in EUR'
      />
      <Button onPress={convertCurrency} title='Convert EUR to CNY' />
      <Text style={styles.resultText}>{"Converted amount in CNY:\n" + resultValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Converter;
