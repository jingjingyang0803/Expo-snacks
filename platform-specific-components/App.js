import { Platform, ToastAndroid, ActionSheetIOS, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useState } from 'react';

// Define the main App component
export default function App() {
    const [color, setColor] = useState('#687EFF'); // Initialize box colors

    const handlePress = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Button pressed!', ToastAndroid.SHORT);
        } else if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Change Box Color to Red', 'Change Box Color to Green', 'Cancel'],
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        // Change box colors
                        setColor('red');
                    }
                    else if (buttonIndex === 1) {
                        // Change box colors
                        setColor('green');
                    }
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}></View>
            {/* Content section */}
            <View style={styles.content}>
                {/* Box 1 */}
                <View style={[styles.box, {backgroundColor: color}]}></View>
                {/* Box 2 */}
                <View style={[styles.box, {backgroundColor: color}]}></View>
                {/* Box 3 */}
                <View style={[styles.box, {backgroundColor: color}]}></View>
            </View>
            {/* Footer section */}
            <View style={styles.footer}>
                {/* Button */}
                <Button
                    buttonStyle={styles.button}
                    title="Press me"
                    onPress={handlePress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        backgroundColor: '#FECDA6',
    },
    content: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9130',
    },
    box: {
        flex: 1,
        aspectRatio: 1,
        margin: 'auto',
        borderWidth: 1,
    },
    footer: {
        flex: 2,
        backgroundColor: '#FF5B22',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
    backgroundColor: '#687EFF',
    borderRadius: 8,
    marginBottom: 20,
  }
});


