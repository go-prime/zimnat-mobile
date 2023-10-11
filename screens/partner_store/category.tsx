import React from 'react';

import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import {shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {SquareProductButton} from '../../components/partner_store/product';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import { ItemButton } from '../../components/button';
import { useNavigation } from '@react-navigation/native';


export default function CategoryScreen(props) {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation()
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/partner_hub.partner_hub.api.get_category`,
        {params: {category_id: props.route.params.category}},
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.category]);

  if(!data) {
    return <Loading />
  }

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <SearchBar />
      </View>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          <ImageIcon width={75} height={75} url={data && `${constants.server_url}/${data.image}`} />
        </Centered>
        <Text style={styles.title}>{props.route.params.category}</Text>
        <Text style={styles.description}>
          {(data && data.description) || 'Loading description...'}
        </Text>
      </View>
      <View>
        <Text style={styles.heading}>Products</Text>
        <View>
          {data.products.map(pro => {
              return (
                <ItemButton
                  key={pro.name}
                  title={pro.product_name}
                  image_url={pro.cover_image}
                  onPress={() => navigation.navigate("Product", {product: pro.name})}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
});
