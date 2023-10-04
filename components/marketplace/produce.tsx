import React from 'react';

import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import ImageIcon from '../image';
import {card} from '../../styles/inputs';
import constants from '../../constants';

export default function ProduceCard(props) {
  const width = Dimensions.get('window').width;
  const cardWidth = (width - 78) / 2
  return (
    <Pressable onPress={props.onPress} style={[styles.container, {width: cardWidth}]}>
      <ImageIcon
        styles={{position: 'absolute'}}
        width={cardWidth}
        height={200}
        url={`${constants.server_url}${props.image}`}
        alt={props.name}
        bordered={true}
        rounded={true}
        shadowed={true}
      />
      {props.category && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{props.category}</Text>
        </View>
      )}
      <Text>{props.price}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...card,
    borderRadius: 12,
    height: 200,
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  categoryContainer: {
    padding: 2,
    paddingLeft: 6,
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 12,
  },
  categoryText: {
    color: 'black',
    fontSize: 14,
  },
  name: {
    fontSize: 18,
    padding: 4,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'absolute',
    zIndex: 10,
    bottom: 12,
    left: 12,
  },
});
