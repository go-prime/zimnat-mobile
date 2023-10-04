import React from 'react';

import {View, Text, StyleSheet, Pressable} from 'react-native';
import ImageIcon from '../image';
import {card, shadow, text} from '../../styles/inputs';
import constants from '../../constants';

export default function CategoryPill(props) {
    const width = 44 + 12 + 22 + (props.name.length * 12)

  return (
    <Pressable onPress={props.onPress} style={[styles.container, {width: width}]}>
      <View style={styles.imageContainer}>
      <ImageIcon url={`${constants.server_url}${props.image}`} width={44} height={44} />
      </View>

      <View style={styles.labelContainer} >
        <Text style={styles.label}>{props.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...card,
    height: 44,
    borderRadius: 22,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingLeft: 11,
    elevation: 5,
    ...shadow,
    margin: 12
  },
  label: {
    ...text,
    fontSize: 20,

  },
  labelContainer: {
    justifyContent: 'center',
    height: 44,
    paddingLeft: 12

  },
  imageContainer: {
    width: 44,
    height: 44, 
    borderRadius: 22
  }
});
