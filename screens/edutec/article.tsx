import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Alert} from 'react-native';
import axios from 'axios';
import Loading from '../../components/loading';
import constants from '../../constants';
import {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import CourseItem from '../../components/edutec/course';
import RenderHtml from 'react-native-render-html';
import {shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';

const markAsRead = (article_id, course_id) => {
  axios
    .get(
      `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.mark_article_read`,
      {params: {
        article_id: article_id,
        course_id: course_id
    }},
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
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_article`,
        {
          params: {article_id: props.route.params.article_id},
        },
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);
  if (data === null) {
    return <Loading />;
  }
  return (
    <ScrollView style={{padding: 8}}>
      <View style={styles.card}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subTitle}>{data.course}</Text>
        <Row styles={{alignItems: 'center'}}>
          <ImageIcon
            url={`${constants.server_url}/${data.publisher_image}`}
            width={50}
            height={50}
          />
          <Text style={styles.subTitle}>{data.publisher}</Text>
        </Row>
      </View>
      <RenderHtml source={{html: data.content}} contentWidth={200} />
      <Row styles={{marginTop: 12, justifyContent: 'center'}}>
        <Pressable
          onPress={() => markAsRead(props.route.params.article_id, data.course)}
          style={styles.markAsReadBtn}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    ...text,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
