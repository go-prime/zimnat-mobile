import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable
} from 'react-native';
import Loading from '../../components/loading';
import { Title } from '../../components/text';
import ImageIcon from '../../components/image';
import { Image } from 'react-native';
import { faChartPie, faClock, faEdit, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecentScreen from './recents';
import FormScreen from './form';
import InsightScreen from './insights';
import ShortcutScreen from './shortcuts';
import ListScreen from './list';


const Stack = createNativeStackNavigator();

export default function BooksHomeScreen({navigation}): JSX.Element {
  navigation.setOptions({headerShown: false})
  return (
    <>
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerShadowVisible: false,
      headerTintColor: 'white',
      headerRight: () => (
        <Pressable onPress={() => {
          console.log('pressed')
          navigation.navigate('Home')
        }}>
          <FontAwesomeIcon icon={faReply} size={28} color='white' />
        </Pressable>
      )
    }}>
      <Stack.Screen component={ShortcutScreen} name="Quick Links"></Stack.Screen>
      <Stack.Screen component={RecentScreen} name="Recents"></Stack.Screen>
      <Stack.Screen component={InsightScreen} name="Insights"></Stack.Screen>
      <Stack.Screen component={ListScreen} name="List"></Stack.Screen>
      <Stack.Screen component={FormScreen} name="Form"></Stack.Screen>

    </Stack.Navigator>
    <View style={styles.footer}>
      <Pressable onPress={() => navigation.navigate("Insights")} style={styles.footerIcon}>
        <FontAwesomeIcon icon={faChartPie} size={28}/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Quick Links")} style={styles.footerIcon}>
        <FontAwesomeIcon icon={faEdit} size={28}/>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Recents")} style={styles.footerIcon}>
        <FontAwesomeIcon icon={faClock} size={28}/>
      </Pressable>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'white',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  footerIcon: {
    flex: 1,
    padding: 24,
    paddingVertical: 16,
    alignItems: 'center'
  }
});
