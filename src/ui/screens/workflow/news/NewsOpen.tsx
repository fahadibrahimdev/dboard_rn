import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const NewsOpen = () => {
  const [pickedImage, setPickedImage] = useState(null);

  const pickImageHandler = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // Prevent image from backing up to iCloud/Google Photos
        // path: 'images', // Optional: Specific path for image storage on device
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response:', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker error:', response.error);
      } else {
        const source = { uri: response.assets[0].uri }; // Assuming single selection
        setPickedImage(source);
      }
    });
  };

  // Add logic for uploading the image to your backend (implementation depends on your backend)
  const handleUploadImage = () => {
    if (!pickedImage) {
      alert('Please select an image first.');
      return;
    }

    // Replace with your actual upload logic (e.g., using fetch or axios)
    console.log('Uploading image:', pickedImage.uri); // Placeholder for actual upload
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageHandler}>
        {/* Your icon component (replace with your desired icon) */}
        {/* <Image source={require('')} style={styles.icon} /> */}
        <Icon
              style={{
                marginHorizontal: 6,
              }}
              color={'#007AFF'}
              name="tray-arrow-up"
              size={50}
            />
      </TouchableOpacity>
      {pickedImage && (
        <Image source={pickedImage} style={styles.image} />
      )}
      <Button title="Upload Image" onPress={handleUploadImage} disabled={!pickedImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});



export default NewsOpen;