import React from 'react';
import {View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';

export default function ImageIcon(props) {
  console.log(props.url);
  return (
    <View style={props.styles}>
      {props.url ? (
        <Image
          source={{uri: props.url, width: props.width, height: props.height}}
          style={{resizeMode: 'cover',}}
        />
      ) : (
        <FontAwesomeIcon
          icon={faImage}
          size={props.height}
          color={colors.primary}
        />
      )}
    </View>
  );
}
