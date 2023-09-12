import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { faUser} from '@fortawesome/free-solid-svg-icons';
import { shadow } from '../styles/inputs';
import HomeScreen from './partner_store/home';

const Drawer = createDrawerNavigator();

export default function HomeScreenNavigator({navigation}): JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{headerRight: () => <FontAwesomeIcon icon={faUser} size={28} style={{marginRight: 16}} />}}>
      <Drawer.Screen component={HomeScreen} name="Home" />
    </Drawer.Navigator>
  );
}
