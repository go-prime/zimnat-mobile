/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreenNavigator from './screens/navigator';
import {Appearance} from 'react-native';
import ChatButton from './components/chat';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#DFF6FF',
  },
};

const NightTheme = {
  ...DarkTheme,
};

function App(): JSX.Element {
  const [chatVisible, setChatVisible] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState('');
  const navContainerRef = useNavigationContainerRef();

  React.useEffect(() => {
    navContainerRef.addListener('state', e => {
      if (e.data.state.history.length) {
        const length = e.data.state.history.length;
        const index = length - 1;
        const route = e.data.state.history[e.data.state.history.length - 1];
        let route_name = '';
        if (route) {
          route_name = route.key && route.key.split ? route.key.split('-')[0] : '';
        }

        setChatVisible(route_name != 'Login');
        setCurrentRoute(route_name);
      }
    });
  }, []);

  return (
    <NavigationContainer
      ref={navContainerRef}
      theme={Appearance.getColorScheme() === 'dark' ? NightTheme : LightTheme}>
      <HomeScreenNavigator />
      <ChatButton visible={chatVisible} route={currentRoute} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
