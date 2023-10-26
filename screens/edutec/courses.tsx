import React from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {card, shadow, text} from '../../styles/inputs';
import axios from 'axios';
import constants from '../../constants';
import Centered from '../../components/layout';
import SearchBar from '../../components/search';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import {CourseButton} from '../../components/button';
import {Heading, Paragraph, Title} from '../../components/text';

export default function CourseCategoryScreen(props) {
  const [data, setData] = React.useState(null);
  const {width, height} = Dimensions.get('screen');

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_category`,
        {params: {category_id: props.route.params.category}},
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.category]);

  if (!data) {
    return <Loading />;
  }

  const renderCourse = c => {
    return (
      <CourseButton
        key={c.name}
        name={c.title}
        onPress={() => {
          props.navigation.navigate('Course', {course_id: c.name});
        }}
        image_url={`${constants.server_url}/${c.cover_image}`}
      />
    );
  };

  return (
    <View style={styles.root}>
      <ImageIcon
        width={width}
        height={height / 3}
        url={data && `${constants.server_url}/${data.image}`}
      />
      <View style={styles.content}>
        <Title title={props.route.params.category} />
        <Paragraph text={data.description} />
        <Heading heading="Courses" />
        <FlatList
          data={data.courses}
          renderItem={({item}) => renderCourse(item)}
          numColumns={3}
          keyExtractor={item => item.name}
          columnWrapperStyle={{gap: 12, paddingLeft: 12}}
        />
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
});
