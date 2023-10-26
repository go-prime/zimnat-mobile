import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {
  faImage,
  faVideo,
  faFileAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Centered, {Circle, Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import Rating from '../../components/rating';
import ProgressBar from '../../components/edutec/progress';
import CourseItem from '../../components/edutec/course';
import {SquareBundleButton} from '../../components/partner_store/bundle';
import {SquareProductButton} from '../../components/partner_store/product';
import {Appearance} from 'react-native';
import {Heading, Paragraph, SubTitle, Title} from '../../components/text';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BundleButton, ItemButton} from '../../components/button';

const onSubscribe = course_id => {
  axios
    .get(
      `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.subscribe_to_course`,
      {params: {course_id: course_id}},
    )
    .then(res => {
      Alert.alert('Success', `Subscribed to ${course_id}`);
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export default function CourseScreen(props) {
  const [data, setData] = React.useState(null);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course`,
        {params: {course_id: props.route.params.course_id}},
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

  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageIcon
        width={width}
        height={height / 3}
        url={`${constants.server_url}/${data.image}`}
      />
      <Pressable
        style={[
          data.is_subscribed ? styles.subscribedBtn : styles.subscribeBtn,
          {left: width / 2 - 100, top: height / 3 - 76},
        ]}
        onPress={() =>
          data.is_subscribed ? null : onSubscribe(props.route.params.course_id)
        }>
        {data.is_subscribed ? (
          <Text style={styles.subscribedBtnText}>SUBSCRIBED</Text>
        ) : (
          <Text style={styles.subscribeBtnText}>SUBSCRIBE</Text>
        )}
      </Pressable>
      <View style={styles.content}>
        <ScrollView>
          <Row styles={{padding: 12}}>
            <View style={{flex: 1}}>
              <Title title={data.title} />
              <Pressable
                onPress={() =>
                  navigation.navigate('Partner', {partner: data.publisher})
                }>
                <Row>
                  <Circle radius={37.5}>
                    <ImageIcon url={data.publisher_image} width={75} height={50} />
                  </Circle>
                  <SubTitle subtitle={data.publisher} />
                </Row>
              </Pressable>
              <Rating
                size={20}
                value={data.average_rating}
                item_type={'Course'}
                item_name={props.route.params.course_id}
              />
            </View>
            <Centered styles={{padding: 12}}>
              <Text style={styles.studentCount}>{data.students}</Text>
              <Text style={styles.studentLabel}>Students</Text>
            </Centered>
          </Row>
          <View>
            <Paragraph text={data.description} />
          </View>
          <View>
            {data.items.map((item, index) => (
              <CourseItem
                {...item}
                key={item.id}
                index={index + 1}
                video={item.type == 'Video'}
                handler={() => {
                  if (item.type == 'Video') {
                    return props.navigation.navigate('Video', {
                      video_id: item.id,
                    });
                  }
                  return props.navigation.navigate('Article', {
                    article_id: item.id,
                  });
                }}
              />
            ))}
            <View>
              {data.related_products.length > 0 && (
                <Heading heading="Related Products" />
              )}
              {data.related_products.map(pro => {
                return (
                  <ItemButton
                    key={pro.name}
                    title={pro.product_name}
                    image_url={pro.cover_image}
                    onPress={() =>
                      props.navigation.navigate('Product', {product: pro.name})
                    }
                  />
                );
              })}
            </View>

            <View>
              {data.bundles.length > 0 && <Heading heading="Bundles" />}
              {data.bundles.map(bun => {
                return (
                  <BundleButton
                    key={bun.billable_id}
                    name={bun.bundle_name}
                    image_url={bun.cover_image}
                    onPress={() =>
                      props.navigation.navigate('Bundle', {bundle: bun.name})
                    }
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    marginTop: -50,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    ...shadow,
    backgroundColor:
      Appearance.getColorScheme() === 'dark' ? '#111' : '#f5f5f5',
    elevation: 5,
    flex: 1,
    paddingTop: 48,
    paddingLeft: 12,
    paddingRight: 12,
  },
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
  number: {
    color: '#ccc',
    fontSize: 36,
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold',
  },
  subscribeBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    width: 200,
    position: 'absolute',
    borderRadius: 24,
    zIndex: 100,
  },
  subscribedBtn: {
    borderColor: colors.primary,
    ...card,
    borderWidth: 3,
    padding: 12,
    width: 200,
    position: 'absolute',
    borderRadius: 24,
    top: -24,
    zIndex: 100,
  },
  subscribeBtnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
  subscribedBtnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.primary,
  },
  studentCount: {
    fontSize: 36,
    ...text,
    fontWeight: 'bold',
  },
  studentLabel: {
    fontSize: 16,
    ...text,
    fontWeight: 'bold',
  },
});
