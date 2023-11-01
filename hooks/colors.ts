import React from 'react';
import colors, {
  marketplace_colors,
  partner_colors,
  edutec_colors,
} from '../styles/colors';

const screens = {
  Login: colors,
  Wishlist: colors,
  Cart: colors,
  Profile: colors,
  Search: colors,
  Subscriptions: colors,
  Subscription: colors,
  WebView: colors,
  'Produce Category': marketplace_colors,
  Home: partner_colors,
  Partner: partner_colors,
  Bundle: partner_colors,
  Product: partner_colors,
  Category: partner_colors,
  'Courses Home': edutec_colors,
  'Course Category': edutec_colors,
  Course: edutec_colors,
  Video: edutec_colors,
  Article: edutec_colors,
  'My Course Subscriptions': edutec_colors,
  'Marketplace Home': marketplace_colors,
  'Add Inventory': marketplace_colors,
  'Add Produce': marketplace_colors,
  'Manage Inventory': marketplace_colors,
  'Manage Storefront': marketplace_colors,
  'Manage Sales': marketplace_colors,
  Produce: marketplace_colors,
  Storefront: marketplace_colors,
  Books: colors,
};

export default getColors = (navigation) => {

    const state = navigation.getState();
    if (state && state.history && state.history.length) {
      const length = state.history.length;
      const index = length - 1;
      const route = state.history[state.history.length - 1];
      let route_name = '';
      if (route) {
        route_name =
          route.key && route.key.split ? route.key.split('-')[0] : '';
      }

      return(screens[route_name] || colors);
    } 
    return colors
}
