import React from 'react';
import {View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faImage, faUser} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';
import { getAbsoluteURL } from '../utils';

export default function ImageIcon(props) {
  return (
    <View style={props.styles}>
      {props.url && props.url.indexOf("private/") == -1 ? (
        <Image
          source={{uri: getAbsoluteURL(props.url), width: props.width, height: props.height}}
          style={{resizeMode: 'cover',}}
          alt={"No_image"}
        />
      ) : (
        <FontAwesomeIcon
          icon={props.icon ? props.icon : faImage}
          size={props.height}
          color={props.iconColor ? props.iconColor : colors.primary}
        />
      )}
    </View>
  );
}
