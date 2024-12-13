import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './auth/Login';
import Register from './auth/Register';
import HomeScreen from './home/HomeScreen';
import DonationList from './home/DonationList';
import EventList from './home/EventList';
import DonationForm from './home/DonationForm';
import EventForm from './home/EventForm';
import EventDetails from './home/EventDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DonationList" component={DonationList} />
        <Stack.Screen name="EventList" component={EventList} />
        <Stack.Screen name="DonationForm" component={DonationForm} />
        <Stack.Screen name="EventForm" component={EventForm} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
