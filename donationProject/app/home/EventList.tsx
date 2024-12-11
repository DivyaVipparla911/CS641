import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook

const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const navigation = useNavigation(); // Initialize useNavigation hook

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); // Add doc.id to each event
    };
    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id} // Using Firestore document ID as the key
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.eventName}</Text>
            <Text style={styles.description}>{item.eventDescription}</Text>
            <Text style={styles.option}>Items accepted: {item.itemsAccepted}</Text>
            
            {/* Displaying the location information */}
            {item.location && item.location.address && (
              <Text style={styles.location}>
                Location: {item.location.address}
              </Text>
            )}
            {/* Optionally display coordinates if needed */}
            {item.location && item.location.coordinates && (
              <Text style={styles.coordinates}>
                Coordinates: Lat {item.location.coordinates.lat}, Lon {item.location.coordinates.lng}
              </Text>
            )}
          </View>
        )}
      />

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  option: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  coordinates: {
    fontSize: 12,
    color: '#888',
  },
});

export default EventList;
