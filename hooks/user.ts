import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constants from '../constants';

const useUserProfile = () => {
  const [username, setUserName] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState({});

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      setUserName(user);
    });
  }, []);

  React.useEffect(() => {
    if (!username) return;
    axios
      .get(
        `${constants.server_url}api/method/billing_engine.billing_engine.api.client_detail`,
      )
      .then(res => {
        console.log(res.data)
        setUserDetails(res.data.message);
      });
  }, [username]);

  return userDetails;
};

export default useUserProfile;
