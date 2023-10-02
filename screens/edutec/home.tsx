import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Carousel from 'react-native-reanimated-carousel';
import {faSearch, faUser, faImage, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import {shadow, text} from '../../styles/inputs';
import axios from 'axios';
import {Alert} from 'react-native';
import constants from '../../constants';
import Loading from '../../components/loading';
import SearchBar from '../../components/search';
import ImageIcon from '../../components/image';
import {
  RoundButton,
  RoundedSquareButton,
} from '../../components/partner_store/buttons';
import {CourseButton} from '../../components/edutec/course';
import { Heading } from '../../components/text';
import colors from '../../styles/colors';

export default function CoursesHomeScreen({navigation}): JSX.Element {
  const width = Dimensions.get('window').width;
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.edutec_home`,
      )
      .then(res => {
        console.log(res.data.message)
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

      <View>
        <Heading heading="Continue Learning" />
        <ScrollView horizontal={true}>
          <Pressable 
            style={styles.myCourseCard}
            onPress={() => navigation.navigate("Subscriptions")}
          >
            <FontAwesomeIcon icon={faUserGraduate} size={48} color={"white"} />
            <Text style={styles.myCourseCardText}>My Courses</Text>
          </Pressable>
          {data.continue_learning.map(b => (
            <CourseButton
              key={b.name}
              title={b.name}
              progress={
                b.duration > b.progress
                  ? (b.progress / b.duration) * 100
                  : 0
              }
              url={`${constants.server_url}${b.cover_image}`}
              handler={() => navigation.navigate('Course', {course_id: b.name})}
            />
          ))}
        </ScrollView>
      </View>

      <Heading heading="Subjects" />
      <ScrollView horizontal={true}>
        {data.categories.map(cat => (
          <RoundButton
            key={cat.name}
            title={cat.name}
            url={`${constants.server_url}/${cat.image}`}
            handler={() =>
              navigation.navigate('Course Category', {category: cat.name})
            }
          />
        ))}
      </ScrollView>
      <Heading heading="Featured Courses" />
      <ScrollView horizontal={true}>
        {data.courses.map(b => (
          <CourseButton
            key={b.name}
            title={b.name}
            url={`${constants.server_url}${b.image}`}
            handler={() => navigation.navigate('Course', {course_id: b.name})}
          />
        ))}
      </ScrollView>
      <Heading heading="Featured Partners" />
      <ScrollView horizontal={true}>
        {data.publishers.map(p => (
          <RoundedSquareButton
            key={p.name}
            title={p.name}
            url={`${constants.server_url}${p.image}`}
            handler={() => navigation.navigate('Partner', {partner: p.name})}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    ...shadow,
    elevation: 5,
    borderRadius: 12,
    padding: 12,
    height: 200,
    margin: 4,
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
    ...shadow,
    elevation: 5,
  },
  input: {
    marginLeft: 12,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    ...text,
    margin: 12,
  },
  myCourseCard: {
    height: 100,
    width: 100,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12
  },
  myCourseCardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6
  }
});
