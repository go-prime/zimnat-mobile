import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import getColors from '../hooks/colors';

export default Badge = ({children, badgeColor, text, textSize}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  const padding = 4;
  const height = textSize ? textSize + padding * 2 : padding * 2;
  const width = text && text.length > 2 ? height * 2 : height;

  const badgeStyle = {
    borderRadius: height / 2,
    height: height,
    position: 'absolute',
    elevation: 5,
    width: width,
    zIndex: 100,
    bottom: 0 - height / 1.5,
    right: 0,
    backgroundColor: badgeColor ? badgeColor : colorScheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overFlow: 'hidden',
  };
  const textStyle = {
    fontSize: textSize ? textSize : 6,
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    padding: 0,
  };

  return (
    <View style={styles.container}>
      {children}
      {text && (
        <View style={badgeStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});
