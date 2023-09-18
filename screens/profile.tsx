import React from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native-svg';
import colors from '../styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faHouse, faSave, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import Centered, { Row } from '../components/layout';

export default function ProfileScreen({navigation}) {
  return (
    <ScrollView>
      <Centered>
        <View style={styles.round}>
          <FontAwesomeIcon icon={faUser} size={72} color={colors.primary} />
        </View>
      </Centered>
      <Text style={styles.title}>User Details</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Name" placeholderTextColor={"black"} />
      </View>
      <View  style={styles.inputContainer}>
        <TextInput  style={styles.input} placeholder="Phone" placeholderTextColor={"black"}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Address" numberOfLines={4} placeholderTextColor={"black"} />
      </View>
      <Text style={styles.title}>Subscription</Text>
      <Row>
        <View style={styles.tier}>
          <Text style={styles.tierText}>Hustle Shopper</Text>
        </View>
        <View style={styles.upgrade}>
        <FontAwesomeIcon icon={faArrowUp} color={"white"} />
          <Text style={[styles.tierText, {marginLeft: 8} ]}>Upgrade</Text>
        </View>
      </Row>
      <View style={styles.save}>
        <FontAwesomeIcon icon={faSave} color={"white"} size={24} style={{marginRight: 12}} />
        <Text style={styles.tierText}>Save Changes</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    tier: {
        padding: 8,
        backgroundColor: colors.primary,
        width: 200,
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
        fontWeight: "bold",
        color: "white",
    },
  inputContainer: {
    padding: 4,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
  },
  input: {
    color: "black",
    fontSize: 18,
    textAlignVertical: "top"
  },
  round: {
    margin: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
  },
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
    color: 'white',
    padding: 8,
    color: 'black',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    padding: 8,
    color: 'black',
    fontWeight: 'bold',
  },
  tagLine: {
    fontSize: 18,
    color: 'white',
  },
});
