import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import getColors from '../../hooks/colors';
import {Row} from '../layout';
import {text, card} from '../../styles/inputs';
import {randomID} from './table';

const renderReportColumn = (column, value, navigator) => {
  let renderedField;
  switch (column.fieldtype) {
    case 'Currency':
      renderedField = (
        <Text style={{...text, flex: 1, textAlign: 'right'}}>
          {parseFloat(value).toFixed(2)}
        </Text>
      );
      break;

    case 'Float':
      renderedField = (
        <Text style={{...text, flex: 1, textAlign: 'right'}}>
          {parseFloat(value).toFixed(3)}
        </Text>
      );
      break;

    case 'Link':
        renderedField = (
          <Pressable onPress={() => {
            navigator.navigate("Form", {doctype: column.options, id: value})
          }}>
              <Text style={{...text, fontWeight: 700}}>
              {value}
            </Text>
          </Pressable>
        );
        break;
    default:
      renderedField = <Text style={{...text, flex: 1, textAlign: 'left'}}>{value}</Text>;
  }
  return renderedField;
};

export default Table = ({data, columns}) => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  console.log(columns);

  return (
    <View style={styles.container}>
      <View style={[styles.headerSm, {backgroundColor: colorScheme.primary}]}>
        {columns.map(c => (
          <Text
            key={c.fieldname}
            style={[
              styles.headerColumnSm,
              {flex: c.ratio || 1, textAlign: c.align || 'left'},
            ]}>
            <Text>{c.label}</Text>
          </Text>
        ))}
      </View>
      <View style={styles.body}>
        {data.map(d => (
          <View style={styles.rowSm}>
            {columns.map(c => (
              <View key={randomID()} style={[styles.rowColumnSm, {flex: 1}]}>
                {renderReportColumn(c, d[c.fieldname], navigation)}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    padding: 12,
    flexDirection: 'row',
  },
  headerColumn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerSm: {
    padding: 6,
    flexDirection: 'row',
  },
  headerColumnSm: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    width: 150,
    overflow: 'hidden',
  },
  body: {},
  row: {
    flexDirection: 'row',
    ...card,
    padding: 12,
  },
  rowColumn: {
    ...text,
    fontSize: 20,
  },
  rowSm: {
    flexDirection: 'row',
    ...card,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowColumnSm: {
    ...text,
    fontSize: 16,
    textAlign: 'left',
    width: 150,
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 3,
  },
});
