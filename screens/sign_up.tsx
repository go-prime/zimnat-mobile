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
import {Title} from '../components/text';

export default SignInUpScreen = props => {
  const navigator = useNavigation();
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [imgData, setImgData] = React.useState('');
  const [imgName, setImgName] = React.useState('');
  const [password, setPassword] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const {width, height} = Dimensions.get('screen');

  return (
    <ImageBackground
      source={require('../assets/images/background_2.png')}
      style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <Image
          source={require('../assets/images/Logo-01.png')}
          style={{width: width, height: height / 4}}
        />
        <Title>Sign Up</Title>
        <Row>
          <Field label="First Name" value={first} onTextChange={setFirst} />
          <Field label="Last Name" value={last} onTextChange={setLast} />
        </Row>

        <Field label="Phone" value={phone} onTextChange={setPhone} />
        <Field label="Email" value={email} onTextChange={setEmail} />
        <Field label="Address" multiline={4} value={address} onTextChange={setAddress} />
        <Field label="Password" password  />
        <Field label="Repeat Password" password />

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <Row styles={{justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>
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
    fontWeight: 'bold'
  },
  msgButton: {
    fontSize: 18,
    color: colors.primary,
    margin: 12
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    margin: 12
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
});
