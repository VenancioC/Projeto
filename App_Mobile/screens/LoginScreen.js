import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,StatusBar,LayoutAnimation, ImageBackground, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {StackNavigator} from "react-navigation";
import axios from "axios";



export default class LoginScreen extends Component {


  constructor(props){
		super(props)
		this.state={
			Email:'',
			Password:'',
		}
	}
	
	login = () =>{
		const {Email,Password} = this.state;
  
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(Email==""){
		  this.setState({email:'Please enter Email address'})
		}
		else if(reg.test(Email) === false)
		{
		this.setState({email:'Email is Not Correct'})
		return false;
    }
    else if(Password==""){
		  this.setState({email:'Please enter your Password'})
    }
    else{
  
      console.log(Email);
      console.log(Password);
      console.log(this.state);

		
      axios
      .post("http://localhost:3001/auth/signin", this.state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

		                                                                                                                                                                                                                                                                                                                                                                                                                                

  render() {
    return (
      <View style={styles.container}>
          <StatusBar barStyle="light-content"></StatusBar>
          <ImageBackground
          style={{flex: 1,
            width: null,
            height: null,
            justifyContent:'center'}}>

         
        <Text style={styles.greeting}> {`Hello again. \n Welcome back.`} </Text>
        <Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>

      <View style={styles.form}>
        <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput 
            style={styles.input} 
            autoCapitalize="none"
            onChangeText={Email => this.setState({Email})}
            ></TextInput>
        </View>
        <View style={{marginTop:32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput 
            style={styles.input} 
            autoCapitalize="none" 
            secureTextEntry
            onChangeText={Password => this.setState({Password})}
            ></TextInput>
        </View>
      </View>
      <TouchableOpacity 
      onPress={this.login}
      style={styles.button} 
      >
          <Text  
          style={{color:'#FFF',fontWeight:'500'}}
          >Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf:'center',marginTop:32}}
      onPress={()=>this.props.navigation.navigate('Register')}>
        

        <Text style={{color:'#FFF',fontSize:12}}>
            New to SpaceScroll? <Text style={{fontWeight:'500',color:'#8A89FE'}}>
                Sign up
            </Text>
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={{alignSelf:'center',marginTop:32}}
      onPress={()=>this.props.navigation.navigate('Loading')}>
        
        <Text style={{color:'#FFF',fontSize:12}}>
            TESTE <Text style={{fontWeight:'500',color:'#8A89FE'}}>
                TESTE
            </Text>
        </Text>
      </TouchableOpacity>




      </ImageBackground>
      </View>
      
    );
  }

}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0b273d'

  },
  greeting:{
      marginTop:24,
      fontSize:24,
      fontWeight:'400',
      textAlign:'center',
      color:'#FFF'
  },
  errorMessage:{
      height:72,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  form:{
    marginBottom:48,
    marginHorizontal:30
  },
  inputTitle:{
      color:'#8A89FE',
      fontSize:10,
      textTransform:'uppercase'
  },
  input:{
      borderBottomColor:'#8A8F9E',
      borderBottomWidth:StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:"#FFF"
  },
  button:{
      marginHorizontal:30,
      backgroundColor:"#E9446A",
      borderRadius:4,
      height:52,
      alignItems:'center',
      justifyContent:'center'

  },
  error:{
      color:'#E9446A',
      fontSize:13,
      fontWeight:'600',
      textAlign:'center'

  }

})
