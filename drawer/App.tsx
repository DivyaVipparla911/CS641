import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


function Home({navigation}){
  <View style={styles.container}>
    <Text>This is new screen</Text>
    <Button title={"Go to Settings"} onPress={() => navigation.navigate('Settings')}/>
</View>
}

function Settings(){
  <View style={styles.container}>
          <Text>This is settings screen</Text>
          <Button title={"Settings Again"} onPress={() => navigation.navigate('Settings')}/>
  </View>
}

export default function App() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
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
