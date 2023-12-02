import { View, StyleSheet } from 'react-native';

// Define the main App component
export default function App() {
    return (
      <View style={styles.container}>
        {/* Header section */}
        <View style={styles.header}></View>
        {/* Content section */}
        <View style={styles.content}> 
          {/* Box 1 */}
          <View style={styles.box}></View> 
          {/* Box 2 */}
          <View style={styles.box}></View>
          {/* Box 3 */}
          <View style={styles.box}></View>
        </View>
        {/* Footer section */}
        <View style={styles.footer}></View> 
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take all available space
  },
  header: {
    flex: 2, // Take 20% of the space
    backgroundColor: '#FECDA6', 
  },
  content: {
    flex: 6, // Take 60% of the space
    flexDirection: 'row', // Arrange boxes horizontally
    justifyContent: 'center', // Center boxes horizontally
    alignItems: 'center', // Center boxes vertically
    backgroundColor: '#FF9130', 
 },
  box: { 
    flex: 1, // Each box takes one third of the content section
    aspectRatio: 1, // Make the box square (width equals height)
    margin: 'auto', // Center the box
    borderWidth: 1,
    backgroundColor: '#687EFF',
  },
  footer: { 
    flex: 2, // Take 20% of the space
    backgroundColor: '#FF5B22', 
  },
});

