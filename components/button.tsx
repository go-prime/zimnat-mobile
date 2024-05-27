import React from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import Centered, {Circle, Row} from './layout';
import ImageIcon from './image';
import {card, text} from '../styles/inputs';
import {Label, SmallLabel} from './text';
import {getAbsoluteURL} from '../utils';
import ProgressBar from './edutec/progress';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight, faSave} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import getColors from '../hooks/colors';
import colors from '../styles/colors';

const CategoryButton = ({onPress, name, image_url}) => {
  return (
    <Pressable onPress={onPress} style={styles.categoryContainer}>
      <Circle radius={37.5}>
        <ImageIcon url={getAbsoluteURL(image_url)} width={75} height={75} />
      </Circle>
      <Label bold label={name} />
    </Pressable>
  );
};

const CourseButton = ({image_url, onPress, name, progress}) => {
  return (
    <Pressable style={{width: 150, marginRight: 12}} onPress={onPress}>
      <View style={styles.courseButton}>
        <ImageIcon width={150} height={100} url={getAbsoluteURL(image_url)} />
        {progress != undefined && (
          <ProgressBar progress={progress} styles={styles.progressStyle} />
        )}
      </View>

      <Label bold label={name} />
    </Pressable>
  );
};

const BundleButton = ({onPress, image_url, name, price}) => {
  const deck = {
    position: 'absolute',
    width: 120,
    height: 120,
    ...card,
    borderRadius: 12,
  };

  const imgContainer = {
    left: 0,
    position: 'absolute',
    top: 0,
    elevation: 5,
    zIndex: 5,
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  };

  return (
    <Pressable style={styles.bundleContainer} onPress={onPress}>
      <View style={{position: 'relative', flex: 1}}>
        <View style={imgContainer}>
          <ImageIcon width={125} height={125} url={getAbsoluteURL(image_url)} />
        </View>
        {[1, 2].map(i => (
          <View
            key={i}
            style={{
              ...deck,
              left: 7.5 * i,
              top: 5 * i,
              elevation: 5 - i,
              zIndex: 5 - i,
            }}
          />
        ))}
      </View>
      <Label bold label={name} />
      <SmallLabel label={price} />
    </Pressable>
  );
};

const ItemButton = ({onPress, title, subtitle, image_url, bold}) => {
  return (
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <View style={styles.itemImageContainer}>
        <ImageIcon url={getAbsoluteURL(image_url)} width={100} height={100} />
      </View>
      <Label bold={bold} label={title} />
      <SmallLabel label={subtitle} />
    </Pressable>
  );
};

const ProfileButton = ({label, action}) => {
  return (
    <Pressable style={buttonStyle} onPress={action}>
      <Row styles={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={buttonTextStyle}>{label}</Text>
        <FontAwesomeIcon
          icon={faAngleRight}
          size={24}
          color={buttonTextStyle.color}
        />
      </Row>
    </Pressable>
  );
};

const SubmitButton = ({label, action}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  return (
    <Pressable
      onPress={action}
      style={[
        styles.submitButtonContainer,
        {backgroundColor: colorScheme.primary},
      ]}>
      <FontAwesomeIcon icon={faSave} size={24} color={'white'} />
      <Text style={styles.submitButtonText}>{label || 'Submit'}</Text>
    </Pressable>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedButton = props => {
  /**
   * Props:
   * animatedTo - value
   * animationInitial - value
   * animationDuration - double (ms)
   * animatedStyle - string
   * Style and onPress as usual
   */
  const styles = {...props.style};
  const animated = new Animated.Value(props.animatedInitial);
  styles[props.animatedStyle] = animated;
  const onPressIn = () => {
    Animated.timing(animated, {
      toValue: props.animatedTo,
      duration: props.animationDuration || 1000,
      useNativeDriver: true,
    });
  };

  const onPressOut = () => {
    const duration = (props.animationDuration || 1000) / 3;
    console.log(duration);
    Animated.timing(animated, {
      toValue: props.animatedInitial,
      duration: duration,
      useNativeDriver: true,
    });
  };

  return (
    <AnimatedPressable
      style={styles}
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {props.children}
    </AnimatedPressable>
  );
};

const LoadingButton = props => {
  return (
    <Pressable
      style={{...props.style, opacity: props.loading ? 0.5 : 1}}
      disabled={props.loading}
      onPress={props.onPress}>
      {props.loading ? (
        <Centered>
          <ActivityIndicator
            size={props.indicatorSize || 24}
            color={props.indicatorColor || colors.primary}
          />
        </Centered>
      ) : (
        props.children
      )}
    </Pressable>
  );
};

const buttonTextStyle = {
  fontSize: 20,
  ...text,
};

const buttonStyle = {
  ...card,
  padding: 12,
  borderRadius: 12,
  margin: 12,
  elevation: 5,
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    padding: 12,
    borderRadius: 12,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  submitButtonText: {
    marginLeft: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  categoryContainer: {
    width: 100,
    height: 140,
    ...card,
    borderRadius: 12,
    padding: 12,
    margin: 12,
    justifyContent: 'space-between',
  },
  itemContainer: {
    height: 175,
    width: 100,
    position: 'relative',
  },
  bundleContainer: {
    height: 200,
    width: 150,
    margin: 12,
  },
  itemImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  courseButton: {
    width: 150,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0,
    zIndex: 1,
  },
});

export {
  CategoryButton,
  SubmitButton,
  ProfileButton,
  CourseButton,
  BundleButton,
  ItemButton,
  AnimatedButton,
  LoadingButton,
};
