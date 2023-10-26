import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import Centered, {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import {SquareProductButton} from '../../components/partner_store/product';
import {SquareBundleButton} from '../../components/partner_store/bundle';
import Loading from '../../components/loading';
import {RoundedSquareButton} from '../../components/partner_store/buttons';
import {Dimensions} from 'react-native';
import {Title, Heading, Paragraph} from '../../components/text';
import {BundleButton, CourseButton, ItemButton} from '../../components/button';

export default function PartnerScreen(props) {
  const [data, setData] = React.useState(null);
  const navigation = props.navigation;
  const {width, height} = Dimensions.get('screen');

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
  }, [props.route.params.partner]);

  if (!data) {
    return <Loading />;
  }

  const renderProduct = item => {
    return (
      <ItemButton
        key={item.name}
        title={item.product_name}
        image_url={item.cover_image}
        onPress={() => navigation.navigate('Product', {product: item.name})}
      />
    );
  };

  return (
    <View style={styles.root}>
      <ImageIcon width={width} height={height / 3} url={data.image} />
      <View style={styles.content}>
        <ScrollView>
          <Title title={data.name} />
          <Paragraph text={data.about} />
          <Heading heading="Products" />
          <FlatList
            data={data.products}
            renderItem={({item}) => renderProduct(item)}
            numColumns={3}
            keyExtractor={item => item.name}
            scrollEnabled={false} 
            columnWrapperStyle={{gap: 12, paddingLeft: 12}}
          />
          <View>
            {data.bundles.length > 0 && <Heading heading="Bundles" />}
            <Row styles={{flexWrap: 'wrap'}}>
              {data.bundles.map(bun => {
                return (
                  <BundleButton
                    key={bun.billable_id}
                    name={bun.bundle_name}
                    onPress={() =>
                      navigation.navigate('Bundle', {bundle: bun.name})
                    }
                    image_url={bun.cover_image}
                  />
                );
              })}
            </Row>
          </View>
          <View>
            {data.courses.length > 0 && <Heading heading="Courses" />}
            <Row styles={{flexWrap: 'wrap'}}>
              {data.courses.map(c => {
                return (
                  <CourseButton
                    key={c.name}
                    name={c.name}
                    image_url={c.cover_image}
                    onPress={() =>
                      navigation.navigate('Course', {course_id: c.name})
                    }
                  />
                );
              })}
            </Row>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
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
    elevation: 5,
  },
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
