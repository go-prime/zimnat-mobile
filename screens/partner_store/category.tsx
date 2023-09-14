import React from 'react';

import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import colors from '../../styles/colors';
import {shadow} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import Centered from '../../components/centered';
import SearchBar from '../../components/search';
import {SquareProductButton} from '../../components/partner_store/product';

export default function CategoryScreen(props) {
  const [data, setData] = React.useState(null);
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
  }, []);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <SearchBar />
      </View>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          {data && data.image ? (
            <Image
              source={{
                uri: `${constants.server_url}/${data.image}`,
                width: 75,
                height: 75,
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faImage} size={72} color={colors.primary} />
          )}
        </Centered>
        <Text style={styles.title}>{props.route.params.category}</Text>
        <Text style={styles.description}>
          {(data && data.description) || 'Loading description...'}
        </Text>
      </View>
      <View>
        <Text style={styles.heading}>Products</Text>
        <View>
          {data &&
            data.products.map(pro => {
              return (
                <SquareProductButton
                  key={pro.product_name}
                  name={pro.product_name}
                  price={'$5,00'}
                  actions={true}
                  url={`${constants.server_url}/${pro.cover_image}`}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    ...shadow,
    backgroundColor: 'white',
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
});
