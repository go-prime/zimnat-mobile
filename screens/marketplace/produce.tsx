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
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import Rating from '../../components/rating';
import ImageIcon from '../../components/image';
import {Circle, Row} from '../../components/layout';
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
import {Heading, Paragraph, SubTitle, Title} from '../../components/text';
import {ItemButton} from '../../components/button';
import CartCounter from '../../components/cart';
import useGeolocation from '../../hooks/location';


export default function ProductScreen(props) {
  const [data, setData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const location = useGeolocation();
  const navigation = props.navigation;

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/open_marketplace.open_marketplace.api.get_produce`,
        {
          params: {
            produce_id: props.route.params.produce
          },
          headers: {
            'Fine-Location': JSON.stringify(location),
          }
        },
      )
      .then(res => {
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
    <View style={styles.root}>
      <WishListButton
        product_id={data.billable_id}
        product_name={data.name}
        styles={styles.floatingWishList}
      />
      <ImageIcon width={width} height={height / 3} url={img} />
      <Row
        styles={{
          position: 'absolute',
          justifyContent: 'center',
          zIndex: 100,
          top: height / 3 - 90,
        }}>
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
      <View
        style={[
          styles.content,
          {top: height / 3 - 50, height: (height * 2) / 3 - 50},
        ]}>
        <ScrollView>
          <Row styles={{justifyContent: 'center'}} />

          <Title>{data.name}</Title>
          <SubTitle>{data.formatted}</SubTitle>
          <Row styles={{justifyContent: 'space-between'}}>
            <Pressable
              onPress={() => {
                if (!data.merchant_storefront) {
                  return;
                }
                navigation.navigate('Storefront', {
                  storefront: data.merchant_storefront,
                });
              }}>
              <Row styles={{marginTop: 12, alignItems: 'flex-start'}}>
                <Circle radius={24}>
                  <ImageIcon
                    width={48}
                    height={48}
                    url={
                      data.merchant_image
                        ? `${constants.server_url}${data.merchant_image}`
                        : null
                    }
                  />
                </Circle>
                <SubTitle>{data.merchant}</SubTitle>
              </Row>
            </Pressable>
            <Rating
              item_type="Produce"
              item_name={props.route.params.produce}
              value={data.average_rating}
              size={20}
            />
          </Row>
          <Heading>Description</Heading>
          <Paragraph>{data.description}</Paragraph>
          <View>
            <CartCounter qty={qty} setQty={setQty} />
            <AddToCartButton
              qty={qty}
              product_id={data.billable_id}
              product_name={data.name}
              label={true}
              styles={{padding: 12}}
            />
            <View>
              <Heading heading="Related Produce" />
              <ScrollView horizontal={true} style={styles.horizontalScroll}>
                <Row styles={{gap: 12}}>
                  {data.related_produce.map(pro => {
                    return (
                      <ItemButton
                        key={pro.name}
                        title={pro.name}
                        subtitle={pro.formatted}
                        onPress={() =>
                          navigation.navigate('Produce', {produce: pro.name})
                        }
                        image_url={pro.cover_image}
                      />
                    );
                  })}
                </Row>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
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
    paddingBottom: 4,
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
    gap: 12,
    padding: 12,
  },
  content: {
    position: 'absolute',
    ...card,
    borderRadius: 24,
    flex: 1,
    elevation: 5,
    right: 0,
    left: 0,
    paddingTop: 36,
    paddingLeft: 12,
  },
  floatingWishList: {
    position: 'absolute',
    zIndex: 100,
    right: 15,
    top: 15,
  },
});
