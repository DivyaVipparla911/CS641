import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DonationList = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDonations = async () => {
      const querySnapshot = await getDocs(collection(db, 'donations'));
      const donationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationsData);
    };
    fetchDonations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.itemName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.option}>Option: {item.donationOption}</Text>

            {item.donationOption === 'pickup' && item.address && (
              <Text style={styles.address}>Pickup Address: {item.address}</Text>
            )}

            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
          </View>
        )}
        contentContainerStyle={styles.flatListContentContainer}
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
  flatListContentContainer: {
    paddingBottom: 20, // Adjust for any needed padding
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
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  option: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default DonationList;
