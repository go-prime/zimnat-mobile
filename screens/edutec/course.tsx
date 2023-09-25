import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '../../styles/colors';
import {shadow} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {faImage, faVideo, faFileAlt, faPlay} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import Rating from '../../components/rating';
import ProgressBar from '../../components/edutec/progress';
import CourseItem from '../../components/edutec/course';


export default function CourseScreen(props) {
  const [data, setData] = React.useState(null);
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
  }, [props.route.params.category]);

  if (!data) {
    return <Loading />;
  }

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
          <Rating value={4} />
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </Row>
      <View style={styles.half_card}>
        <ScrollView>
          {data.items.map((item, index) => (
            <CourseItem
              {...item}
              index={index + 1}
              video={item.type == 'Video'}
              handler={() => {
                if(item.type == "Video") {
                  return props.navigation.navigate('Video', {video_id: item.id})
                }
                return props.navigation.navigate('Article', {article_id: item.id})
              }}
            />
          ))}
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
    backgroundColor: 'white',
    ...shadow,
    elevation: 5,
    flex: 1,
    paddingTop: 48,
  },
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
  number: {
    color: '#ccc',
    fontSize: 36,
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold',
  },
 
});
