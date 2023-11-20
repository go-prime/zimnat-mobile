import React from 'react';

import {View, Pressable, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import colors from '../styles/colors';
import Centered, {Row} from './layout';
import {card} from '../styles/inputs';
import {useNavigation} from '@react-navigation/native';
import getColors from '../hooks/colors';

export default CartCounter = ({qty, setQty}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);


  const counterStyle = {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colorScheme.primary,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 8
  }

  return (
    <Centered>
      <Row styles={counterStyle}>
        <Pressable onPress={() => setQty(qty > 1 ? qty - 1 : 0)}>
          <View style={[styles.button]}>
            <FontAwesomeIcon icon={faMinus} size={18} color={colorScheme.primary} />
          </View>
        </Pressable>
        <View>
          <Text style={[styles.count, {color: colorScheme.primary}]}>{qty}</Text>
        </View>
        <Pressable onPress={() => setQty(qty + 1)}>
          <View style={[styles.button, {borderColor: colorScheme.primary}]}>
            <FontAwesomeIcon icon={faPlus} size={18} color={colorScheme.primary} />
          </View>
        </Pressable>
      </Row>
    </Centered>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    ...card,
  },
  buttonText: {
    color: 'white',
  },
  count: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 24,
    marginHorizontal: 12,
  },
});
