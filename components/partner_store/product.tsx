import React from 'react';
import {Text, Pressable, View, StyleSheet, Image} from 'react-native';
import colors from '../../styles/colors';
import {shadow} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faImage,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {WishListButton, AddToCartButton} from './buttons';

const SquareProductButton = function (props) {
  const navigator = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() => {
          navigator.navigate('Product', {product: props.id});
        }}>
        <View style={styles.square}>
          {props.url ? (
            <Image
              source={{uri: props.url, width: 40, height: 40, zIndex: 1}}
            />
          ) : (
            <FontAwesomeIcon icon={faImage} size={30} color={colors.primary} />
          )}
          {props.price && (
            <View style={styles.price}>
              <Text style={styles.text}>{props.price}</Text>
            </View>
          )}
        </View>
        {props.name && (
          <View style={styles.productName}>
            <Text style={styles.text}>{props.name}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: 100,
    gap: 4,
    padding: 4,
    justifyContent: 'space-between',
  },
  wishlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
    padding: 4,
    borderRadius: 4,
  },
  addToCart: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 4,
    alignItems: 'center',
    borderRadius: 4,
  },
  square: {
    width: 100,
    height: 150,
    borderRadius: 12.5,
    backgroundColor: 'white',
    ...shadow,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  price: {
    zIndex: 100,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: 4,
    fontWeight: 'bold',
  },
  productName: {
    width: 100,
    marginLeft: 12
  }
});

export {SquareProductButton};
