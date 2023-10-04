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
import colors from '../../styles/colors';
import {shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import Rating from '../../components/rating';
import ImageIcon from '../../components/image';
import Centered, {Row} from '../../components/layout';
import constants from '../../constants';
import {
  faHeart,
  faShoppingCart,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import {
  WishListButton,
  AddToCartButton,
} from '../../components/partner_store/buttons';
import Loading from '../../components/loading';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import {SquareProductButton} from '../../components/partner_store/product';
import {SquareBundleButton} from '../../components/partner_store/bundle';

export default function ProductScreen(props) {
  const [data, setData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const width = Dimensions.get('screen').width;

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_product`,
        {params: {product_id: props.route.params.product}},
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
        if (res.data.message.cover_image) {
          setImg(`${constants.server_url}/${res.data.message.cover_image}`);
        }
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.product]);

  if (!data) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          <ImageIcon width={200} height={150} url={img} />
        </Centered>
      </View>
      <Row styles={{justifyContent: 'center'}}>
        {data.images.map(img => (
          <Pressable
            key={img.name}
            onPress={() => setImg(`${constants.server_url}/${img.url}`)}>
            <ImageIcon
              width={40}
              height={40}
              url={`${constants.server_url}/${img.url}`}
              styles={styles.card}
            />
          </Pressable>
        ))}
      </Row>

      <View style={styles.card}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.mutedHeading}>{data.partner}</Text>
        <Rating
          item_type="Product"
          item_name={props.route.params.product}
          value={data.average_rating}
          size={20}
        />
        <Text style={styles.description}>{data.description}</Text>
      </View>

      <View>
        <View style={styles.row}>
          <Text style={styles.heading}>
            {`${data.currency} ${parseFloat(data.price).toFixed(2)}`}
          </Text>
          <WishListButton
            label={true}
            product_id={data.billable_id}
            product_name={data.name}
            styles={{padding: 12, width: width * 0.6}}
          />
        </View>
        <View style={[styles.row, {gap: 4}]}>
          <View style={styles.row}>
            <Pressable onPress={() => setQty(qty > 1 ? qty - 1 : 0)}>
              <View style={styles.button}>
                <FontAwesomeIcon icon={faMinus} size={24} color={'white'} />
              </View>
            </Pressable>
            <View>
              <Text style={styles.heading}>{qty}</Text>
            </View>
            <Pressable onPress={() => setQty(qty + 1)}>
              <View style={styles.button}>
                <FontAwesomeIcon icon={faPlus} size={24} color={'white'} />
              </View>
            </Pressable>
          </View>
          <AddToCartButton
            qty={qty}
            product_id={data.billable_id}
            product_name={data.name}
            label={true}
            styles={{padding: 12, width: width * 0.6}}
          />
        </View>
        <View>
          <Text style={styles.heading}>Related Products</Text>
          {data.related_products.map(pro => {
            return (
              <SquareProductButton
                key={pro.name}
                name={pro.product_name}
                id={pro.name}
                product_id={pro.billable_id}
                actions={true}
                url={`${constants.server_url}/${pro.cover_image}`}
              />
            );
          })}
        </View>
        <View>
          <Text style={styles.heading}>Courses</Text>
          {data.courses &&
            data.courses.map(c => {
              return (
                <RoundedRectButton
                  key={c.name}
                  title={c.title}
                  subtitle={c.publisher}
                  handler={() => {
                    props.navigation.navigate('Course', {course_id: c.name});
                  }}
                  url={`${constants.server_url}/${c.cover_image}`}
                />
              );
            })}
        </View>
        <View>
          <Text style={styles.heading}>Bundles</Text>
          {data.bundles.map(bun => {
            return (
              <SquareBundleButton
                key={bun.billable_id}
                name={bun.bundle_name}
                id={bun.name}
                url={`${constants.server_url}${bun.cover_image}`}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  title: {
    fontSize: 24,
    padding: 12,
    ...text,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    padding: 8,
    ...text,
    fontWeight: 'bold',
  },
  mutedHeading: {
    fontSize: 18,
    color: '#999',
    paddingLeft: 12,
    fontWeight: 'bold',
  },
  description: {
    ...text,
    padding: 12,
  },
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    // width: "100%"
  },
  addToCart: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 12,
  },
});
