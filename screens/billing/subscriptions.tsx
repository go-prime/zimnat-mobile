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
import {Heading, Paragraph, Title} from '../../components/text';
import SubscriptionCard from '../../components/billing_engine/subscription_card';
import {useIsFocused} from '@react-navigation/native';
import SubscriptionHistory from '../../components/billing_engine/subscription_history';

export default function SubscriptionListScreen(props) {
  const [data, setData] = React.useState(null);
  const {width, height} = Dimensions.get('screen');
  const isFocused = useIsFocused();
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.subscriptions`,
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
    <ScrollView>
      <View style={styles.content}>
        <Heading heading="Purchase Subscriptions" />
        <View style={styles.grid}>
          {data.subscriptions.map(item => <SubscriptionCard {...item} />)}
        </View>
        <Heading heading="My Subscription History" />
        {data.subscription_history.map(item => (
          <SubscriptionHistory key={item.subscription_id} {...item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
});
