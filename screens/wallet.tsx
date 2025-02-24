import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {card, iconColor, shadow, text} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import {Image} from 'react-native';
import colors from '../styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../components/layout';
import SearchBar from '../components/search';
import ScrollableCard from '../components/dashboard/scrollable_card';

const {width, height} = Dimensions.get('screen');


export default function WalletScreen({navigation}) {

    const billers = [
        { id: 1, image: require('../assets/images/biller1.png') },
        { id: 2, image: require('../assets/images/biller2.png') },
        { id: 3, image: require('../assets/images/biller3.png') },
        { id: 4, image: require('../assets/images/biller4.png') },
        { id: 5, image: require('../assets/images/biller5.png') },
        { id: 6, image: require('../assets/images/biller6.png') },
        ];

    const handleWebUrlPress = () => {
        // Open the website
        Linking.openURL('https://zimnat.co.zw/').catch((err) =>
            console.error('Failed to open URL:', err)
        );
    };

  return (
    <ScrollView>
      <SearchBar />
      <Row styles={{justifyContent: 'center'}}>
        <Pressable
            onPress={() => {
                console.log('pressed');
            }}
            style={styles.shortcut}>
            <View style={styles.shortcutContent}>
                <FontAwesomeIcon icon={faWallet} size={40} color={iconColor} />
                <Text style={styles.shortcutText}>Wallet Services</Text>
            </View>
        </Pressable>

        <Text style={styles.rowText}>
                Balance: 
                <Text style={[styles.rowText, styles.currencyText]}>
                    USD 0.00
                </Text>
            </Text>
      </Row>

      <Row style={{marginBottom: 0, paddingBottom: 0}}>
        <Text style={styles.rowText}>Send/Receive </Text>
     </Row>
    <Row styles={{justifyContent: 'left'}}>
    
    <View style={styles.buttonGrid}>
        {/* First Column */}
        <View style={styles.column}>
        {/* Transfer */}
        <TouchableOpacity style={styles.stackedPill}>
            <Image
            source={require('../assets/icons/send.png')}
            style={styles.icon}
            />
            <Text style={styles.pillText}>Transfer</Text>
        </TouchableOpacity>

        {/* Savings */}
        <TouchableOpacity style={styles.stackedPill}>
            <Image
            source={require('../assets/icons/savings.png')}
            style={styles.icon}
            />
            <Text style={styles.pillText}>Savings</Text>
        </TouchableOpacity>
        </View>

        {/* Second Column */}
        <View style={styles.column}>
        {/* Pay Bills */}
        <TouchableOpacity style={styles.stackedPill}>
            <Image
            source={require('../assets/icons/pay_bills.png')}
            style={styles.icon}
            />
            <Text style={styles.pillText}>Pay Bills</Text>
        </TouchableOpacity>

        {/* Show More Button */}
        <TouchableOpacity
            style={[styles.stackedPill, styles.showMoreButton]}
            onPress={() => Alert.alert('Show More')}>
            <Text style={styles.pillText}>Show More...</Text>
        </TouchableOpacity>
        </View>
    </View>
    
    </Row>
    
    <ScrollableCard label="Pay Bills">
        {/* Clickable Images of Billers */}
        {billers.map((biller) => (
        <TouchableOpacity
            key={biller.id}
            onPress={() => navigation.navigate('BillerDetails', { billerId: biller.id })}
            style={styles.imageContainer}
        >
            <Image source={biller.image} style={styles.image} />
        </TouchableOpacity>
        ))}
    </ScrollableCard>

    <Row styles={{justifyContent: 'center'}}>
        <Pressable
            onPress={() => {
                // goto website
                handleWebUrlPress();
            }}
            style={styles.banner}>
            <View style={styles.shortcutContent}>
                <Image
                    source={require('../assets/images/logo_3.png')}
                    style={styles.bannerImage}
                />
            </View>
        </Pressable>
    </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shortcut: {
    ...card,
    elevation: 5,
    padding: 16,
    borderRadius: 8,
    width: 150,
    height: 100,
  },
  shortcutContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortcutText: {
    ...text,
  },
  rowText: {
    fontSize: 18,
    margin: 18,
    fontWeight: 'bold',
  },
  currencyText: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 20,
  },
  stackedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
    justifyContent: 'center',
    width: '100%',
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
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width - 20
},
column: {
  width: '48%'
},
showMoreButton: {
    backgroundColor: '#f0f0f0'
},
imageContainer: {
    width: width / 2.5 - 24,
    height: width / 3 - 24,
    marginRight: 1,
    marginLeft: 1,
    borderRadius: 8,
    overflow: 'scroll'
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 30
  },
  bannerImage: {
    width: width - 20,
    height: height/20,
    marginBottom: 10,
  },
  banner: {
    backgroundColor: 'lightgrey',
    paddingTop: 15,
    paddingBottom: 15,
    width: width - 80,
    borderRadius: 10,
  }
});