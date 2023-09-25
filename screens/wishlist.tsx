import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../styles/colors';
import {shadow} from '../styles/inputs';
import axios from 'axios';

import constants from '../constants';
import ImageIcon from '../components/image';
import { AddToCartButton, WishListButton } from '../components/partner_store/buttons';
import Centered from '../components/layout';
import { parse } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const WishlistItem = props => {
  navigator = useNavigation();
  const [qty, setQty] = React.useState(props.qty)

  return (
    <View style={[styles.card, {flexDirection: 'row', padding: 16}]}>
      <Centered styles={{flex: 1}}>
        <ImageIcon
          width={75}
          height={75}
          url={`${constants.server_url}/${props.image}`}
        />
      </Centered>
      <View style={{flex: 2}}>
        <Pressable onPress={() => navigator.navigate(props.doctype, {product_id: props.name})}>
          <Text style={styles.heading}>{props.label}</Text>
        </Pressable>
        <Text>{props.description}</Text>
        <Text style={styles.heading}>
        {props.currency} {parseFloat(props.price).toFixed(2)}
        </Text>
        <AddToCartButton label/>
      </View>
    </View>
  );
};

export default function WishlistScreen(props) {
  const [items, setItems] = React.useState([]);
  const width = Dimensions.get("screen").width;
  
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
        console.log(err.response.data);
      });
  }, []);

  if(!items) {
    return <Loading />
  }

  return (
    <ScrollView>
        {items.length == 0 
            ? <Text>Your wishlist is empty, start shopping! </Text>
            : items.map(item => (
                <WishlistItem key={item.billable_id} {...item} />
            ))
         }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    flex: 1,
    flexWrap: "nowrap"
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 0,
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
