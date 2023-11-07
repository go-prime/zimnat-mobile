import React from 'react';

import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {SubTitle} from '../../../components/text';
import Field from '../../../components/form';
import {
  useCameraPermission,
  useCodeScanner,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../styles/colors';

export default ConfirmSaleScreen = props => {
  const {width, height} = Dimensions.get('screen');
  const [verificationID, setVerificationID] = React.useState('');
  const {hasPermission, requestPermission} = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      
    },
  });

  const device = useCameraDevice('back');

  return (
    <View style={{flex: 1}}>
      <SubTitle>Scan To Confirm</SubTitle>
      {hasPermission && (
        <Camera
          isActive
          style={{width: width, height: height / 3}}
          device={device}
          {...props}
          codeScanner={codeScanner}
        />
      )}
      <View>
        <SubTitle>Or, Enter Verification Code</SubTitle>
        <Field
          label={'Enter Order ID'}
          value={verificationID}
          onTextChange={setVerificationID}
        />
        <Pressable style={styles.button}>
            <FontAwesomeIcon icon={faQrcode} size={24} color={'white'} />
            <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
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
        marginLeft: 12
    }
});
