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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVideo, faFileAlt, faPlay} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import ProgressBar from '../../components/edutec/progress';
import { shadow, text } from '../../styles/inputs';

export default function CourseItem(props) {
  return (
    <Pressable onPress={props.handler}>
      <Row styles={styles.courseItemContainer}>
        <Centered>
          <Text style={styles.number}>{props.index}</Text>
        </Centered>
        <View style={{flex: 1, paddingTop: 10}}>
          <Text style={styles.cardSubTitle}>5:24</Text>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </View>
        <Centered
          styles={{padding: 12, borderRadius: 6, backgroundColor: '#BEFFF7'}}>
          <FontAwesomeIcon
            color={colors.primary}
            size={28}
            icon={props.video ? faPlay : faFileAlt}
          />
        </Centered>
      </Row>
      <ProgressBar progress={Math.random() * 100} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  number: {
    color: '#ccc',
    fontSize: 36,
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold',
  },
  courseItemContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 20,
    ...text,
    fontWeight: 'bold',
  },
  cardSubTitle: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
});
