import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import {Heading, SubTitle, Title} from '../../components/text';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import constants from '../../constants';
import {err} from 'react-native-svg/lib/typescript/xml';
import Loading from '../../components/loading';
import ProduceCard from '../../components/marketplace/produce';


export default function StorefrontScreen(props) {
  const [data, setData] = React.useState(null);
  const isFocused = useIsFocused();
  const navigation = props.navigation;
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/open_marketplace.open_marketplace.api.get_storefront`,
        {
          params: {
            storefront_id: props.route.params.storefront,
          },
        },
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err);
        if (!err.response) {
          console.log(err.response.data);
        }
      });
  }, [isFocused]);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <Row>
        <View style={styles.circle}>
          <ImageIcon width={75} height={75} url={`${constants.server_url}${data.image}`} />
        </View>
        <View>
          <Title title={data.name} />
          <SubTitle subtitle={data.merchant || "Merchant"} />
        </View>
      </Row>
      <Heading heading="Tags" />
      <Heading heading="Featured Produce" />
      <Row styles={{flexWrap: 'wrap', gap: 16, margin: 12}}>
        {data.featured_produce.map(p => (
          <ProduceCard
            {...p}
            image={p.image}
            category={null}
            key={p.index}
            onPress={() => {
              navigation.navigate('Produce', {produce: p.name});
            }}
          />
        ))}
      </Row>

      <Heading heading="All Produce" />
      <Row styles={{flexWrap: 'wrap', gap: 16, margin: 12}}>
        {data.all_produce.map(p => (
          <ProduceCard
            {...p}
            image={p.cover_image}
            key={p.index}
            onPress={() => {
              navigation.navigate('Produce', {produce: p.name});
            }}
          />
        ))}
      </Row>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    circle: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        overflow: 'hidden',
        margin: 12
    }
})