import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,StatusBar,LayoutAnimation, ImageBackground, ActivityIndicator } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {StackNavigator} from "react-navigation";
import axios from "axios";

export default class RegisterScreen extends Component {

  constructor(props){
		super(props)
		this.state={
			Username:'',
      Name:'',
      Email:'',
			Password:'',
			BirthDate:'',
			Genre:'',
		}
	}
  
  Register = () => {
    const {Username,Name,Email,Password,BirthDate,Genre} = this.state;
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
    if(Name==""){
		  this.setState({email:'Please enter your Name'})
    }
    else if(Username==""){
		  this.setState({email:'Please enter your Username'})
		}
    else if(Email==""){
		  this.setState({email:'Please enter Email address'})
		}
		else if(reg.test(Email) === false)
		{
		this.setState({email:'Email is Not Correct'})
		return false;
    }
/*     else if(BirthDate==""){
		  this.setState({email:'Please enter your Birth Date'})
    }
    else if(Genre==""){
		  this.setState({email:'Please enter your Genre'}) 
    }*/
    else if(Password==""){
		  this.setState({email:'Please enter your Password'})
    }
    else{
      console.log(Username);
      console.log(Name);
      console.log(Email);
      console.log(Password);
      console.log(BirthDate);
      console.log(Genre);
      console.log(this.state);

      axios
      .post("http://localhost:3001/auth/signup", this.state)
      .then(function (response) {
        console.log(response);
        
        props.navigation.navigate('Login');
       
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
        
{/*         <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.navigate('Login')}>
            <Ionicons name='ios-arrow-round-back' size={32} color="#FFF"></Ionicons>
        </TouchableOpacity> */}
        <View>
        <View style={{position:'absolute',alignItems:'center',width:'100%'}}>

        <Text style={styles.greeting}> {`Hello! \n Sign up to get started.`} </Text>
        
        <Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>


        </View>

       
     
      <View style={styles.form}>
      <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput 
            style={styles.input} 
            autoCapitalize="none"
            onChangeText={Name => this.setState({Name})}
            ></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>User Name</Text>
            <TextInput 
            style={styles.input} 
            autoCapitalize="none"
            onChangeText={Username => this.setState({Username})}
            ></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput 
            style={styles.input} 
            autoCapitalize="none"
            onChangeText={Email => this.setState({Email})}
            ></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>------------Birthday Date------------</Text>


        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>------------Genre------------</Text>
            
        </View>
        </View>
        <View style={{marginTop:16}}>
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
      style={styles.button} 
      onPress={this.Register} >
          <Text style={{color:'#FFF',fontWeight:'500'}}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={{alignSelf:'center',marginTop:32}}
      onPress={()=>this.props.navigation.navigate('Login')}>
        
        <Text style={{color:'#FFF',fontSize:12}}>
           Already have an account? <Text style={{fontWeight:'500',color:'#8A89FE'}}>
                Sign in
            </Text>
        </Text>

      </TouchableOpacity>
      </View>
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
      marginTop:12,
      fontSize:16,
      fontWeight:'400',
      textAlign:'center',
      color:'#FFF'
  },
  errorMessage:{
      marginTop:6,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  form:{
    marginTop:210,
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
      justifyContent:'center',
      marginTop:16

  },
  error:{
      color:'#E9446A',
      fontSize:13,
      fontWeight:'600',
      textAlign:'center',
      marginTop:16

  },
  back:{
      position: 'absolute',
      top:16,
      left:16,
      width:32,
      height:32,
      borderRadius:16,
      backgroundColor:'rgba(21,22,48,0.1)',
      alignItems:'center',
      justifyContent:'center'
  }

})
