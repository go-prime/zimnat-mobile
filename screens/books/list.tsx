import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import axios from 'axios';
import constants from '../../constants';
import colors from '../../styles/colors';
import {card, iconColor} from '../../styles/inputs';
import {background, text} from '../../styles/text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFilter,
  faRefresh,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/loading';
import {Picker} from '@react-native-picker/picker';
import LinkField from '../../components/books/link';
import NumberField from '../../components/books/number';
import DataField from '../../components/books/data';
import { textStyles } from '../../components/text';
import { useIsFocused } from '@react-navigation/native';
import handleResourceRetrievalError from '../../scripts/permissions';


const ValueWidget = ({field, value, onChange}) => {
  if(!field) {
    return <View />
  }
  const widgetProps = {
    fieldtype: field.fieldtype,
    fieldname: field.fieldname,
    options: field.options,
    hidden: false,
    mandatory: false,
    label: "Value",
    read_only: false,
    is_input: true,
    value: value,
    onChange: (value) => {
      onChange(value)
    }
  }

  let widget
  switch(field.fieldtype) {
    case "Link":
      widget = <LinkField {...widgetProps} />
      break;
    case "Currency":
    case "Float":
    case "Int":
      widget = <NumberField {...widgetProps} />
      break;
    default:
      widget = <DataField {...widgetProps} />
      break;
  }
  return widget
}


const Badge = ({field, value, clearFilter}) => {
  return (<View style={styles.badge}>
    <Text style={styles.badgeText}>{`${field} = ${value}`}</Text>
    <Pressable onPress={() => clearFilter(field)} >
      <FontAwesomeIcon icon={faTimesCircle} size={20} color={'steelblue'} />
    </Pressable>
  </View>)
}


export default function ListScreen({navigation, route}) {
  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [doctype, setDoctype] = React.useState('');
  const [filters, setFilters] = React.useState({});
  const [filtersVisible, setFiltersVisible] = React.useState(false);
  const [currentField, setCurrentField] = React.useState('')
  const [filterType, setFilterType] = React.useState('')
  const [filterValue, setFilterValue] = React.useState(null)

  const isFocused = useIsFocused()

  const applyFilter = () => {
    const newFilters = {...filters}
    let value = filterValue
    if(filterType == "!=") {
      value = ['!=', filterValue]
    }
    if(filterType == "%") {
      value = ['like', `%${filterValue}%`]
    }

    if(filterType == "!%") {
      value = ['not like', `%${filterValue}%`]
    }
    newFilters[currentField] = value
    setFilters(newFilters)
    setFiltersVisible(false)
  }

  const clearFilter = () => {
    const newFilters = {...filters}
    delete newFilters[currentField]
    setFilters(newFilters)
  }

  const loadEntries = () => {
    console.log(`Doctype ${doctype}`)
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.list`, {
        params: {doctype: doctype},
      })
      .then(res => {
        if (res.data.message.meta) {
          let newColumns = []
          if (res.data.message.meta.is_submittable) {
            newColumns.push({
              fieldname: 'docstatus',
              fieldtype: 'Data',
              label: 'Status'
            })
          }
          newColumns = newColumns.concat(res.data.message.meta.fields.filter(f => f.in_list_view > 0))
          setColumns(newColumns);
          setFields(res.data.message.meta.fields)
          setData(res.data.message.data);
        }
      })
      .catch(err => {
        handleResourceRetrievalError(err, navigation)
      });
  };


  React.useEffect(() => {
    if(![null, ""].includes(doctype)) {
      navigation.setOptions({title: `${doctype} List`});
      loadEntries();
    }
    
  }, [isFocused, doctype]);

  React.useEffect(() => {
    setDoctype(route.params.doctype);
  }, []);

  React.useEffect(() => {
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.list`, {
        params: {doctype: doctype, filters: JSON.stringify(filters)},
      })
      .then(res => {
        setData(res.data.message.data);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, [filters])

  if (!columns || columns.length < 1) {
    return <Loading />;
  }

  return (
    <View style={{backgroundColor: background.color, flex: 1}}>
      <View style={styles.controls}>
        <View style={styles.filterContainer}>
          <Pressable
            style={styles.filters}
            onPress={() => setFiltersVisible(true)}>
            <FontAwesomeIcon icon={faFilter} color={colors.primary} size={18} />
            <Text style={{fontSize: 18}}>Filter</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Form', {doctype: doctype});
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Create New</Text>
        </Pressable>
        <Pressable onPress={loadEntries} style={styles.refreshButton}>
          <FontAwesomeIcon icon={faRefresh} color={colors.primary} size={24} />
        </Pressable>
      </View>
      <View style={styles.badgeContainer}>
        {Object.keys(filters).map(k => <Badge key={k} field={k} value={filters[k]} clearFilter={clearFilter} />)}
      </View>
      <ScrollView horizontal={true}>
        <View>
          <View style={styles.heading}>
            <View>
              <Text style={styles.header}>ID</Text>
            </View>
            {columns.map(col => (
              <View key={col.label}>
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
                  <Text style={{...styles.cell, fontWeight: 'bold'}}>{item.item.name}</Text>
                </Pressable>
                {columns.map(col => {
                  if (col.fieldname == "docstatus") {
                    return (
                      <View key={col.fieldname}>
                        <Text style={{...styles.cell, fontWeight: '700', color: item.item[col.fieldname] == 0 ? "tangerine" : "steelblue" }}>
                          {item.item[col.fieldname] == 0 ? "Draft" : "Submitted" }
                        </Text>
                      </View>
                    );
                  }
                  return (
                    <View  key={col.fieldname}>
                      <Text style={styles.cell}>
                        {item.item[col.fieldname]}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          />
        </View>
      </ScrollView>
      <Modal transparent={true} visible={filtersVisible}>
        <ScrollView style={styles.modalContainer}>
          <View>
            <Text style={textStyles.label}>Field:</Text>
            <Picker selectedValue={currentField} onValueChange={(value, idx) => {
              setCurrentField(value)
            }}>
            <Picker.Item label="-Select Value-" value={''} />
              {fields
                .filter(f => !['Column Break', 'Section Break', 'HTML']
                .includes(f.fieldtype)).map(f => <Picker.Item label={f.label} value={f.fieldname} key={f.fieldname}/>)}
            </Picker>
          </View>
          <View>
            <Text style={textStyles.label}>Filter By:</Text>
            <Picker selectedValue={filterType} onValueChange={setFilterType}>
              <Picker.Item label="-Select Value-" value={''} key={1} />
              <Picker.Item label="EQUALS" value={'='}  key={2}/>
              <Picker.Item label="NOT EQUALS" value={'!='}  key={3}/>
              <Picker.Item label="LIKE" value={'%'}  key={4}/>
              <Picker.Item label="NOT LIKE" value={'!%'}  key={5}/>
            </Picker>
          </View>
          <View>
            <Text style={textStyles.label}>Value</Text>
            <ValueWidget field={fields && currentField 
                ? fields.filter(f => f.fieldname == currentField)[0] 
                : null}
                value={filterValue}
                onChange={setFilterValue} />
            <View />
          </View>
          <Pressable style={styles.filterModalButton} onPress={applyFilter}>
            <Text style={styles.filterModalTextButton}>Filter</Text>
          </Pressable>
        </ScrollView>
      </Modal>
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
    marginLeft: 12,
  },
  filters: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 6,
    width: 100,
    justifyContent: 'space-around',
    margin: 12,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterContainer: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
  },
  modalContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: '60%',
    margin: 24,
  },
  filterModalButton: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'steelblue',
    padding: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterModalTextButton: {
    color: 'steelblue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  badge: {
    borderColor: 'steelblue',
    borderWidth: 2,
    padding: 4,
    borderRadius: 18,
    height: 36,
    flexDirection: 'row',
    margin: 4,
    gap: 12,
    paddingHorizontal: 18,
    alignItems: 'center'
  },
  badgeText: {
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 18
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
