import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Alert,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {card, shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Centered, {Row} from '../components/layout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';

import {useNavigation} from '@react-navigation/native';

const toCookieObj = (cookie: string) => {
  const arr = cookie.split(';').map(item => item.split('='));
  const resp = {};
  arr.forEach(item => {
    resp[item[0].trim().replace('"', '')] = item[1];
  });
  return resp;
};

const LoginCard = props => {
  return (
    <Pressable
      onPress={() => {
        props.handler();
      }}>
      <View style={[styles.container]}>
        <Centered>
          <Image
            source={props.source}
            style={{width: props.width, height: props.height, marginBottom: 18}}
          />
        </Centered>
        <View style={styles.loginText}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.message}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const login = (navigation, route) => {
  //  TODO check if token exists and navigate else redirect to login
  
  navigation.navigate(route || 'Home');
};

const SignInView = props => {
  const navigator = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const onLogin = () => {
    axios
      .post(`${constants.server_url}/api/method/login`, {
        usr: username,
        pwd: password,
      })
      .then(res => {
        const cookies = toCookieObj(res.headers['set-cookie'][0]);
        AsyncStorage.setItem('expiry', new Date(cookies.Expires).toISOString());
        AsyncStorage.setItem('user', username);
        navigator.navigate('Profile');
      })
      .catch(err => {
        Alert.alert('Error', 'Could not log in with provided credentials');
      });
  };

  return (
    <View style={styles.signInCard}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.inputText}
          placeholderTextColor={'black'}
        />
      </View>
      <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor={'black'}
          style={styles.inputText}
          secureTextEntry={!showPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{padding: 12}}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={24} />
        </Pressable>
      </View>
      <Row styles={styles.buttonRow}>
        <Pressable style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigator.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </Row>
    </View>
  );
};

export default function LoginScreen({navigation}) {
  const [showLogin, setShowLogin] = React.useState(false);
  const {width, height} = Dimensions.get('screen');
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      if (value === 'Guest') {
        // setShowLogin(false);
        console.log(value);
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/background_2.png')}
      style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <Image
          source={require('../assets/images/Logo-01.png')}
          style={{width: width, height: height / 4}}
        />
        {showLogin ? (
          <SignInView />
        ) : (
          <View>
            <Row>
              <LoginCard
                title="Marketplace"
                message="Shop with our hustlers."
                source={require('../assets/images/marketplace.png')}
                handler={() => login(navigation, 'Marketplace Home')}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
              <LoginCard
                title="Partners"
                message="Equip your next hustle."
                source={require('../assets/images/partner_store.png')}
                handler={() => login(navigation)}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
            </Row>
            <Row>
              <LoginCard
                title="Edutec"
                source={require('../assets/images/edutec.png')}
                message="Get the skills needed for your next hustle."
                handler={() => login(navigation, 'Courses Home')}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
              <LoginCard
                title="Business Books"
                source={require('../assets/images/books.png')}
                message="Stay on top of your hustle."
                handler={() => login(navigation, 'Books')}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
            </Row>
          </View>
        )}
        <Centered>
          <Pressable onPress={() => setShowLogin(!showLogin)}>
            <Row styles={styles.pill}>
              {showLogin ? null : (
                <FontAwesomeIcon
                  icon={faLock}
                  color={colors.primary}
                  size={24}
                />
              )}
              <Text style={styles.signIn}>
                {' '}
                {showLogin ? 'Dashboard' : 'Sign In'}
              </Text>
            </Row>
          </Pressable>
        </Centered>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    ...shadow,
    elevation: 5,
    margin: 12,
    backgroundColor: 'white',
    padding: 12,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
  },
  loginText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  welcome: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    margin: 36,
    textAlign: 'center',
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
  signIn: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 18,
  },
  pill: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 18,
    paddingLeft: 40,
    paddingRight: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonRow: {
    gap: 12,
    padding: 12,
  },
  inputContainer: {
    padding: 4,
    ...card,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
    elevation: 5,
  },
  signInCard: {
    marginTop: 48,
  },
  inputText: {
    color: 'black',
    flex: 1,
  },
});
