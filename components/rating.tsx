import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar, faStarHalf, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';


export default function Rating(props) {
  const fullStars = Math.floor(props.value);
  const halfStar = props.value - fullStars > 0;

  return (
    <View style={styles.container}>
      {new Array(fullStars).fill(0).map((_, i) => (
        <FontAwesomeIcon icon={faStar}  size={props.size} color={'#FFA41C'} />
      ))}
      {halfStar && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          size={props.size}
          color={'#FFA41C'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
  },
});
