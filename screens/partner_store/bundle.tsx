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
import {
  faImage,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants';
import Centered from '../../components/layout';
import Rating from '../../components/rating';
import ImageIcon from '../../components/image';
import {
  AddToCartButton,
  WishListButton,
} from '../../components/partner_store/buttons';
import Loading from '../../components/loading';
import {RoundedSquareButton} from '../../components/partner_store/buttons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Heading} from '../../components/text';
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
        <Text style={styles.heading}>{props.id}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.heading}>
          {parseFloat(props.price).toFixed(2)} x {props.qty}
        </Text>
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
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [isFocused]);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.root}>
      <ImageIcon
        width={width}
        height={height / 3}
        url={getAbsoluteURL(data.cover_image)}
      />
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.heading}>{data.partner}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <View>
            <Rating
              item_type="Bundle"
              item_name={props.route.params.bundle}
              value={data.average_ratnig}
              size={20}
            />
          </View>
          <View />
          <View>
            <Heading heading="Components" />
            {data.products.map(pro => (
              <BundleProduct key={pro.id} {...pro} />
            ))}
          </View>
          <View style={styles.row}>
            <WishListButton
              label
              styles={{padding: 12, width: width / 2 - 6}}
              product_id={data.product_id}
              product_name={data.name}
            />
            <AddToCartButton
              label
              styles={{padding: 12, width: width / 2 - 6}}
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
    position:'relative',
    flex: 1
  }, 
  content: {
    backgroundColor: "white",
    borderRadius: 24,
    marginTop: -48,
    paddingTop: 36,
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
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
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  },
});
