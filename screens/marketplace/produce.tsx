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
import Centered, {Circle, Row} from '../../components/layout';
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
import {Heading} from '../../components/text';
import ProduceCard from '../../components/marketplace/produce';
import { ItemButton } from '../../components/button';

export default function ProductScreen(props) {
  const [data, setData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const width = Dimensions.get('screen').width;
  const navigation = props.navigation;

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/open_marketplace.open_marketplace.api.get_produce`,
        {params: {produce_id: props.route.params.produce}},
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
  }, [props.route.params.produce]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <Row>
            <Centered styles={{margin: 16, flex: 1}}>
              <ImageIcon width={200} height={150} url={img} />
            </Centered>
            <View>
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
            </View>
          </Row>
        </View>
        <Row styles={{justifyContent: 'center'}} />

        <View style={styles.card}>
          <Pressable 
            onPress={() => {
              if(! data.merchant_storefront) return 
              navigation.navigate("Storefront", {storefront: data.merchant_storefront})
            }}>
            <Row styles={{gap: 8, paddingLeft: 12, alignItems: "center"}}>
              <Circle radius={24}>
                <ImageIcon 
                  width={48} 
                  height={48}
                  url={data.merchant_image 
                    ? `${constants.server_url}${data.merchant_image}`
                    : null} />
              </Circle>
              <View>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.mutedHeading}>{data.merchant}</Text>
              </View>
            </Row>
          </Pressable>
          <Rating
            item_type="Produce"
            item_name={props.route.params.produce}
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
            <Heading heading="Related Produce" />
            <ScrollView horizontal={true} style={styles.horizontalScroll}>
              {data.related_produce.map(pro => {
                return (
                  <ItemButton
                    key={pro.name}
                    title={pro.name}
                    onPress={() => navigation.navigate('Produce', {produce: pro.name})}
                    image_url={pro.cover_image}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
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
    paddingBottom: 0,
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
    paddingBottom: 4
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
  horizontalScroll: {
    gap: 8,
    padding: 12,
  },
});
