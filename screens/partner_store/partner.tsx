import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import {shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import Centered, {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import {SquareProductButton} from '../../components/partner_store/product';
import {SquareBundleButton} from '../../components/partner_store/bundle';
import Loading from '../../components/loading';
import {RoundedSquareButton} from '../../components/partner_store/buttons';

export default function PartnerScreen(props) {
  const [data, setData] = React.useState(null);
  const navigation = props.navigation;

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_partner`,
        {params: {partner_id: props.route.params.partner}},
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          <ImageIcon
            width={75}
            height={75}
            url={`${constants.server_url}/${data.image}`}
          />
        </Centered>
        <Text style={styles.title}>{data && data.name}</Text>
        <Text style={styles.description}>
          {data.about || 'Loading description...'}
        </Text>
      </View>

      <View>
        <Text style={styles.heading}>Products</Text>
        <Row styles={{flexWrap: 'wrap'}}>
          {data.products.map(pro => {
            return (
              <SquareProductButton
                key={pro.product_name}
                name={pro.product_name}
                product_id={pro.billable_id}
                id={pro.name}
                url={`${constants.server_url}${pro.cover_image}`}
              />
            );
          })}
        </Row>
      </View>
      <View>
        <Text style={styles.heading}>Bundles</Text>
        <Row styles={{flexWrap: 'wrap'}}>
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
        </Row>
      </View>
      <View>
        <Text style={styles.heading}>Courses</Text>
        <Row styles={{flexWrap: 'wrap'}}>
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
        </Row>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
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
  description: {
    ...text,
    padding: 12,
  },
});
