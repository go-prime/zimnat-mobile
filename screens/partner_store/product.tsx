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
import Centered, {Circle, Row} from '../../components/layout';
import constants from '../../constants';
import {
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import {
  WishListButton,
  AddToCartButton,
} from '../../components/partner_store/buttons';
import Loading from '../../components/loading';
import {Heading, Paragraph, SubTitle, Title} from '../../components/text';
import {BundleButton, CourseButton, ItemButton} from '../../components/button';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CartCounter from '../../components/cart';
import handleResourceRetrievalError from '../../scripts/permissions';

export default function ProductScreen(props) {
  const [data, setData] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const {width, height} = Dimensions.get('screen');

  const navigation = useNavigation();
  const isFocused = useIsFocused()

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_product`,
        {params: {product_id: props.route.params.product}},
      )
      .then(res => {
        setData(res.data.message);
        if (res.data.message.cover_image) {
          setImg(`${constants.server_url}/${res.data.message.cover_image}`);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        handleResourceRetrievalError(err, navigation)
      });
  }, [props.route.params.product, isFocused]);

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
      <View
        style={[
          styles.content,
          {top: height / 3 - 50, height: (height * 2) / 3 - 50},
        ]}>
        <ScrollView>
          <Title title={data.name} />
          <SubTitle>{data.formatted}</SubTitle>
          <Row styles={{justifyContent: 'space-between'}}>
            <Pressable
              onPress={() =>
                navigation.navigate('Partner', {partner: data.partner})
              }>
              <Row>
                <Circle radius={37.5}>
                  <ImageIcon url={data.partner_image} width={75} height={50} />
                </Circle>
                <SubTitle subtitle={data.partner} />
              </Row>
            </Pressable>
            <Rating
              item_type="Product"
              item_name={props.route.params.product}
              value={data.average_rating}
              size={20}
            />
          </Row>
          <Heading heading="Description" />
          <Paragraph text={data.description} />
          <View>
            <CartCounter qty={qty} setQty={setQty} />
            <AddToCartButton
                qty={qty}
                product_id={data.billable_id}
                product_name={data.name}
                label={true}
                styles={{padding: 12}}
              />
            {data.related_products.length > 0 && (
              <Heading heading="Related Products" />
            )}
            <ScrollView horizontal>
              <Row styles={{gap: 12, marginLeft: 12}}>
                {data.related_products.map(pro => {
                  return (
                    <ItemButton
                      key={pro.name}
                      title={pro.product_name}
                      subtitle={pro.formatted}
                      onPress={() =>
                        navigation.navigate('Product', {product: pro.name})
                      }
                      image_url={pro.cover_image}
                    />
                  );
                })}
              </Row>
            </ScrollView>
            {data.courses.length > 0 && <Heading heading="Courses" />}
            <ScrollView horizontal>
              <Row styles={{gap: 12, marginLeft: 12}}>
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
              </Row>
            </ScrollView>
            <View>
              {data.bundles.length > 0 && <Heading heading="Bundles" />}
              <ScrollView horizontal>
                <Row styles={{gap: 12, marginLeft: 12}}>
                  {data.bundles.map(bun => {
                    return (
                      <BundleButton
                        key={bun.billable_id}
                        name={bun.bundle_name}
                        price={bun.formatted}
                        onPress={() =>
                          navigation.navigate('Bundle', {bundle: bun.name})
                        }
                        image_url={bun.cover_image}
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
  floatingWishList: {
    position: 'absolute',
    zIndex: 100,
    right: 15,
    top: 15,
  },
});
