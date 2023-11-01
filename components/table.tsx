import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import getColors from '../hooks/colors';
import {Row} from './layout';
import { text, card } from '../styles/inputs';

export default Table = ({data, columns, key_field}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: colorScheme.primary}]}>
        {columns.map(c => (
          <Text
            key={c.label}
            style={[styles.headerColumn, {flex: c.ratio || 1}]}>
            <Text>{c.label}</Text>
          </Text>
        ))}
      </View>
      <View style={styles.body}>
        {data.map(d => (
          <View style={[styles.row]} key={d[key_field]}>
            {columns.map(c => (
              <Text
                key={c.label}
                style={[styles.rowColumn, {flex: c.ratio || 1}]}>
                {d[c.fieldname]}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 6,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
  },
  headerColumn: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  },
  body: {},
  row: {
    flexDirection: 'row',
    ...card,
    padding: 12
  },
  rowColumn: {
    ...text,
    fontSize: 20
  }
});
