import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Carousel from 'react-native-reanimated-carousel';
import {faSearch, faUser, faImage} from '@fortawesome/free-solid-svg-icons';
import {card, shadow, text} from '../../styles/inputs';
import axios from 'axios';
import constants from '../../constants';
import {
  RoundButton,
  RoundedSquareButton,
} from '../../components/partner_store/buttons';
import SearchBar from '../../components/search';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';

import {Heading, Title} from '../../components/text';
import {BundleButton, CategoryButton} from '../../components/button';

const variable = 0;

export default function HomeScreen({navigation}): JSX.Element {
  const width = Dimensions.get('window').width;
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState();

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_landing_screen`,
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
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={200}
          autoPlay={true}
          data={data.carousel}
          scrollAnimationDuration={3000}
          renderItem={({index}) => {
            const item = data.carousel[index];
            return (
              <View style={styles.carouselItemContainer}>
                <ImageIcon
                  url={`${constants.server_url}/${item.image}`}
                  width={100}
                  height={100}
                />
                <Text style={{flex: 1, textAlign: 'center', fontSize: 20}}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <Heading heading="Category" />
      <ScrollView horizontal={true}>
        {data.categories.map(cat => (
          <CategoryButton
            key={cat.name}
            name={cat.name}
            image_url={cat.image}
            onPress={() =>
              navigation.navigate('Category', {category: cat.name})
            }
          />
        ))}
      </ScrollView>
      <Heading heading="Featured Vendors" />
      <ScrollView horizontal={true}>
        {data.partners.map(p => (
          <RoundedSquareButton
            key={p.name}
            title={p.name}
            url={`${constants.server_url}${p.image}`}
            handler={() => navigation.navigate('Partner', {partner: p.name})}
          />
        ))}
      </ScrollView>
      <Heading heading="Featured Bundles" />
      <ScrollView horizontal={true}>
        {data.bundles.map(b => (
          <BundleButton
            key={b.name}
            name={b.bundle_name}
            image_url={b.image}
            onPress={() => navigation.navigate('Bundle', {bundle: b.name})}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    ...card,
    ...shadow,
    elevation: 5,
    padding: 12,
    borderRadius: 24,
    height: 200,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
    padding: 16,
  },
  searchInput: {
    margin: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    ...card,
    ...shadow,
    elevation: 5,
  },
  input: {
    marginLeft: 12,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    ...text,
    margin: 12,
  },
});
