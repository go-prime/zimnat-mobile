import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import colors from '../styles/colors';

export default function Loading(props) {
  return (
    <View
      style={[
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
        props.styles || {},
      ]}>
      <ActivityIndicator color={colors.primary} size={48} />
      <Text style={{color: colors.primary, textAlign: 'center', fontSize: 24}}>
        {props.msg ? props.msg : "Loading Content..."}
      </Text>
    </View>
  );
}
