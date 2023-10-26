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
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const SubTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

const Label = (props) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.label, {fontWeight: props.bold ? "bold": "400"}]}>{props.label}</Text>
    </View>
  );
};

const SmallLabel = (props) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.smallLabel}>{props.label}</Text>
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
  title: {
    ...text,
    fontSize: 28,
    fontWeight: "bold",
    
  },
  subtitle: {
    ...text,
    fontSize: 18,
    fontWeight: "bold"
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
    borderBottomColor: colors.primary,
    borderBottomWidth: 4,
    paddingBottom: 6,
    marginBottom: 8,
    marginTop: 8
  
  },
  paragraph: {
    ...text,
    fontSize: 14,
  },
  labelContainer: {
    
  },
  label: {
    // textAlign: 'center',
    ...text,
    fontSize: 16
  },
  smallLabel: {
    // textAlign: 'center',
    ...text,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export {Heading, Title, SubTitle, Paragraph, Label, SmallLabel};
