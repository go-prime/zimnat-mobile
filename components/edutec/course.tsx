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
import {shadow, text} from '../../styles/inputs';
import ImageIcon from '../image';

const CourseButton = props => {
  return (
    <Pressable onPress={props.handler}>
      <View style={styles.courseButton}>
        <ImageIcon width={150} height={100} url={props.url} />
        
          {props.progress != undefined && <ProgressBar
            progress={props.progress}
            styles={styles.progressStyle}
          />}
        
      </View>
      {props.title && (
        <Text style={[styles.text, styles.label]}>{props.title}</Text>
      )}
    </Pressable>
  );
};

export {CourseButton};

export default function CourseItem(props) {
  return (
    <Pressable onPress={props.handler}>
      <Row styles={styles.courseItemContainer}>
        <Centered>
          <Text style={styles.number}>{props.index}</Text>
        </Centered>
        <View style={{flex: 1}}>
          <Row styles={{flex: 1, paddingLeft: 10}}>
            <View style={{flex: 1, paddingTop: 10}}>
              {props.video ? (
                <Text style={styles.cardSubTitle}>
                  {parseInt(props.duration / 60).toString()}:
                  {((props.duration % 60) + 1000).toString().slice(-2)}
                </Text>
              ) : (
                <View style={{height: 18}} />
              )}
              <Text style={styles.cardTitle}>{props.title}</Text>
            </View>
            <Centered>
                <View style={styles.componentBtn}>
                  <FontAwesomeIcon
                  color={colors.primary}
                  size={28}
                  icon={props.video ? faPlay : faFileAlt}
                />
                </View>
              
            </Centered>
          </Row>
          <ProgressBar
            progress={
              props.duration != 0 ? (props.progress / props.duration) * 100 : 0
            }
          />
        </View>
      </Row>
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
    paddingRight: 24,
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
  courseButton: {
    width: 150,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    ...text,
    textAlign: 'center',
  },
  progressStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginLeft: 0,
    marginRight: 0,
    zIndex: 1,
  },
  componentBtn: {
      padding: 12,
      marginBottom: 4,
      borderRadius: 6,
      borderWidth: 2,
      height: 52,
      borderColor: colors.primary
  }
});
