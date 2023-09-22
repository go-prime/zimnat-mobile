import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Carousel from 'react-native-reanimated-carousel';
import {faSearch, faUser, faImage} from '@fortawesome/free-solid-svg-icons';
import {shadow} from '../../styles/inputs';
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
      <Text style={styles.heading}>Subjects</Text>
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
      <Text style={styles.heading}>Featured Courses</Text>
      <ScrollView horizontal={true}>
        {data.courses.map(b => (
          <RoundedSquareButton
            key={b.name}
            title={b.name}
            url={`${constants.server_url}${b.image}`}
            handler={() => navigation.navigate('Course', {course_id: b.name})}
          />
        ))}
      </ScrollView>
      <Text style={styles.heading}>Featured Partners</Text>
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
      {/* <Text style={styles.heading}>Continue Learning</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: 'white',
    ...shadow,
    elevation: 5,
    borderRadius: 12,
    padding: 12,
    height: 200,
    margin: 4
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
    backgroundColor: 'white',
    ...shadow,
    elevation: 5,
  },
  input: {
    marginLeft: 12,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    margin: 12,
  
  },
});
