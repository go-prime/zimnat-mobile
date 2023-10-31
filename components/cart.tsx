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


  return (
    <Centered>
      <Row styles={{alignItems: 'center'}}>
        <Pressable onPress={() => setQty(qty > 1 ? qty - 1 : 0)}>
          <View style={[styles.button, {borderColor: colorScheme.primary}]}>
            <FontAwesomeIcon icon={faMinus} size={28} color={colorScheme.primary} />
          </View>
        </Pressable>
        <View>
          <Text style={[styles.count, {color: colorScheme.primary}]}>{qty}</Text>
        </View>
        <Pressable onPress={() => setQty(qty + 1)}>
          <View style={[styles.button, {borderColor: colorScheme.primary}]}>
            <FontAwesomeIcon icon={faPlus} size={28} color={colorScheme.primary} />
          </View>
        </Pressable>
      </Row>
    </Centered>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    ...card,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  count: {
    fontWeight: 'bold',
    padding: 6,
    fontSize: 28,
    marginHorizontal: 12,
  },
});
