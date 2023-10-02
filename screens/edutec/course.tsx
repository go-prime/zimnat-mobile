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
import Centered, {Row} from '../../components/layout';
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
import {Heading} from '../../components/text';
import {useIsFocused} from '@react-navigation/native';

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

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Row styles={{padding: 12}}>
        <ImageIcon
          width={150}
          height={150}
          url={`${constants.server_url}/${data.image}`}
        />
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>{data.publisher}</Text>
          <Rating
            value={data.average_rating}
            item_type={'Course'}
            item_name={props.route.params.course_id}
          />
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </Row>
      <View style={styles.half_card}>
        <Pressable
          style={[
            data.is_subscribed ? styles.subscribedBtn : styles.subscribeBtn,
            {left: width / 2 - 100},
          ]}
          onPress={() =>
            data.is_subscribed
              ? null
              : onSubscribe(props.route.params.course_id)
          }>
          {data.is_subscribed ? (
            <Text style={styles.subscribedBtnText}>SUBSCRIBED</Text>
          ) : (
            <Text style={styles.subscribeBtnText}>SUBSCRIBE</Text>
          )}
        </Pressable>
        <ScrollView>
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
            <Heading heading="Related Products" />
            {data.related_products.map(pro => {
              return (
                <SquareProductButton
                  key={pro.name}
                  name={pro.product_name}
                  id={pro.name}
                  product_id={pro.billable_id}
                  price={'$5,00'}
                  actions={true}
                  url={`${constants.server_url}/${pro.cover_image}`}
                />
              );
            })}
          </View>

          <View>
            <Heading heading="Bundles" />
            {data.bundles.map(bun => {
              return (
                <SquareBundleButton
                  key={bun.billable_id}
                  name={bun.bundle_name}
                  id={bun.name}
                  url={`${constants.server_url}${bun.cover_image}`}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  half_card: {
    marginTop: 24,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    ...shadow,
    backgroundColor:
      Appearance.getColorScheme() === 'dark' ? '#111' : '#f5f5f5',
    elevation: 5,
    flex: 1,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    padding: 12,
    ...text,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    paddingLeft: 12,
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
    width: '60%',
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
    top: -24,
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
});
