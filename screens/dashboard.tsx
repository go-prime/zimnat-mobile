import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Alert,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native';
import {card, shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Centered, {Row} from '../components/layout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faLock,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-native-reanimated-carousel';


import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getAbsoluteURL} from '../utils';
import Geolocation from 'react-native-geolocation-service';
import { LoadingButton } from '../components/button';
import { FormattedMessage } from 'react-intl';
import ScrollableCard from '../components/dashboard/scrollable_card';
import SearchBar from '../components/search';
import { Heading } from '../components/text';

const DashboardCard = props => {
  const animated = new Animated.Value(1);
  const onPressIn = () => {
    console.log('animating')
    Animated.timing(animated, {
      
      toValue: 0.2,
      duration: 1000,
      useNativeDriver: true,
    });
  };

  const onPressOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
  };
  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => {
        props.handler();
      }}>
      <Animated.View style={{...styles.container, opacity: animated}}>
        <Centered>
          <Image
            source={props.source}
            style={{width: props.width, height: props.height, marginBottom: 18}}
          />
        </Centered>
        <View style={styles.loginText}>
          <Text style={styles.title}><FormattedMessage id={props.title} /></Text>
          <Text style={styles.subtitle}><FormattedMessage id={props.message} /></Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default function DashboardScreen({navigation, hustleEnabled}) {
  const {width, height} = Dimensions.get('screen');
  const [username, setUsername] = React.useState(null);
  const isFocused = useIsFocused();
  const [loggingOut, setLoggingOut] = React.useState(false)
  React.useEffect(() => {
    AsyncStorage.getItem('expiry').then(expiry => {
      if (expiry && new Date() < new Date(expiry)) {
        AsyncStorage.getItem('user').then(user => {
          setUsername(user);
        });
      } else {
        setUsername(null);
      }
    });
  }, [isFocused]);

  logOut = () => {
    setLoggingOut(true)
    Geolocation.getCurrentPosition(position => {
      axios
        .post(
          getAbsoluteURL('/api/method/logout'),
          {},
          {
            headers: {
              'fine-location': JSON.stringify(position.coords),
            },
          },
        )
        .then(res => {
          AsyncStorage.setItem('expiry', '');
          AsyncStorage.setItem('user', '');
          AsyncStorage.setItem('location', JSON.stringify(position.coords));
          AsyncStorage.setItem('location-last-fetch', new Date().toISOString());
          setUsername(null);
          Alert.alert('Success', 'Signed out of your account successfully.');
          setLoggingOut(false)
          // navigation.navigate("Login")
        })
        .catch(err => {
          Alert.alert('Error', 'Failed to sign out of your account.');
          AsyncStorage.setItem('user', '');
          AsyncStorage.setItem('expiry', '');
          setLoggingOut(false)
          // navigation.navigate("Login")
        });
    });
  };

  return (
    <ScrollView>
      <Heading heading="Zimnat App" />

      <SearchBar />
      <View>
        {username && (
          <>
            <Row styles={{justifyContent: 'left'}}>
              {/* Partner Carousel Here */}
              <Carousel
                loop
                width={width /1.8 - 48}
                height={height / 5 - 12}
                autoPlay={true}
                data={[
                  { id: 1, image: require('../assets/images/partner1.png') },
                  { id: 2, image: require('../assets/images/partner2.png') },
                  { id: 3, image: require('../assets/images/partner3.png') },
                ]}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                  <View style={{ alignItems: 'left', padding: 20 }}>
                    <Image
                      source={item.image}
                      style={{ width: 150, height: 100, resizeMode: 'contain', paddingTop: 10 }}
                    />
                  </View>
                )}
              />

            <DashboardCard
                title="Hero Service"
                message="Hero Service."
                source={require('../assets/images/wallet.png')}
                handler={() => console.log('Hero Service')}
                width={width / 2 - 60}
                height={height / 8 - 12}
              />
            </Row>


              
            <ScrollableCard label="Popular Products">
              <DashboardCard
                title="Product 1"
                message="Details"
                source={require('../assets/images/box.png')}
                handler={() => console.log('Product 1')}
                width={width / 4 - 16}
                height={height / 8 - 40}
                style={{marginBottom: 10}}
              />
              
              <DashboardCard
                title="Product 2"
                message="Details"
                source={require('../assets/images/box.png')}
                handler={() => console.log('Product 2')}
                width={width / 4 - 16}
                height={height / 8 - 40}
                style={{marginBottom: 10}}
              />
              
              <DashboardCard
                title="Product 3"
                message="Details"
                source={require('../assets/images/box.png')}
                handler={() => console.log('Product 3')}
                width={width / 4 - 16}
                height={height / 8 - 40}
                style={{marginBottom: 10}}
              />
            </ScrollableCard>

            {/* Services */}
            <Row>
              <DashboardCard
                title="Wallet Services"
                message="Wallet"
                source={require('../assets/images/wallet.png')}
                handler={() => navigation.navigate("Wallet")}
                width={width / 2 - 48}
                height={height / 8 - 12}
              />
              {/* Pill functions */}
              <View style={{ flexDirection: 'column', alignItems: 'center', height:height / 8 - 12 }}>
                {/* Transfer */}
                <TouchableOpacity style={styles.stackedPill}>
                  <Image source={require('../assets/icons/send.png')} style={styles.icon} />
                  <Text style={styles.pillText}>Transfer</Text>
                </TouchableOpacity>

                {/* Pay Bills */}
                <TouchableOpacity style={styles.stackedPill}>
                  <Image source={require('../assets/icons/pay_bills.png')} style={styles.icon} />
                  <Text style={styles.pillText}>Pay Bills</Text>
                </TouchableOpacity>

                {/* Savings */}
                <TouchableOpacity style={styles.stackedPill}>
                  <Image source={require('../assets/icons/savings.png')} style={styles.icon} />
                  <Text style={styles.pillText}>Savings</Text>
                </TouchableOpacity>
              </View>
            </Row>

            
            {hustleEnabled && (        
              <Row>                
                <DashboardCard
                  title="market"
                  message="shop"
                  source={require('../assets/images/marketplace.png')}
                  handler={() => navigation.navigate("Marketplace Home")}
                  width={width / 2 - 48}
                  height={height / 5 - 12}
                />
                <DashboardCard
                  title="partner_store"
                  message="equip"
                  source={require('../assets/images/partner_store.png')}
                  handler={() => navigation.navigate("Home")}
                  width={width / 2 - 48}
                  height={height / 5 - 12}
                />
              </Row>
            )}
            {hustleEnabled && (     
            <Row>
              <DashboardCard
                title="edutec"
                source={require('../assets/images/edutec.png')}
                message="skills"
                handler={() => navigation.navigate("Courses Home")}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
              
              <DashboardCard
                title="business_books"
                source={require('../assets/images/books.png')}
                message="funds"
                handler={() => {
                  navigation.navigate("Books")
                }}
                width={width / 2 - 48}
                height={height / 5 - 12}
              />
            </Row>
            )}
          </>
        )}
      </View>
      {/* <Centered>
        {username && (
          <LoadingButton style={styles.pill} loading={loggingOut} onPress={logOut}>
            <Row >
              <FontAwesomeIcon
                icon={faDoorOpen}
                color={colors.primary}
                size={24}
              />
              <Text style={styles.signIn}>{'  '} Log Out</Text>
            </Row>
          </LoadingButton>
        )}
      </Centered> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    ...shadow,
    elevation: 5,
    margin: 12,
    backgroundColor: 'white',
    padding: 12,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
  },
  loginText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  welcome: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    margin: 12,
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    margin: 36,
    textShadowColor: 'black',
    textShadowRadius: 0.5,
    color: 'white',
  },
  tagLine: {
    fontSize: 18,
    color: 'white',
  },
  signIn: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 18,
  },
  pill: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 18,
    paddingLeft: 40,
    paddingRight: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonRow: {
    gap: 12,
    padding: 12,
  },
  inputContainer: {
    padding: 4,
    ...card,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
    elevation: 5,
  },
  signInCard: {
    marginTop: 48,
  },
  inputText: {
    color: 'black',
    flex: 1,
  },
  stackedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
    justifyContent: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  pillText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 8,
  }
});
