import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import getColors from '../hooks/colors';
import {Row} from './layout';
import { text, card } from '../styles/inputs';

export default Table = ({data, columns, key_field, sm, onRowPress}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);

  return (
    <View style={styles.container}>
      <View style={[sm ? styles.headerSm : styles.header, {backgroundColor: colorScheme.primary}]}>
        {columns.map(c => (
          <Text
            key={c.label}
            style={[sm ? styles.headerColumnSm : styles.headerColumn, {flex: c.ratio || 1, textAlign: c.align || 'left'}]}>
            <Text>{c.label}</Text>
          </Text>
        ))}
      </View>
      <View style={styles.body}>
        {data.map(d => (
          <Pressable onPress={() => {onRowPress ? onRowPress(d) : null}} style={[sm ? styles.rowSm : styles.row]} key={d[key_field]}>
            {columns.map(c => (
              <Text
                key={c.label}
                style={[sm ? styles.rowColumnSm : styles.rowColumn, {flex: c.ratio || 1, textAlign: c.align || 'left'}]}>
                {d[c.fieldname]}
              </Text>
            ))}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  headerSm: {
    padding: 6,
    flexDirection: 'row',
  },
  headerColumnSm: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16
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
  },
  rowSm: {
    flexDirection: 'row',
    ...card,
    padding: 6
  },
  rowColumnSm: {
    ...text,
    fontSize: 16
  }

});
