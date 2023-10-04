import React from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native-svg';
import colors from '../styles/colors';

const LoginCard = props => {
  return (
    <Pressable onPress={() => {console.log("pressed"); props.handler()}}>
      <View style={[styles.container]}>
        <ImageBackground
          source={props.source}
          style={{flex: 1, position: 'realative'}}
          imageStyle={{right: 0, left: "30%",width: '70%', height: '100%', position: 'absolute', resizeMode: 'cover',}}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.message}</Text>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const login = (navigation, route) => {
  axios
    .post(`${constants.server_url}/api/method/login`, {
      usr: 'Administrator',
      pwd: 'admin',
    })
    .then(res => navigation.navigate(route || 'Home'));
};

export default function LoginScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={{width: '100%', height: '100%'}}>
      <View>
        <Text style={[styles.welcome]}>Welcome to Hustle Hub</Text>
        
        <LoginCard
          title="Marketplace"
          message="Shop with our hustlers."
          source={require('../assets/images/street-market.png')}
          handler={() => login(navigation, 'Marketplace Home')}
          backgroundColor={colors.secondary}
        />
        <LoginCard
          title="Partners"
          message="Equip your next hustle."
          source={require('../assets/images/partnership.png')}
          handler={() => login(navigation)}
          backgroundColor={colors.tertiary}
        />
        <LoginCard
          title="Edutec"
          source={require('../assets/images/studying.png')}
          message="Get the skills needed for your next hustle."
          handler={() => login(navigation, 'Courses Home')}
          backgroundColor={colors.primary}
        />
        
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
    color: 'black',
    backgroundColor: 'white',
    width: 180
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
    width: 180
  },
  welcome: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    margin: 36,
    textAlign: "center"
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    margin: 36,
    textShadowColor: 'black',
    textShadowRadius: 0.5,
    color: 'white',
  },
  tagLine: {
    fontSize: 18,
    color: 'white',
  },
});
