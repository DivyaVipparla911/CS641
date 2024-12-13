import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EventForm = () => {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [itemsAccepted, setItemsAccepted] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async () => {
    if (!eventName || !eventDescription || !eventDate || !itemsAccepted || !street || !city || !zipCode || !state) {
      alert('Please fill out all fields.');
      return;
    }

    const fullAddress = `${street},  ${city}, ${zipCode}, ${state}`;

    try {
      await addDoc(collection(db, 'events'), {
        eventName,
        eventDescription,
        eventDate,
        itemsAccepted,
        location: fullAddress,  // Save the full address as a string
        createdAt: new Date(),
      });
      navigation.goBack();
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error adding event: ', error);
      alert('There was an error creating the event. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Donation Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Items Accepted (e.g., clothes, groceries)"
        value={itemsAccepted}
        onChangeText={setItemsAccepted}
      />

      {Platform.OS === 'web' ? (
        <input
          type="date"
          style={styles.webDatePicker}
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      ) : (
        <>
          <Button title="Pick Event Date" onPress={() => setShowDatePicker(true)} />
          <TextInput
            style={styles.input}
            placeholder="Event Date (YYYY-MM-DD)"
            value={eventDate}
            editable={false} 
          />
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      )}

      {/* Location Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="city"
        value={zipCode}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />

      <Button title="Submit Event" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  webDatePicker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});

export default EventForm;
