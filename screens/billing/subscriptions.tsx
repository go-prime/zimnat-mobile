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

export default function SubscriptionListScreen(props) {
  const [data, setData] = React.useState(null);
  const {width, height} = Dimensions.get('screen');

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
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.content}>
      <FlatList
        data={data.subscriptions}
        renderItem={({item}) => {
          return <SubscriptionCard {...item} />;
        }}
        numColumns={2}
        keyExtractor={item => item.name}
        columnWrapperStyle={{gap: 12, paddingLeft: 12}}
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
