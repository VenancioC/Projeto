import React, { Component } from 'react';
import { View, Text,StyleSheet, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends Component {
                   
  componentDidMount(){


    
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> LoadingScreen </Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  }

})