import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import getColors from '../hooks/colors'

export default function Loading(props) {
  const navigation = useNavigation()
  const colorScheme = getColors(navigation)
  return (
    <View
      style={[
        {flex: 1, justifyContent: 'center', alignItems: 'center'},
        props.styles || {},
      ]}>
      <ActivityIndicator color={colorScheme.primary} size={48} />
      <Text style={{color: colorScheme.primary, textAlign: 'center', fontSize: 24}}>
        {props.msg ? props.msg : "Loading Content..."}
      </Text>
    </View>
  );
}
