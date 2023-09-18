import React from 'react';
import {View, Text, Button, Pressable, StyleSheet, ImageBackground} from 'react-native';
import { shadow } from '../styles/inputs';
import axios from 'axios'
import constants from '../constants';
import { Image } from 'react-native-svg';
import colors from '../styles/colors';

const LoginCard = (props) => {
  return (
    <Pressable onPress={props.handler}>
        <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.message}</Text>
        </View>
    </Pressable>
  )
}


const login = (navigation) => {
  axios.post(`${constants.server_url}/api/method/login`, {"usr": "Administrator", "pwd": "admin"})
      .then(res => navigation.navigate('App'))
}

export default function LoginScreen({navigation}) {
  return (
    <ImageBackground blurRadius={5} source={require('../assets/images/login.jpg')} style={{width: '100%', height: '100%'}}>
      <View>
        <Text style={[styles.heading, {backgroundColor: "rgba(0,0,0,0.2)", }]}>Welcome to Hustle Hub</Text>
        <LoginCard 
          title="Edutec"
          message="Get the skills needed for your next hustle."
          handler={() => login(navigation)}
          backgroundColor={colors.primary} />
        <LoginCard 
          title="Marketplace" 
          message="Shop with our hustlers." 
          handler={() => login(navigation)}
          backgroundColor={colors.secondary} />
        <LoginCard 
          title="Partners" 
          message="Equip your next hustle with our partners." 
          handler={() => login(navigation)}
          backgroundColor={colors.tertiary} />
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 12,
    ...shadow,
    elevation: 5,
    margin: 12,
    backgroundColor: 'white',
    padding: 12,
    
  },
  title: {
    fontSize: 24,
    color: "white",
    
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    margin: 36,
    textShadowColor: "black",
    textShadowRadius: 0.5,
    color: "white"
  },
  tagLine: {
    fontSize: 18,
    color: "white"
  }
})