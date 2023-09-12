import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import { shadow } from '../styles/inputs';
import colors  from '../styles/colors';

export default function FloatingBtn(props) {
  return (
    <Pressable 
        onPress={props.onPress}
    >
        <View style={styles.container}>
        {props.children}
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 75,
        height: 75,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        ...shadow,
        backgroundColor: colors.primary,
    }
})