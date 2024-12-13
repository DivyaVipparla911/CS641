import React, { useState, useEffect } from 'react';
import { ScrollView, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 

const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); 
    };
    fetchEvents();
  }, []);

  const handleEventPress = (eventId) => {
    navigation.navigate('EventDetails', { eventId });  
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item.id)} style={styles.item}>
            <Text style={styles.title}>{item.eventName}</Text>
            {/* <Text style={styles.description}>{item.eventDescription}</Text>
            <Text style={styles.option}>Items accepted: {item.itemsAccepted}</Text>
             */}

            {/* {item.location && item.location.address && (
              <Text style={styles.location}>
                Location: {item.location.address}
              </Text>
            )} */}

            {/* {item.location && item.location.coordinates && (
              <Text style={styles.coordinates}>
                Coordinates: Lat {item.location.coordinates.lat}, Lon {item.location.coordinates.lng}
              </Text>
            )} */}
          </TouchableOpacity>
        )}
      />

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
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
