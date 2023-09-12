import React from 'react';
import {View, Text, Button, Pressable, StyleSheet} from 'react-native';
import { shadow } from '../styles/inputs';
import axios from 'axios'
import constants from '../constants';


const LoginCard = (props) => {
  return (
    <Pressable onPress={props.handler}>
        <View style={styles.container}>
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
    <View>
      <Text style={styles.heading}>Welcome to Hustle Hub</Text>
      <LoginCard 
        title="Edutec"
        message="Get the skills needed for your next hustle."
        handler={() => login(navigation)} />
      <LoginCard 
        title="Marketplace" 
        message="Shop with our hustlers." 
        handler={() => login(navigation)} />
      <LoginCard 
        title="Partners" 
        message="Equip your next hustle with our partners." 
        handler={() => login(navigation)} />
      
    </View>
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
    padding: 12  
  },
  title: {
    fontSize: 24,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    margin: 36
  },
  tagLine: {
    fontSize: 18
  }
})





