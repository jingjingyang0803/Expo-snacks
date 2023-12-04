import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';

export default App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [startCamera, setStartCamera] = useState(false);

  useEffect(() => {
    const requestCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermissions();
  }, []);

  const handleStartCamera = () => {
    setStartCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo.uri);
      setStartCamera(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>Camera access is unavailable. 
          Check device settings to enable camera permissions for this app.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {capturedPhoto && !startCamera && 
        <Image source={{ uri: capturedPhoto }} style={styles.image} resizeMode="cover" />}
      {startCamera ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} 
          ref={(ref) => setCameraRef(ref)}  ratio={"16:9"}>
          <View style={styles.view}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={takePicture}
            >
              <View style={styles.circle} />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title=" Take a photo"
            icon={
              <Icon
                name="photo-camera"
                size={20}
                color="white"
              />
            }
            buttonStyle={{backgroundColor: "#3081D0"}}
            onPress={handleStartCamera}
          />
        </View>
      )}
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '80%',
    height: '75%',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 60,
  },
  camera: {
    flex: 1
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  },
  touchableOpacity: {
    alignSelf: 'center',
    marginBottom: 20
  },
  circle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width:50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent white
    display: 'flex',
    marginBottom: 30,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginBottom: 60,
    width: "60%",
  },
  noAccessText: {
    fontSize: 18,
    textAlign:'center',
    margin:20,
  }
});



