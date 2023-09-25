import React from 'react';

import {View, ScrollView, Text, Pressable, StyleSheet, Image} from 'react-native';
import colors from '../../styles/colors';
import {shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';

export default function CourseCategoryScreen(props) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_category`,
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

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <SearchBar />
      </View>
      <View style={styles.card}>
        <Centered styles={{margin: 16}}>
          <ImageIcon
            width={150}
            height={100}
            url={data && `${constants.server_url}/${data.image}`}
          />
        </Centered>
        <Text style={styles.title}>{props.route.params.category}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Courses</Text>
        <View>
          {data.courses.map(c => {
            return (
              <RoundedRectButton
                key={c.name}
                title={c.title}
                subtitle={c.publisher}
                handler={() => {
                    props.navigation.navigate('Course', {course_id: c.name});
                }}
                url={`${constants.server_url}/${c.cover_image}`}
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
