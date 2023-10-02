import React from 'react';
import {text} from '../styles/text';
import colors from '../styles/colors';
import {View, Text, StyleSheet} from 'react-native';

const Heading = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.heading}</Text>
    </View>
  );
};

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const SubTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.subtitle}</Text>
    </View>
  );
};

const Paragraph = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{props.text}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 4,
    padding: 4
  },
  text: {
    ...text,
    fontSize: 18,
    fontWeight: "bold"
  },
  heading: {
    ...text,
    fontSize: 18,
    fontWeight: "bold",
    borderBottomColor: colors.secondary,
    borderBottomWidth: 4,
    paddingBottom: 6,
    marginBottom: 8,
    marginTop: 8
  
  },
  paragraph: {
    ...text,
    fontSize: 14,
  },
});

export {Heading, Title, SubTitle, Paragraph};
