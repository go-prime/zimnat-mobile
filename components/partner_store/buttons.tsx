import React from 'react';
import {Text, Pressable, View, StyleSheet, Image, Alert} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faImage,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import constants from '../../constants';
import { useNavigation } from '@react-navigation/native';
import getColors from '../../hooks/colors';

const RoundedSquareButton = function (props) {
  return (
    <Pressable onPress={props.handler}>
      <View style={styles.square}>
        {props.url ? (
          <Image source={{uri: props.url, width: 75, height: 75}} />
        ) : (
          <FontAwesomeIcon icon={faImage} size={30} color={colors.primary} />
        )}
      </View>
      {props.title && (
        <Text style={[styles.text, styles.label]}>{props.title}</Text>
      )}
    </Pressable>
  );
};



type WishListButtonProps = {
  product_id: string;
  product_name: string;
  label: boolean;
  styles: object;
};

type CartButtonProps = {
  product_id: string;
  product_name: string;
  qty: number;
  label: boolean;
  styles: object;
  innerStyles: object;
  onSuccess: Function;
};

const WishListButton = function (props: WishListButtonProps) {

  const defaultHandler = () => {
    axios
      .post(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.add_to_wishlist`,
        {
          product_id: props.product_id,
        },
      )
      .then(res => {
        Alert.alert('Success', `Added ${props.product_name} to wishlist`);
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };

  return (
    <Pressable
        style={props.styles} 
        onPress={props.handler ? props.handler : defaultHandler}>
      <View style={[styles.wishlist, props.innerStyles]}>
        <FontAwesomeIcon
          icon={faHeart}
          size={props.size || 24}
          color={'crimson'}
        />
        {props.label && (
          <Text
            style={{
              color: 'crimson',
              fontSize: 16,
              marginLeft: 4,
              fontWeight: 'bold',
            }}>
            Add to Wishlist
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const AddToCartButton = function (props: CartButtonProps) {
  const navigation = useNavigation()
  const colorScheme = getColors(navigation)
  const defaultHandler = () => {
    axios
      .post(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.add_to_cart`,
        {
          product_id: props.product_id,
          qty: props.qty,
        },
      )
      .then(res => {
        Alert.alert('Success', `Added ${props.product_name} to shopping cart`);
        if (props.onSuccess) {
          onSuccess();
        }
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data);
          Alert.alert('Error', err.response.data);
        }
        console.log(err);
      });
  };
  return (
    <Pressable onPress={props.handler ? props.handler : defaultHandler}>
      <View style={[styles.addToCart, {backgroundColor: colorScheme.secondary}, props.styles]}>
        <FontAwesomeIcon
          icon={faShoppingCart}
          size={props.size || 24}
          color={'white'}
        />
        {props.label && (
          <Text style={{...text, fontSize: 16, marginLeft: 4, color: 'white'}}>
            Add To Cart
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  round: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    ...card,
    ...shadow,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    overflow: 'hidden',
  },
  square: {
    width: 75,
    height: 75,
    borderRadius: 12.5,
    ...shadow,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    overflow: 'hidden',
  },
  rectangle: {
    width: 100,
    overflow: 'hidden',
    height: 150,
    borderRadius: 12.5,
    ...shadow,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  wishlist: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'crimson',
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 4,
    borderRadius: 4,
    flexDirection: 'row',
  },
  addToCart: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 4,
    margin: 4,

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    ...text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
    textAlign: 'center',
  },
  label: {
    width: 75,
    textAlign: 'center',
    marginLeft: 12,
  },
  wide_label: {
    width: 100,
    textAlign: 'center',
    marginLeft: 12,
  },
});

export {
  RoundedSquareButton,
  WishListButton,
  AddToCartButton,
};
