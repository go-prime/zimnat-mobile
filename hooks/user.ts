import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constants from '../constants';
import { useNavigation } from '@react-navigation/native';
import {Alert} from 'react-native'

const useUserProfile = () => {
  const [username, setUserName] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState({});
  const navigation = useNavigation()

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        setUserName(user);
      } else {
        // to do handle when no user is found.
        Alert.alert("Session Start Failed", "Please Login again to continue")
        navigation.navigate('Login')
      }
      
    });
  }, []);

  React.useEffect(() => {
    if (!username) return;
    axios
      .get(
        `${constants.server_url}api/method/billing_engine.billing_engine.api.client_detail`,
      )
      .then(res => {
        setUserDetails(res.data.message);
      });
  }, [username]);

  return userDetails;
};

export default useUserProfile;
