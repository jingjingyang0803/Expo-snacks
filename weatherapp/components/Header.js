import { View, Text, StyleSheet } from 'react-native';

const Header = ({ location }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '11%',
    padding: '5%',
    width: '100%',
    backgroundColor: '#186F65',
  },
  text: {
    color: '#fff',
    fontSize: '36dp',
    textAlign: 'center',
  },
});


export default Header;


