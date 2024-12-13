import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const EventDetails = ({ route }) => {
  const { eventId } = route.params;  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventDoc = doc(db, 'events', eventId); 
      const docSnap = await getDoc(eventDoc);
      if (docSnap.exists()) {
        setEvent(docSnap.data());  
      } else {
        console.log('No such document!');
      }
    };
    fetchEventDetails();
  }, [eventId]); 

  if (!event) {
    return <Text>Loading...</Text>;  
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.description}>{event.eventDescription}</Text>
      <Text style={styles.option}>Items accepted: {event.itemsAccepted}</Text>
      <Text style={styles.description}>Date: {event.eventDate}</Text>

      {event.location && event.location.address && (
        <Text style={styles.location}>Location: {event.location.address}</Text>
      )}

      {event.location && event.location.coordinates && (
        <Text style={styles.coordinates}>
          Coordinates: Lat {event.location.coordinates.lat}, Lon {event.location.coordinates.lng}
        </Text>
      )}
    </ScrollView>
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  coordinates: {
    fontSize: 12,
    color: '#888',
  },
});

export default EventDetails;
