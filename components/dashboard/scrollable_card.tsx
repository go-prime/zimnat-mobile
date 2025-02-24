import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const ScrollableCard = ({ label, children }) => {
  const childrenArray = React.Children.toArray(children);

  const chunkedChildren = [];
  for (let i = 0; i < childrenArray.length; i += 6) {
    chunkedChildren.push(childrenArray.slice(i, i + 6));
  }

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Vertical ScrollView for Rows */}
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Render each chunk as a row */}
        {chunkedChildren.map((chunk, index) => (
          <View key={index} style={styles.rowContainer}>
            {chunk.map((child, childIndex) => (
              <View key={childIndex} style={styles.itemContainer}>
                {child}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6, // Space between rows
  },
  itemContainer: {
    width: width / 3 - 16, // 3 items per row with spacing
    marginRight: 8, // Space between items
  },
});

export default ScrollableCard;