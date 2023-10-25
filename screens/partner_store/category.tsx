import React from 'react';

import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
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
import { Heading, Paragraph, Title } from '../../components/text';


export default function CategoryScreen(props) {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation()
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
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
    <View style={styles.root}>
      <ImageIcon width={width}
        height={height / 3} url={data.image} />
      <View style={styles.content}>
        <Title title={props.route.params.category}/>
        <Paragraph text={data.description}/>
        <Heading heading="Products" />
        <ScrollView  >
          <Row styles={{justifyContent: 'space-around'}}>
          <View>
            {data.products
              .map((p, index) => ({...p, index: index}))
              .filter(p => p.index % 2 === 0)
              .map(pro => {
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
          <View style={{marginTop: 40}}>
          {data.products
              .map((p, index) => ({...p, index: index}))
              .filter(p => p.index % 2 === 1)
              .map(pro => {
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
          </Row>
          
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position:'relative',
    flex: 1
  }, 
  content: {
    ...card,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: -48,
    paddingTop: 36,
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    elevation: 5
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
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
});
