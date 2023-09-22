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
import {faImage, faVideo, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import Rating from '../../components/rating';
import ProgressBar from '../../components/edutec/progress';

const CourseItem = props => {
  return (
    <Pressable onPress={props.handler}>
      <Row styles={styles.courseItemContainer}>
        <View>
          <Text style={styles.number}>{props.index}</Text>
        </View>
        <View style={{flex: 1, paddingTop: 10}}>
          <Text style={styles.cardSubTitle}>5:24</Text>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </View>
        <Centered styles={{paddingRight: 24}}>
          <FontAwesomeIcon
            color={colors.primary}
            size={48}
            icon={props.video ? faVideo : faFileAlt}
          />
        </Centered>
      </Row>
      <ProgressBar progress={Math.random() * 100} />
    </Pressable>
  );
};

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
    fontSize: 48,
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold',
  },
  courseItemContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#f5f5f5',
  },
  cardTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
});
