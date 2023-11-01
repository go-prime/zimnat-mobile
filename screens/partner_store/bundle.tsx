import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Appearance,
} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import {
  faTimes,
  
} from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants';
import Centered, {Circle, Row} from '../../components/layout';
import Rating from '../../components/rating';
import ImageIcon from '../../components/image';
import {
  AddToCartButton,
  WishListButton,
} from '../../components/partner_store/buttons';
import Loading from '../../components/loading';
import {RoundedSquareButton} from '../../components/partner_store/buttons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Heading, Label, Paragraph, SubTitle, Title} from '../../components/text';
import {getAbsoluteURL} from '../../utils';

const BundleProduct = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Product', {product: props.id})}
      style={[styles.card, {flexDirection: 'row', padding: 12}]}>
      <Centered>
        <ImageIcon
          width={75}
          height={75}
          url={`${constants.server_url}/${props.image}`}
        />
      </Centered>
      <View>
        <SubTitle>{props.id}</SubTitle>
        <Paragraph>{props.description}</Paragraph>
        <Label>
          {props.formatted} <FontAwesomeIcon color={Appearance.getColorScheme() == "dark" ? "white": "black"} icon={faTimes} /> {props.qty}
        </Label>
      </View>
    </Pressable>
  );
};

export default function BundleScreen(props) {
  const [data, setData] = React.useState(null);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_bundle`,
        {params: {bundle_id: props.route.params.bundle}},
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.bundle]);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.root}>
      <WishListButton
        styles={styles.floatingWishList}
        product_id={data.product_id}
        product_name={data.name}
      />
      <ImageIcon
        width={width}
        height={height / 3}
        url={getAbsoluteURL(data.cover_image)}
      />
      <View style={styles.content}>
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
              item_type="Bundle"
              item_name={props.route.params.bundle}
              value={data.average_rating}
              size={20}
            />
          </Row>
          <Heading heading="Description" />
          <Paragraph text={data.description} />
          <View />
          <View>
            <Heading heading="Components" />
            {data.products.map(pro => (
              <BundleProduct key={pro.id} {...pro} />
            ))}
          </View>
          <View style={styles.row}>
            <AddToCartButton
              label
              styles={{padding: 12, width: width - 24}}
              qty={1}
              product_id={data.product_id}
              product_name={data.name}
            />
          </View>
          {data.courses.length > 0 && <Heading heading="Courses" />}
          <ScrollView horizontal>
            {data.courses.map(c => {
              return (
                <RoundedSquareButton
                  key={c.name}
                  title={c.name}
                  url={`${constants.server_url}${c.cover_image}`}
                  handler={() =>
                    navigation.navigate('Course', {course_id: c.name})
                  }
                />
              );
            })}
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },
  content: {
    ...card,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: -48,
    paddingTop: 36,
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    flex: 1,
    flexWrap: 'nowrap',
  },
  title: {
    fontSize: 24,
    padding: 12,
    ...text,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  heading: {
    fontSize: 18,
    padding: 12,
    paddingTop: 0,
    color: '#666',
    fontWeight: 'bold',
  },
  description: {
    ...text,
    paddingLeft: 12,
    paddingBottom: 12,
  },
  card: {
    borderRadius: 12,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
  },
  floatingWishList: {
    position: 'absolute',
    zIndex: 100,
    right: 15,
    top: 15,
  },
});
