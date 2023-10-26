import React from 'react';

import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Circle} from './layout';
import ImageIcon from './image';
import {card} from '../styles/inputs';
import {Label, SmallLabel} from './text';
import {getAbsoluteURL} from '../utils';
import ProgressBar from './edutec/progress';

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
  console.log(name)
  return (
    <Pressable style={{width: 150, marginRight: 12}} onPress={onPress}>
      <View style={styles.courseButton} >
      <ImageIcon width={150} height={100} url={getAbsoluteURL(image_url)} />
      {progress != undefined && <ProgressBar
            progress={progress}
            styles={styles.progressStyle}
          />}
      </View>
      
      <Label bold label={name} />
    </Pressable>
  );
};

const BundleButton = ({onPress, image_url, name}) => {
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
      <Label label={name} />
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

const styles = StyleSheet.create({
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
    height: 175,
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

export {CategoryButton, CourseButton, BundleButton, ItemButton};
