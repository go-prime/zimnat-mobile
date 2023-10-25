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
import {Heading} from '../../components/text';
import {BundleButton, CourseButton, ItemButton} from '../../components/button';
import {useNavigation} from '@react-navigation/native';

export default function ProductScreen(props) {
  const [data, setData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const navigation = useNavigation();

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
    <View style={styles.root}>
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
      <ImageIcon width={width} height={height / 3} url={img} />
      <View style={[styles.content, {top: (height / 3) - 50, height: ((height * 2) / 3) -50 }]}>
        <ScrollView>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.mutedHeading}>{data.partner}</Text>
          <Rating
            item_type="Product"
            item_name={props.route.params.product}
            value={data.average_rating}
            size={20}
          />
          <Text style={styles.description}>{data.description}</Text>
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
            {data.related_products.length > 0 && (
              <Heading heading="Related Products" />
            )}
            <ScrollView horizontal>
              {data.related_products.map(pro => {
                return (
                  <ItemButton
                    key={pro.name}
                    title={pro.product_name}
                    onPress={() =>
                      navigation.navigate('Product', {product: pro.name})
                    }
                    image_url={pro.cover_image}
                  />
                );
              })}
            </ScrollView>
            {data.courses.length > 0 && <Heading heading="Courses" />}
            <ScrollView horizontal>
              {data.courses &&
                data.courses.map(c => {
                  return (
                    <CourseButton
                      key={c.name}
                      name={c.title}
                      onPress={() => {
                        props.navigation.navigate('Course', {
                          course_id: c.name,
                        });
                      }}
                      image_url={c.cover_image}
                    />
                  );
                })}
            </ScrollView>
            <View>
              {data.bundles.length > 0 && <Heading heading="Bundles" />}
              <ScrollView horizontal>
                {data.bundles.map(bun => {
                  console.log(bun);
                  return (
                    <BundleButton
                      key={bun.billable_id}
                      name={bun.bundle_name}
                      onPress={() =>
                        navigation.navigate('Bundle', {bundle: bun.name})
                      }
                      image_url={bun.cover_image}
                    />
                  );
                })}
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
