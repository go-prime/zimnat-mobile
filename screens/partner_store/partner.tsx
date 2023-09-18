import React from 'react';

import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import colors from '../../styles/colors';
import {shadow} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import Centered from '../../components/layout';
import ImageIcon from '../../components/image';
import {SquareProductButton} from '../../components/partner_store/product';
import {SquareBundleButton} from '../../components/partner_store/bundle';
import Loading from '../../components/loading';

export default function PartnerScreen(props) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_partner`,
        {params: {partner_id: props.route.params.partner}},
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
    <View>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          <ImageIcon
            width={75}
            height={75}
            url={data && `${constants.server_url}/${data.image}`}
          />
        </Centered>
        <Text style={styles.title}>{data && data.name}</Text>
        <Text style={styles.description}>
          {(data && data.about) || 'Loading description...'}
        </Text>
      </View>

      <View>
        <Text style={styles.heading}>Products</Text>
        {data &&
          data.products &&
          data.products.map(pro => {
            console.log(pro)
            return <SquareProductButton 
                      key={pro.product_name} 
                      name={pro.product_name}
                      product_id={pro.billable_id}
                      id={pro.name}
                      url={`${constants.server_url}${pro.cover_image}`}/>;
          })}
      </View>
      <View>
        <Text style={styles.heading}>Bundles</Text>
        {data &&
          data.bundles &&
          data.bundles.map(bun => {
            return <SquareBundleButton 
                      key={bun.billable_id} 
                      name={bun.bundle_name}
                      id={bun.name}
                      url={`${constants.server_url}${bun.cover_image}`}/>;
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadow,
    backgroundColor: 'white',
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    padding: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    padding: 8,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    color: 'black',
    padding: 12,
  },
});
