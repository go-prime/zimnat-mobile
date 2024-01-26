import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import constants from '../../constants';
import colors from '../../styles/colors';
import {card, iconColor} from '../../styles/inputs';
import {background, text} from '../../styles/text';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faRefresh } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/loading';

export default function ListScreen({navigation, route}) {
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [doctype, setDoctype] = React.useState('');
  const [filters, setFilters] = React.useState({});

  const loadEntries = () => {
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.list`, {
        params: {doctype: doctype},
      })
      .then(res => {
        console.log(res.data.message);
        if (res.data.message.meta) {
          setColumns(
            res.data.message.meta.fields.filter(f => f.in_list_view > 0),
          );
          setData(res.data.message.data);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  React.useEffect(() => {
    navigation.setOptions({title: `${doctype} List`});
    loadEntries()
  }, [doctype]);

  React.useEffect(() => {
    setDoctype(route.params.doctype);
  }, []);

  if(!columns || columns.length < 1) {
    return <Loading />
  }

  return (
    <View style={{backgroundColor: background.color, flex: 1}}>
      <View style={styles.controls}>
        
        <View style={styles.filterContainer}>
          <Pressable style={styles.filters}>
            <FontAwesomeIcon icon={faFilter} color={colors.primary} size={18} />
            <Text style={{fontSize: 18}}>Filter</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => {
          navigation.navigate("Form", {doctype: doctype})
        }} style={styles.button}>
          <Text>Create New</Text>
        </Pressable>
        <Pressable onPress={loadEntries} style={styles.refreshButton}>
          <FontAwesomeIcon icon={faRefresh} color={colors.primary} size={24} />
        </Pressable>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <View style={styles.heading}>
            <View>
              <Text style={styles.header}>ID</Text>
            </View>
            {columns.map(col => (
              <View>
                <Text style={styles.header}>{col.label}</Text>
              </View>
            ))}
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.name}
            renderItem={item => (
              <View style={styles.row}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Form', {
                      doctype: doctype,
                      id: item.item.name,
                    });
                  }}>
                  <Text style={styles.cell}>{item.item.name}</Text>
                </Pressable>
                {columns.map(col => {
                  console.log({col, item})
                  return (
                  <View>
                    <Text style={styles.cell}>{item.item[col.fieldname]}</Text>
                  </View>
                )})}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  heading: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 4,
    ...card,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    borderRadius: 5,
    width: 200,
    ...text,
  },
  header: {
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    minWidth: 200,
    width: 200,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 6,
    width: 100,
  },
  refreshButton: {
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12
  },
  filters: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 24,
    flexDirection: 'row',
    padding: 6,
    width: 100,
    justifyContent: 'space-around',
    margin: 12,
    alignItems: 'center'
  },
  controls: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterContainer: {
    flex: 1
  }
});
