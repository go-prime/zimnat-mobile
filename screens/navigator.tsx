import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { faUser} from '@fortawesome/free-solid-svg-icons';
import { shadow } from '../styles/inputs';
import HomeScreen from './partner_store/home';
import PartnerScreen from './partner_store/partner';
import BundleScreen from './partner_store/bundle';
import ProductScreen from './partner_store/product';
import CategoryScreen from './partner_store/category';
import { Pressable } from 'react-native';

const Drawer = createDrawerNavigator();

export default function HomeScreenNavigator({navigation}): JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{headerRight: () => <Pressable onPress={() => navigation.navigate('Login')} >
        <FontAwesomeIcon icon={faUser} size={28} style={{marginRight: 16}} />
      </Pressable>}}>
      <Drawer.Screen component={HomeScreen} name="Home" />
      <Drawer.Screen component={PartnerScreen} name="Partner" />
      <Drawer.Screen component={BundleScreen} name="Bundle" />
      <Drawer.Screen component={ProductScreen} name="Product" />
      <Drawer.Screen component={CategoryScreen} name="Category" />
      
    </Drawer.Navigator>
  );
}
