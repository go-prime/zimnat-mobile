import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import Loading from '../../components/loading';
import constants from '../../constants';
import {Circle, Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import CourseItem from '../../components/edutec/course';
import RenderHtml from 'react-native-render-html';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import { SubTitle, Title } from '../../components/text';
import { useNavigation } from '@react-navigation/native';
import getColors from '../../hooks/colors'


const markAsRead = (article_id, course_id) => {
  axios
    .get(
      `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.mark_article_read`,
      {
        params: {
          article_id: article_id,
          course_id: course_id,
        },
      },
    )
    .then(res => {
      Alert.alert('Success', `Marked ${article_id} as read`);
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export default function ArticleViewer(props) {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation()
  const colorScheme = getColors(navigation)
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_article`,
        {
          params: {article_id: props.route.params.article_id},
        },
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.article_id]);
  if (data === null) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title title={data.title} />
        <SubTitle subtitle={data.course} />
        <Row styles={{alignItems: 'flex-start'}}>
          <Circle radius={37.5}>
            <ImageIcon
              url={`${constants.server_url}/${data.publisher_image}`}
              width={75}
              height={50}
            />
          </Circle>
          <SubTitle subtitle={data.publisher} />
        </Row>
      </View>
      <RenderHtml source={{html: data.content}} contentWidth={200} />
      <Row styles={{marginTop: 12, justifyContent: 'center'}}>
        <Pressable
          onPress={() => markAsRead(props.route.params.article_id, data.course)}
          style={[styles.markAsReadBtn, {backgroundColor: colorScheme.primary}]}>
          <Row styles={{gap: 8, justifyContent: 'center'}}>
            <Text style={styles.subTitle}>Mark as Read</Text>
            <FontAwesomeIcon size={24} icon={faCheck} color={'white'} />
          </Row>
        </Pressable>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    ...card
  },
  header: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    ...text,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },

  description: {
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
    padding: 8,
  },
  markAsReadBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    width: 200,
    borderRadius: 24,
  },
});
