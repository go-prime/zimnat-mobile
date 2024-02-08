import React from 'react';
import axios from 'axios';
import {getAbsoluteURL} from '../utils';
import handleErr from '../scripts/axios';
import { useNavigation } from '@react-navigation/native';

const useWishlistCount = () => {
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const navigator = useNavigation()

  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          '/api/method/billing_engine.billing_engine.api.get_wishlist',
        ),
      )
      .then(res => {
        if (res.data.message && res.data.message.items) {
          setWishlistCount(res.data.message.items.length);
        } else {
          setWishlistCount(0);
        }
      }).catch(err => handleErr(err, navigator));
  }, []);

  return wishlistCount;
};


const useOrderCount = () => {
  const [orderCount, setOrderCount] = React.useState(0);
  const navigator = useNavigation()
  React.useEffect(() => {
      axios
        .get(
          getAbsoluteURL(
            'api/method/billing_engine.billing_engine.api.get_orders',
          ),
        )
        .then(res => {
          // console.log(res.data.message);
        }).catch(err => handleErr(err, navigator))
  }, []);

  return orderCount;
};


const useSalesCount = () => {
  const [salesCount, setSalesCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
         '/api/method/open_marketplace.open_marketplace.api.sales_summary',
        ),
      )
      .then(res => {
        setSalesCount(res.data.message.filter(m => m.status != "Delivered").length)
      });
  });

  return salesCount;
};



const useCartCount = () => {
  const [cartCount, setCartCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          '/api/method/billing_engine.billing_engine.api.get_cart',
        ),
      )
      .then(res => {
        if (res.data.message && res.data.message.items) {
          setCartCount(res.data.message.items.length);
        } else {
          setCartCount(0);
        }
      });
  });

  return cartCount;
};

export {useCartCount, useWishlistCount, useOrderCount, useSalesCount};
