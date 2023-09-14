import React from 'react';
import {View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';


export default function ImageIcon(props) {
  return (
    <View>
      {props.url ? (
        <Image source={{uri: props.url, width: props.width, height: props.height}} />
      ) : (
        <FontAwesomeIcon icon={faImage} size={props.height} color={colors.primary} />
      )}
    </View>
  );
}

