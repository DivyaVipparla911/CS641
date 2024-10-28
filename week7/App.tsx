import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();


function Home({navigation}){
    return(
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button title={"Settings"} onPress={() => navigation.navigate('Settings')}/>
        <Button title={"Tab1"} onPress={() => navigation.navigate('Tab1')}/>
      </View>
    )
}

function Settings({navigation}) {
  return (
      <View style={styles.container}>
          <Text>This is settings screen</Text>
          <Button title={"Settings Again"} onPress={() => navigation.navigate('Settings')}/>
      </View>
  );
}

function Tab1({navigation}) {
  return (
      <View style={styles.container}>
          <Text>This is new screen</Text>
          <Button title={"Go to Settings"} onPress={() => navigation.navigate('Settings')}/>
      </View>
  );
}



export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen name = "Home" component={Home}></Stack.Screen>
           <Stack.Screen name="Tab1" component={Tab1}/>
           <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
