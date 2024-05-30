import React from 'react';
import axios from 'axios';
import {getAbsoluteURL} from '../utils';
import handleErr from '../scripts/axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useWishlistCount = () => {
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const [lastUpdate, setLastUpdate] = React.useState(null);

  const navigator = useNavigation();

  React.useEffect(() => {
    if (lastUpdate && new Date() - lastUpdate < 1000 * 10) {
      return;
    }
    AsyncStorage.getItem('user').then(user => {
      if (!user) {
        console.log('no user')
        return;
      }
      axios
        .get(
          getAbsoluteURL(
            '/api/method/billing_engine.billing_engine.api.get_wishlist',
          ),
        )
        .then(res => {
          setLastUpdate(new Date());
          if (res.data.message && res.data.message.items) {
            setWishlistCount(res.data.message.items.length);
          } else {
            setWishlistCount(0);
          }
        })
        .catch(err => handleErr(err, navigator));
    });
  });

  return wishlistCount;
};

const useCartCount = () => {
  const [cartCount, setCartCount] = React.useState(0);
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const navigator = useNavigation();

  React.useEffect(() => {
    if (lastUpdate && new Date() - lastUpdate < 1000 * 10) {
      return;
    }
    AsyncStorage.getItem('user').then(user => {
      if (!user) {
        return;
      }
      axios
        .get(
          getAbsoluteURL(
            '/api/method/billing_engine.billing_engine.api.get_cart',
          ),
        )
        .then(res => {
          setLastUpdate(new Date());
          if (res.data.message && res.data.message.items) {
            setCartCount(res.data.message.items.length);
          } else {
            setCartCount(0);
          }
        })
        .catch(err => handleErr(err, navigator));
    });
  });

  return cartCount;
};

export {useCartCount, useWishlistCount};
