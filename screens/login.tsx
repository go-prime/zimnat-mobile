import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {card, shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Centered, {Row} from '../components/layout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faLock,
  faDoorOpen,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-native-reanimated-carousel';
import ImageIcon from '../components/image';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getAbsoluteURL} from '../utils';
import Geolocation from 'react-native-geolocation-service';
import { AnimatedButton, LoadingButton } from '../components/button';
import Loading from '../components/loading';

const toCookieObj = (cookie: string) => {
  const arr = cookie.split(';').map(item => item.split('='));
  const resp = {};
  arr.forEach(item => {
    resp[item[0].trim().replace('"', '')] = item[1];
  });
  return resp;
};


const animProps = {
  animatedInitial: 1,
  animatedStyle: 'opacity',
  animatedTo: 0.2,
  animationDuration: 500
}

const SignInView = props => {
  const navigator = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const {width, height} = Dimensions.get('screen');
  const [loggingIn, setLoggingIn] = React.useState(false)

  const onLogin = () => {
    setLoggingIn(true)
    Geolocation.getCurrentPosition(position => {
      axios
        .post(
          `${constants.server_url}/api/method/login`,
          {
            usr: username,
            pwd: password,
          },
          {
            headers: {
              'fine-location': JSON.stringify(position.coords),
            },
          },
        )
        .then(res => {
          const cookies = toCookieObj(res.headers['set-cookie'][0]);
          AsyncStorage.setItem(
            'expiry',
            new Date(cookies.Expires).toISOString(),
          );
          AsyncStorage.setItem('user', username);
          AsyncStorage.setItem('location', JSON.stringify(position.coords));
          AsyncStorage.setItem('location-last-fetch', new Date().toISOString());
          navigator.navigate("Dashboard")
          setLoggingIn(false)
        })
        .catch(err => {
          setLoggingIn(false)
          Alert.alert('Error', 'Could not log in with provided credentials');
        });
    });
  };

  return (
    <View style={styles.signInCard}>
      <Image
        source={require('../assets/images/Logo-01.png')}
        style={{width: width, height: height / 4}}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.inputText}
          placeholderTextColor={'black'}
          autoComplete="username"
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
          autoComplete="password"
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{padding: 12}}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size={24} />
        </Pressable>
      </View>
      <Row styles={styles.buttonRow}>
        <LoadingButton
            loading={loggingIn}
            indicatorColor={'white'}
            style={styles.primaryButton} 
            onPress={onLogin}
            {...animProps}>
          <Text style={styles.buttonText}>Login</Text>
        </LoadingButton>
        <AnimatedButton
          {...animProps}
          style={styles.secondaryButton}
          onPress={() => navigator.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </AnimatedButton>
      </Row>
    </View>
  );
};

const HomeCarousel = () => {
  const {width, height} = Dimensions.get('screen');
  const data = {
    carousel: [
      {image: require('../assets/images/marketplace.png')},
      {image: require('../assets/images/partner_store.png')},
      {image: require('../assets/images/edutec.png')},
      {image: require('../assets/images/books.png')},
    ],
  };

  return (
    <Carousel
      loop
      width={width - 24}
      height={height * 0.7}
      autoPlay={true}
      data={data.carousel}
      scrollAnimationDuration={3000}
      renderItem={({index}) => {
        const item = data.carousel[index];
        return (
          <View style={styles.carouselItemContainer}>
            <Image
              source={item.image}
              style={{
                width: width - 24,
                height: 0.6 * height,
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default function LoginScreen({navigation}) {
  const [showLogin, setShowLogin] = React.useState(false);
  const isFocused = useIsFocused();
  const {width, height} = Dimensions.get('screen');

  React.useEffect(() => {
    AsyncStorage.getItem('expiry').then(expiry => {
      if (expiry && new Date() < new Date(expiry)) {
        AsyncStorage.getItem('user').then(user => {
          console.log(expiry)
          if(user) {
            navigation.navigate("Dashboard")
          }
        });
      }
    });
  }, [isFocused]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  React.useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <ScrollView>
      {showLogin ? (
        <SignInView />
      ) : (
        <>
          <Image
              source={require('../assets/images/Logo-01.png')}
              style={{
                width: width - 24,
                height: 0.1 * height,
              }}
            />
          <HomeCarousel />
          <Row>
            <AnimatedButton {...animProps} onPress={() => setShowLogin(!showLogin)}>
              <Row styles={styles.signIn}>
                <FontAwesomeIcon
                  icon={faLock}
                  color={colors.primary}
                  size={24}
                />
                <Text style={styles.signInText}> Sign In</Text>
              </Row>
            </AnimatedButton>
            <AnimatedButton 
              {...animProps}
              style={styles.signUp} 
              onPress={() => navigation.navigate('Sign Up')}>
              <Row >
                <FontAwesomeIcon icon={faUser} color={'white'} size={24} />
                <Text style={styles.signUpText}> Sign Up</Text>
              </Row>
            </AnimatedButton>
          </Row>
        </>
      )}
    </ScrollView>
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    margin: 12,
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
  signInText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 18,
  },
  signUpText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  signIn: {
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
  signUp: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 18,
    paddingLeft: 40,
    paddingRight: 40,
    margin: 12,
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
  carouselItemContainer: {
    position: 'relative',
  },
});
