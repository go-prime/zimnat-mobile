import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {card, shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import colors from '../styles/colors';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Centered, {Row} from '../components/layout';
import ImagePicker from '../components/image_picker';
import Field from '../components/form';
import {useNavigation} from '@react-navigation/native';
import ImageIcon from '../components/image';
import {Paragraph, Title} from '../components/text';
import {getAbsoluteURL} from '../utils';
import { LoadingButton } from '../components/button';

const validatePassword = pwd => {
  let valid = true;
  if (pwd.length < 8) {
    valid = false;
  }

  if (pwd.length < 8) {
    valid = false;
  }

  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const number = /[0-9]/;
  const symbol = /[\\@#$-/:-?{-~!"^_`\[\]]/;

  if (!pwd.match(upper)) {
    valid = false;
  }
  if (!pwd.match(lower)) {
    valid = false;
  }
  if (!(pwd.match(number) || pwd.match(symbol))) {
    valid = false;
  }

  return valid;
};

export default SignInUpScreen = props => {
  const navigator = useNavigation();
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const {width, height} = Dimensions.get('screen');
  const [signingUp, setSigningUp] = React.useState(false);

  const signUp = () => {
    setSigningUp(true)
    if (!password.length) {
      Alert.alert('Validation Error', 'A password is required');
      return;
    }
    if (!email.length) {
      Alert.alert('Validation Error', 'An email is required');
      return;
    }
    if (!(first.length && last.length)) {
      Alert.alert('Validation Error', 'A full name is required');
      return;
    }
    if (password != repeat) {
      Alert.alert('Validation Error', 'The entered passwords do not match.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        `Password invalid, it must have 8 or more characters, 
        with lower and upper case characters and at least one symbol or number`,
      );
      return;
    }

    axios
      .post(
        getAbsoluteURL(
          '/api/method/billing_engine.billing_engine.api.create_client',
        ),
        {
          data: {
            first_name: first,
            last_name: last,
            email: email,
            phone: phone,
            password: password,
            address: address,
          },
        },
      )
      .then(res => {
        setSigningUp(false)
        if (res.data.errors) {
          Alert.alert(
            'Error',
            `Could not sign up because of an error: ${res.data.errors}`,
          );
        } else {
          const cookies = toCookieObj(res.headers['set-cookie'][0]);
          AsyncStorage.setItem(
            'expiry',
            new Date(cookies.Expires).toISOString(),
          );
          AsyncStorage.setItem('user', username);
          Alert.alert('Success', `Signed up as ${email} for Hustle Hub`);
          navigator.navigate('Dashboard');
        }
      })
      .catch(err => {
        setSigningUp(false)
        Alert.alert('Error', 'There was an error with your request.');
        console.log(err.response.data);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/images/background_2.png')}
      style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <Image
          source={require('../assets/images/Logo-01.png')}
          style={{width: width, height: height / 4}}
        />
        <Title light>Sign Up</Title>
        <Row>
          <Field
            light
            label="First Name"
            value={first}
            onTextChange={setFirst}
          />
          <Field light label="Last Name" value={last} onTextChange={setLast} />
        </Row>

        <Field light label="Phone" value={phone} onTextChange={setPhone} />
        <Field light label="Email" value={email} onTextChange={setEmail} />
        <Field
          light
          label="Address"
          multiline
          value={address}
          onTextChange={setAddress}
        />
        <Field light label="Password" password value={password} onTextChange={setPassword} />
        <Field light label="Repeat Password" password value={repeat} onTextChange={setRepeat} />
        <Centered>
          <Paragraph>By Signing up you agree to Hustle Hub's</Paragraph>
          <Pressable onPress={() => {
            navigator.navigate("WebView", {"url": "https://hustle.gopri.me/terms-and-conditions"})
          }}>
            <Text style={styles.termsText}>Terms and conditions</Text>
          </Pressable>
        </Centered>
        <LoadingButton
            loading={signingUp} onPress={signUp} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LoadingButton>
        <Row
          styles={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 80,
          }}>
          <Text style={styles.message}>Already have an account?</Text>
          <Pressable
            style={styles.msgButton}
            onPress={() => navigator.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Row>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
    color: 'black',
    margin: 12,
    fontWeight: 'bold',
  },
  msgButton: {
    fontSize: 18,
    color: colors.primary,
    margin: 12,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    margin: 12,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 24,
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
  inputText: {
    color: 'black',
    flex: 1,
  },
  termsText: {
    color: "#007bff",
    fontSize: 18,
    fontWeight: "700"
  }
});
