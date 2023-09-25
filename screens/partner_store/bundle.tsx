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
import { AddToCartButton, WishListButton } from '../../components/partner_store/buttons';
import Loading from '../../components/loading';


const BundleProduct = props => {
  return (
    <View style={[styles.card, {flexDirection: 'row', padding: 12}]}>
      <View>
        <ImageIcon
          width={75}
          height={75}
          url={`${constants.server_url}/${props.image}`}
        />
      </View>
      <View>
        <Text style={styles.heading}>{props.id}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.heading}>
          {parseFloat(props.price).toFixed(2)} x {props.qty}
        </Text>
      </View>
    </View>
  );
};

export default function BundleScreen(props) {
  const [data, setData] = React.useState(null);
  const width = Dimensions.get("screen").width;
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
  }, [props.route.params.bundle]);

  if(!data) {
    return <Loading />
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          {data && data.cover_image ? (
            <Image
              source={{
                uri: `${constants.server_url}/${data.cover_image}`,
                width: 100,
                height: 100,
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faImage} size={72} color={colors.primary} />
          )}
        </Centered>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.heading}>{data.partner}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View>
        <Rating value={4.2} size={24} />
      </View>
      <View />
      <View>
        <Text style={styles.heading}>Components</Text>
        {data.products.map(pro => <BundleProduct key={pro.id} {...pro} />)}
      </View>
      <View style={styles.row}>
        <WishListButton 
          label 
          styles={{padding: 12, width: (width / 2) - 6}}
          product_id={data.product_id}
          product_name={data.name} />
        <AddToCartButton label styles={{padding: 12, width: (width / 2) - 6}} />
      </View>
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
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
});
