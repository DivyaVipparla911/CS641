import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For selecting images
import RNPickerSelect from 'react-native-picker-select'; // For dropdown replacement
import { useNavigation } from '@react-navigation/native';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const DonationForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [donationOption, setDonationOption] = useState('drop-off');
  const [address, setAddress] = useState('');  // State for address input
  const navigation = useNavigation();

  // Function to handle image picking
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!itemName || !description || !category || (donationOption === 'pickup' && !address)) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    try {
      const donationRef = collection(db, 'donations');
      await addDoc(donationRef, {
        itemName,
        description,
        category,
        imageUri,
        donationOption,
        address: donationOption === 'pickup' ? address : '',  // Only include address if pickup
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Your donation has been submitted!');
      // Clear form fields
      setItemName('');
      setDescription('');
      setCategory('');
      setImageUri(null);
      setDonationOption('');
      setAddress('');  // Reset address field

      navigation.navigate('Home'); // Navigate to the Home screen
    } catch (error) {
      Alert.alert('Error', 'There was a problem submitting your donation.');
      console.error('Error adding donation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate an Item</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Category</Text>
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: 'Clothes', value: 'clothes' },
          { label: 'Groceries', value: 'groceries' },
          { label: 'Others', value: 'others' },
        ]}
        placeholder={{ label: 'Select a category', value: null }}
        value={category}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Donation Option</Text>
      <RNPickerSelect
        onValueChange={(value) => setDonationOption(value)}
        items={[
          { label: 'Drop Off', value: 'drop-off' },
          { label: 'Pickup', value: 'pickup' },
        ]}
        placeholder={{ label: 'Select a donation option', value: null }}
        value={donationOption}
        style={pickerSelectStyles}
      />

      {/* Conditionally render address input based on donation option */}
      {donationOption === 'pickup' && (
        <>
          <Text style={styles.label}>Pickup Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address for pickup"
          />
        </>
      )}

      <Text style={styles.label}>Add Image (Optional)</Text>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title="Submit Donation" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 15,
  },
});

export default DonationForm;
