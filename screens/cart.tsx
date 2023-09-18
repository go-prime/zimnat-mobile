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

import Centered from '../components/layout';
import {parse} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBasketShopping, faTrash, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/loading';

const CartItem = props => {
  const navigator = useNavigation();
  const [qty, setQty] = React.useState(props.qty)

  return (
    <View style={[styles.card, {flexDirection: 'row', padding: 16}]}>
      <Centered styles={{width: 40}}>
        <FontAwesomeIcon icon={faTrash} size={24} color={'crimson'} />
      </Centered>
      <Centered styles={{flex: 1}}>
        <ImageIcon
          width={75}
          height={75}
          url={`${constants.server_url}/${props.image}`}
        />
      </Centered>
      <View style={{flex: 2}}>
        <Pressable
          onPress={() =>
            navigator.navigate(props.doctype, {
              product_id: props.name,
            })
          }>
          <Text style={styles.heading}>{props.label}</Text>
        </Pressable>
        <Text>{props.description}</Text>
        <Text style={[styles.heading, {textAlign: 'right'}]}>
          {props.currency} {parseFloat(props.price).toFixed(2)}
        </Text>
        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
          <Pressable onPress={() => setQty(qty > 1 ? qty - 1 : 0)}>
            <View style={styles.button}>
              <FontAwesomeIcon icon={faMinus} size={24} color={'white'} />
            </View>
          </Pressable>
          <View>
            <Text style={styles.qty}>{qty}</Text>
          </View>
          <Pressable onPress={() => setQty(qty + 1)}>
            <View style={styles.button}>
              <FontAwesomeIcon icon={faPlus} size={24} color={'white'} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default function CartScreen(props) {
  const [data, setData] = React.useState([]);
  const width = Dimensions.get('screen').width;

  const checkout = () => {

  }

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}api/method/billing_engine.billing_engine.api.get_cart`,
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);

  if(!data) {
    return <Loading />
  }

  return (
    <ScrollView>
      {data && data.items ? (
        data.items.length == 0 ? (
          <Text style={styles.heading}>Your shopping cart is empty, start shopping! </Text>
        ) : (
          data.items.map(item => <CartItem key={item.billable_id} {...item} />)
        )
      ) : (
        <Text style={styles.heading}>Loading shopping cart... </Text>
      )}
      {data && (
        <View style={[styles.card, {padding: 16}]}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Subtotal</Text>
            <Text style={styles.title}>{parseFloat(data.subtotal).toFixed(2)}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Tax</Text>
            <Text style={styles.title}>{parseFloat(data.tax).toFixed(2)}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Total</Text>
            <Text style={styles.title}>{data.currency} {parseFloat(data.total).toFixed(2)}</Text>
          </View>
        </View>
      )}
      <Pressable onPress={checkout}>
        <View style={styles.checkoutButton}>
            <FontAwesomeIcon icon={faBasketShopping} size={24} color="white" />
            <Text style={styles.checkoutText}>Checkout</Text>
        </View>
      </Pressable>
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 4,
    flex: 1,
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
    backgroundColor: 'white',
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
  button: {
    padding: 6,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  qty: {
    fontSize: 18,
    padding: 6,
    color: 'black',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 6,
  },
  checkoutText: {
    fontSize: 18,
    marginLeft: 12,
    color: 'white',
    fontWeight: 'bold',
  
  }
});
