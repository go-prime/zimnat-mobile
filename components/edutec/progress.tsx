import React from 'react';
import {View, StyleSheet} from 'react-native';;
import colors from '../../styles/colors';

export default function ProgressBar(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, {width: `${props.progress}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: 5,
    width: '100%',
    borderRadius: 2.5,
    marginLeft: 5,
    marginRight: 5
  },
  bar: {
    backgroundColor: colors.primary,
    height: '100%',
    borderRadius: 2.5,
  },
})
