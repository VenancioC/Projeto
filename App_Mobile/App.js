import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import RegisterScreen from './screens/RegisterScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
 

const AuthStack=createStackNavigator({
  Login:LoginScreen,
  Register:RegisterScreen,
  Loading:LoadingScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Login:LoginScreen,

      //Loading:LoadingScreen,
      // App:AppContainer,
       Auth:AuthStack
    },{
      //initialRouteName:"Loading"
      initialRouteName:"Login"
    }
  )
)


/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>IPCAddd</Text>
      <StatusBar style="auto" />
    </View>
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
*/