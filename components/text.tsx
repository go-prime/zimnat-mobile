import React from 'react';
import {text} from '../styles/text';
import colors from '../styles/colors';
import {View, Text, StyleSheet} from 'react-native';


const Pill = (props) => {
  const inlineContainerStyle = {
    backgroundColor: props.color ? props.color : colors.primary ,
    borderRadius: props.lg ? 20 : 14,
    padding: props.lg ? 8 :  4,
    margin: props.lg ? 4 : 2,
  }

  const inlineTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: props.lg ? 18 : 14
  }

  return (
    <View style={inlineContainerStyle}>
      <Text style={inlineTextStyle}>{props.pill || props.children}</Text>
    </View>
  );
};

const Heading = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.heading || props.children}</Text>
    </View>
  );
};

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title || props.children}</Text>
    </View>
  );
};

const SubTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{props.subtitle || props.children}</Text>
    </View>
  );
};

const Label = (props) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.label, {fontWeight: props.bold ? "bold": "400"}]}>{props.label || props.children}</Text>
    </View>
  );
};

const SmallLabel = (props) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.smallLabel}>{props.label || props.children}</Text>
    </View>
  );
};

const Paragraph = (props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{props.text || props.children}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 4,
    padding: 4,
    paddingTop: 0
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
    margin: 4
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
  },
  pillContainer: {
    
  },
  pillText: {
    
  }
});

export {Heading, Title, SubTitle, Paragraph, Label, SmallLabel, Pill};
