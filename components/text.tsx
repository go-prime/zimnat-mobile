import React from 'react';
import {text} from '../styles/text';
import colors from '../styles/colors';
import {View, Text, StyleSheet} from 'react-native';
import getColors from '../hooks/colors';
import {useNavigation} from '@react-navigation/native';

const Pill = props => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  const inlineContainerStyle = {
    backgroundColor: props.color ? props.color : colorScheme.primary,
    borderRadius: props.lg ? 20 : 14,
    paddingHorizontal: props.lg ? 24 : 12,
    padding: props.lg ? 8 : 4,
    margin: props.lg ? 4 : 2,
    ...(props.containerStyles || {}),
  };

  const inlineTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: props.lg ? 18 : 14,
    ...(props.textStyles || {}),
  };

  return (
    <View style={inlineContainerStyle}>
      <Text style={inlineTextStyle}>{props.pill || props.children}</Text>
    </View>
  );
};

const Heading = props => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  return (
    <View style={textStyles.container}>
      <Text
        style={[textStyles.heading, {borderBottomColor: colorScheme.primary}]}>
        {props.heading || props.children}
      </Text>
    </View>
  );
};

const Title = props => {
  return (
    <View style={textStyles.container}>
      <Text
        style={[
          textStyles.title,
          {
            color: props.color
              ? props.color
              : props.light
              ? 'black'
              : textStyles.text.color,
          },
        ]}>
        {props.title || props.children}
      </Text>
    </View>
  );
};

const SubTitle = props => {
  return (
    <View style={textStyles.container}>
      <Text
        style={[
          textStyles.subtitle,
          {
            fontWeight: props.light ? 400 : 'bold',
            color: props.color ? props.color : textStyles.subtitle.color,
          },
        ]}>
        {props.subtitle || props.children}
      </Text>
    </View>
  );
};

const Label = props => {
  return (
    <View style={textStyles.labelContainer}>
      <Text
        style={[textStyles.label, {fontWeight: props.bold ? 'bold' : '400'}]}>
        {props.label || props.children}
      </Text>
    </View>
  );
};

const SmallLabel = props => {
  return (
    <View style={textStyles.labelContainer}>
      <Text style={textStyles.smallLabel}>{props.label || props.children}</Text>
    </View>
  );
};

const Paragraph = props => {
  return (
    <View style={textStyles.container}>
      <Text
        style={[
          textStyles.paragraph,
          {color: props.color ? props.color : textStyles.paragraph.color},
        ]}>
        {props.text || props.children}
      </Text>
    </View>
  );
};

const Money = props => {
  return (
    <Text style={props.style}>
      {props.symbol || '$'}{' '}
      {parseFloat(props.value || props.children || 0).toFixed(2)}
    </Text>
  );
};

const textStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 4,
    padding: 4,
    paddingTop: 0,
  },
  title: {
    ...text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    ...text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    ...text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    ...text,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomColor: colors.primary,
    borderBottomWidth: 4,
    paddingBottom: 6,
    marginBottom: 8,
    marginTop: 8,
  },
  paragraph: {
    ...text,
    fontSize: 14,
  },
  labelContainer: {
    margin: 4,
  },
  label: {
    // textAlign: 'center',
    ...text,
    fontSize: 16,
  },
  smallLabel: {
    // textAlign: 'center',
    ...text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export {
  Heading,
  Title,
  SubTitle,
  Paragraph,
  Label,
  SmallLabel,
  Pill,
  Money,
  textStyles,
};
