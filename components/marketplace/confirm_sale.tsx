import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import {Heading, Label, SubTitle} from '../text';
import Field, {LinkField} from '../form';
import {
  useCameraPermission,
  useCodeScanner,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQrcode} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import {getAbsoluteURL} from '../../utils';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default ConfirmSale = props => {
  const {width, height} = Dimensions.get('screen');
  const [verificationID, setVerificationID] = React.useState('');
  const [orderID, setOrderID] = React.useState('');
  const {hasPermission, requestPermission} = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      if (codes.length > 0) {
        setVerificationID(codes[0].value);
      }
    },
  });
  const isFocused = useIsFocused();
  const cameraRef = React.useRef(null);


  const onConfirmSale = () => {
    if (!(orderID && verificationID)) {
      Alert.alert(
        'Error',
        'Both an order ID and a Verification ID are needed to confirm a sale',
      );
      return;
    }
    axios
      .post(
        getAbsoluteURL(
          '/api/method/billing_engine.billing_engine.api.confirm_sale',
        ),
        {
          checkout_id: orderID,
          verification_id: verificationID,
        },
      )
      .then(res => {
        console.log(res);
        if (res.data.message && res.data.message.verified) {
          Alert.alert('Success', 'Verified Order successfully');
          setOrderID('');
          setVerificationID(null);
        } else {
          Alert.alert(
            'Invalid',
            'Could not verify the selected order with the ID provided',
          );
        }
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'Failed to submit order for verification because of an error',
        );
      });
  };

  const device = useCameraDevice('back');

  if(!hasPermission) {
    requestPermission()
  }

  return (
    <View>
      <Heading>Confirm Sale</Heading>
      <View>
        <SubTitle>Scan To Confirm</SubTitle>
        {hasPermission && (
          <Camera
            isActive={isFocused}
            style={{width: width, height: height / 3}}
            device={device}
            codeScanner={codeScanner}
            ref={cameraRef}
            photo
          />
        )}
        <View>
          <SubTitle>Or, Enter a Verification Code</SubTitle>
          <Field
            label={'Enter Verification ID'}
            value={verificationID}
            onTextChange={setVerificationID}
          />
          <LinkField
            value={orderID}
            onChange={setOrderID}
            doctype="Checkout"
            label_field={'name'}
            filters={{'status': 'Ordered'}}
            label="Order ID"
          />
          <Pressable onPress={onConfirmSale} style={styles.button}>
            <FontAwesomeIcon icon={faQrcode} size={24} color={'white'} />
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 4,
    flex: 1,
    margin: 12,
    marginTop: 48,
    flexDirection: 'row',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 12,
  },
});