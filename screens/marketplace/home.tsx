import React from 'react';
import {Dimensions, Text, ScrollView, View, StyleSheet, Alert} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import Loading from '../../components/loading';
import constants from '../../constants';
import ImageIcon from '../../components/image';
import SearchBar from '../../components/search';
import {Row} from '../../components/layout';
import ProduceCard from '../../components/marketplace/produce';
import CategoryPill from '../../components/marketplace/category';
import {Heading} from '../../components/text';
import { CategoryButton, ItemButton } from '../../components/button';

export default function MarketplaceHome({navigation}) {
  const [data, setData] = React.useState(null);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/open_marketplace.open_marketplace.api.marketplace_home`,
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Failed to get resources.');
      });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <SearchBar />
      <View>
        <Carousel
          loop
          style={{margin: 24, margintTop: 0, borderRadius: 24}}
          width={width - 48}
          height={width - 48}
          autoPlay={true}
          data={data.carousel}
          scrollAnimationDuration={3000}
          renderItem={({index}) => {
            const item = data.carousel[index];
            return (
              <View style={styles.carouselItemContainer}>
                <ImageIcon
                  url={`${constants.server_url}/${item.image}`}
                  width={width - 48}
                  height={width - 48}
                />
                <Text style={[styles.carouselTextStyle, {width: width - 96}]}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <Heading heading="Categories" />
      <View style={{flexWrap: 'wrap'}}>
        {data.categories.map((p, index) => (
          <CategoryButton
            name={p.name}
            image_url={p.image}
            key={index}
            onPress={() =>
              navigation.navigate('Produce Category', {category: p.name})
            }
          />
        ))}
      </View>
      <Heading heading="Featured Produce" />
      <Row styles={styles.row}>
        <View style={styles.column}>
          {data.produce
            .map((p, index) => ({...p, index: index}))
            .map(p => {console.log(p); return p})
            .filter(p => p.index % 2 === 0)
            .map(p => {console.log(p); return p})
            .map(p => (
              <ItemButton
                key={p.index}
                bold
                image_url={p.image}
                title={p.name}
                subtitle={p.category}
                onPress={() => {
                  navigation.navigate('Produce', {produce: p.name});
                }}
              />
            ))}
        </View>
        <View style={[styles.column, {paddingTop: 36}]}>
          {data.produce
            .map((p, index) => ({...p, index: index}))
            .filter(p => p.index % 2 == 1)
            .map(p => (
              <ItemButton 
                bold
                image_url={p.image}
                title={p.name}
                subtitle={p.category}
                key={p.index}
                onPress={() => {
                  navigation.navigate('Produce', {produce: p.name});
                }}
              />
            ))}
        </View>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselTextStyle: {
    position: 'absolute',
    bottom: 24,
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 8,
    fontSize: 24,
    elevation: 5,
    color: 'black',
  },
  carouselItemContainer: {
    position: 'relative',
  },
  column: {
    flex: 1,
    padding: 16,
    gap: 24
  },
  row: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});
