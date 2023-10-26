import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {card, shadow, text} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native-svg';
import colors from '../styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faHouse,
  faSave,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../components/layout';
import {useIsFocused} from '@react-navigation/native';
import ImageIcon from '../components/image';
import { Heading } from '../components/text';

const onSave = (fullname, phone, address, email) => {
  axios
    .post(
      `${constants.server_url}/api/method/billing_engine.billing_engine.api.update_client_details`,
      {
        full_name: fullname,
        email: email,
        phone: phone,
        address: address,
      },
    )
    .then(res => {
      console.log(res.data.message);
      Alert.alert('Success', 'Updated your details successfully');
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
      }
      Alert.alert('Error', 'Something went wrong');
    });
};

export default function ProfileScreen({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = React.useState('');
  const [fullname, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.client_detail`,
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
        setFullName(res.data.message.full_name);
        setPhone(res.data.message.phone);
        setEmail(res.data.message.email);
        setAddress(res.data.message.address);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [isFocused]);

  return (
    <ScrollView>
      <Centered>
        <View style={styles.round}>
          {data.photo ? <ImageIcon url={`${constants.server_url}${data.photo}`} width={175} height={175} /> :<FontAwesomeIcon icon={faUser} size={72} color={colors.primary} />}
        </View>
      </Centered>
      <Heading heading="User Details" />
      <View style={styles.inputContainer}>
        <TextInput
          value={fullname}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={'black'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor={'black'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'black'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholder="Address"
          numberOfLines={4}
          placeholderTextColor={'black'}
        />
      </View>
      <Pressable
        onPress={() => onSave(fullname, phone, address, email)}
        style={styles.save}>
        <FontAwesomeIcon
          icon={faSave}
          color={'white'}
          size={24}
          style={{marginRight: 12}}
        />
        <Text style={styles.tierText}>Save Changes</Text>
      </Pressable>
      <Heading heading="My Subscriptions" />
        <View style={styles.tier}>
          <Text style={styles.tierText}>{data.subscription ? data.subscription.subscription_type : "Hustle Shopper"}</Text>
        </View>
        <Pressable style={styles.upgrade} onPress={() => { navigation.navigate("Subscriptions")}}>
          <FontAwesomeIcon icon={faArrowUp} color={'white'} />
          <Text style={[styles.tierText, {marginLeft: 8}]}>Upgrade</Text>
        </Pressable>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tier: {
    padding: 12,
    backgroundColor: colors.primary,
    margin: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgrade: {
    padding: 8,
    backgroundColor: colors.secondary,
    width: 120,
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  save: {
    padding: 12,
    backgroundColor: colors.tertiary,
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tierText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    padding: 4,
    ...card,
    margin: 8,
    borderRadius: 8,
  },
  input: {
    ...text,
    fontSize: 18,
    textAlignVertical: 'top',
  },
  round: {
    margin: 24,
    ...card,
    justifyContent: 'center',
    alignItems: 'center',
    height: 175,
    width: 175,
    borderRadius: 87.5,
    overflow: "hidden",
    padding: 0
  },
  container: {
    height: 150,
    borderRadius: 12,
    ...shadow,
    elevation: 5,
    margin: 12,
    padding: 12,
  },
  title: {
    fontSize: 24,
    padding: 8,
    ...text,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    padding: 8,
    ...text,
    fontWeight: 'bold',
  },
  tagLine: {
    fontSize: 18,
    ...text,
  }
});
