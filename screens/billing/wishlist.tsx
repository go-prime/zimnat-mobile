import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import {shadow, text} from '../../styles/inputs';
import axios from 'axios';

import constants from '../../constants';
import ImageIcon from '../../components/image';
import {AddToCartButton} from '../../components/partner_store/buttons';
import Centered from '../../components/layout';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loading from '../../components/loading';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShoppingBasket, faTimes} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import {removeBtn} from '../../styles/buttons';
import { SubTitle } from '../../components/text';

const removeFromWishlist = (product_id, product_name, onSuccess) => {
  axios
    .post(
      `${constants.server_url}/api/method/billing_engine.billing_engine.api.remove_from_wishlist`,
      {
        product_id: product_id,
      },
    )
    .then(res => {
      Alert.alert('Success', `Removed ${product_name} from wishlist`);
      if (onSuccess) {
        onSuccess('remove');
      }
    })
    .catch(err => {
      Alert.alert('Error', err.message);
    });
};

const WishlistItem = props => {
  navigator = useNavigation();

  return (
    <View style={[styles.card, {flexDirection: 'row', padding: 16}]}>
      <Centered styles={{flex: 1, position: 'relative'}}>
        <Pressable
          style={removeBtn}
          onPress={() =>
            removeFromWishlist(props.id, props.name, props.onChange)
          }>
          <FontAwesomeIcon icon={faTimes} size={30} color={'white'} />
        </Pressable>
        <ImageIcon
          width={100}
          height={100}
          url={`${constants.server_url}/${props.image}`}
        />
      </Centered>
      <View style={{flex: 2}}>
        <Pressable
          onPress={() => {
            // TODO implement routing to cart item
          }}>
          <SubTitle>{props.label}</SubTitle>
        </Pressable>
        <SubTitle>{props.formatted}</SubTitle>
        <AddToCartButton
          label
          qty={1}
          product_id={props.id}
          product_name={props.name}
          onSuccess={() => props.onChange('add')}
        />
      </View>
    </View>
  );
};

export default function WishlistScreen(props) {
  const [items, setItems] = React.useState([]);
  const [actions, setActions] = React.useState([]);
  const isFocused = useIsFocused();

  const onChange = (action: string) => {
    setActions(actions.concat([action]));
  };

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}api/method/billing_engine.billing_engine.api.get_wishlist`,
      )
      .then(res => {
        console.log(res.data.message.items);
        setItems(res.data.message.items);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused, actions]);

  if (!items) {
    return <Loading />;
  }

  if (items.length == 0) {
    return (
      <Centered style={{flex: 1, flexDirection: 'column'}}>
        <Text style={styles.title}>
          Your wish list is empty, start shopping!
        </Text>
        <FontAwesomeIcon
          icon={faShoppingBasket}
          size={72}
          color={colors.primary}
        />
      </Centered>
    );
  }

  return (
    <ScrollView>
      {items.map(item => (
        <WishlistItem onChange={onChange} key={item.id} {...item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    flex: 1,
    flexWrap: 'nowrap',
  },
  title: {
    fontSize: 24,
    ...text,
    fontWeight: 'bold',
    paddingBottom: 0,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    paddingBottom: 4,
    color: '#666',
    fontWeight: 'bold',
  },
  description: {
    color: 'black',
    padding: 12,
  },
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
});
