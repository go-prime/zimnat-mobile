import React from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import Loading from '../../components/loading';
import {Title} from '../../components/text';
import ImageIcon from '../../components/image';
import {Image} from 'react-native';
import {
  faChartPie,
  faClock,
  faEdit,
  faLightbulb,
  faReply,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RecentScreen from './recents';
import FormScreen from './form';
import InsightScreen from './insights';
import ShortcutScreen from './shortcuts';
import ListScreen from './list';
import ReportScreen from './report';
import ReportListScreen from './report_list';

const Stack = createNativeStackNavigator();

export default function BooksHomeScreen({navigation}): JSX.Element {
  navigation.setOptions({headerRight: () => <View />});
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}>
        <Stack.Screen component={ShortcutScreen} name="Quick Links" />
        <Stack.Screen component={RecentScreen} name="Recents" />
        <Stack.Screen component={InsightScreen} name="Insights" />
        <Stack.Screen component={ListScreen} name="List" />
        <Stack.Screen component={FormScreen} name="Form" />
        <Stack.Screen component={ReportScreen} name="Report" />
        <Stack.Screen component={ReportListScreen} name="Report List" />
      </Stack.Navigator>
      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('Insights')}
          style={styles.footerIcon}>
          <FontAwesomeIcon icon={faLightbulb} size={28} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Report List')}
          style={styles.footerIcon}>
          <FontAwesomeIcon icon={faChartPie} size={28} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Quick Links')}
          style={styles.footerIcon}>
          <FontAwesomeIcon icon={faEdit} size={28} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Recents')}
          style={styles.footerIcon}>
          <FontAwesomeIcon icon={faClock} size={28} />
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
    alignItems: 'center',
  },
  footerIcon: {
    flex: 1,
    padding: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
