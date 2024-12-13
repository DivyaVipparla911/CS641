import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Welcome to the Donation App</Text>
      <Button title="View Donations" onPress={() => navigation.navigate('DonationList')} />
      <Button title="View Events" onPress={() => navigation.navigate('EventList')} />
      <Button title="Create Donation" onPress={() => navigation.navigate('DonationForm')} />
      <Button title="Create Event" onPress={() => navigation.navigate('EventForm')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
