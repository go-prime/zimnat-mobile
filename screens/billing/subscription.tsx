import React from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {card, shadow, text} from '../../styles/inputs';
import axios from 'axios';
import constants from '../../constants';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import {CourseButton} from '../../components/button';
import {Heading, Label, Paragraph, Title} from '../../components/text';
import SubscriptionCard from '../../components/billing_engine/subscription_card';
import {AddToCartButton} from '../../components/partner_store/buttons';
import { Row } from '../../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';


export default function SubscriptionListScreen(props) {
  const [data, setData] = React.useState(null);
  const {width, height} = Dimensions.get('screen');

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.subscription_detail`,
        {params: {subscription_id: props.route.params.subscription_id}},
      )
      .then(res => {
        console.log(res.data.message);
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
    <View style={styles.content}>
      <ImageIcon width={width} height={height/3} url={data.subscription.cover_image} />
      <Title title={data.subscription.subscription_name} />
      <Paragraph text={data.subscription.description} />
      {data.features.map(feat => (
        <Row key={feat.feature} styles={{padding: 12}}>
          <FontAwesomeIcon icon={faCheck} size={24} color={colors.primary} />
          <Label label={feat.feature} />

        </Row>
      ))}
      <AddToCartButton
        label
        qty={1}
        product_id={props.route.params.subscription_id}
        product_name={data.subscription.subscription_name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },
  content: {
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 36,
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
