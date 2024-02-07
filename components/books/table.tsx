import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import Schema from '../../models/schema';
import colors from '../../styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faEdit, faSave} from '@fortawesome/free-solid-svg-icons';
import {card, text} from '../../styles/inputs';
import DataField from './data';
import BooleanField from './boolean';
import DateField from './date';
import TimeField from './time';
import SelectField from './select';
import NumberField from './number';
import LinkField from './link';
import axios from 'axios';
import constants from '../../constants';
import DynamicLinkField from './dynamic_link';
import {Modal} from 'react-native';

const randomID = () => {
  const options =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const out = [];
  for (i = 0; i < 10; i++) {
    out.push(options[Math.floor(Math.random() * 51)]);
  }

  return out.join('');
};

const Heading = props => {
  return (
    <View style={styles.heading}>
      <View style={styles.buttonHeadingColumn} />
      {props.schema
        .filter(s => !s.hidden && (s.in_list_view || s.in_grid_view))
        .map((field, i) => (
          <View style={styles.headingColumn} key={i}>
            <Text style={styles.headingText}>{field.label}</Text>
          </View>
        ))}
      <View style={styles.buttonHeadingColumn} />
    </View>
  );
};

const renderTableField = (
  field: any,
  data: any,
  handler: Function,
  is_input: boolean,
) => {
  let element;
  const value = (data && data[field.fieldname]) || null;
  const props = {
    fieldtype: field.fieldtype,
    fieldname: field.fieldname,
    options: field.options,
    hidden: field.hidden,
    mandatory: field.mandatory,
    label: field.label,
    read_only: field.read_only,
    isInput: is_input,
    value: value,
    formData: data,
    onChange: val => {
      handler(field.fieldname, val);
    },
  };
  switch (field.fieldtype) {
    case 'Data':
    case 'Small Text':
    case 'Long Text':
    case 'Text':
    case 'Text Editor':
      element = <DataField {...props} key={field.id} />;
      break;
    case 'Check':
      element = <BooleanField {...props} key={field.id} />;
      break;
    case 'Int':
    case 'Float':
    case 'Currency':
      element = <NumberField {...props} key={field.id} />;
      break;
    case 'Select':
      element = <SelectField {...props} key={field.id} />;
      break;
    case 'Link':
      element = <LinkField {...props} key={field.id} />;
      break;
    case 'Dynamic Link':
      element = <DynamicLinkField {...props} key={field.id} />;
      break;
    case 'Date':
      element = <DateField {...props} key={field.id} />;
      break;
    case 'Time':
      element = <TimeField {...props} key={field.id} />;
      break;
    case 'Column Break':
    case 'Section Break':
      element = <View style={{height: 0}} key={field.id} />;
      break;
    default:
      element = <DataField {...props} key={field.id} />;
      break;
  }

  return element;
};

const Body = props => {
  const updateEntries = (index: number, entry: object) => {
    const newEntries = [...props.entries];
    newEntries[index] = entry;
    props.setEntries(newEntries);
  };
  return (
    <>
      {props.entries &&
        props.entries.map((entry, index) => (
          <Row
            key={index}
            index={index}
            entry={entry}
            updateEntries={updateEntries}
            modalTrigger={props.modalTrigger}
            schema={props.schema}
            removeRow={props.removeRow}
          />
        ))}
    </>
  );
};

const Row = props => {
  const handler = (fieldname: string, value: any) => {
    const newEntry = {...props.entry};
    newEntry[fieldname] = value;
    props.updateEntries(props.index, newEntry);
  };

  return (
    <View style={styles.row}>
      <View style={styles.buttonColumn}>
        <Pressable onPress={() => props.removeRow(props.index)}>
          <FontAwesomeIcon icon={faTimes} size={28} color={'crimson'} />
        </Pressable>
      </View>
      {props.schema
        .filter(s => !s.hidden && (s.in_list_view || s.in_grid_view))
        .map(field => {
          return (
            <View style={styles.column} key={field.fieldname}>
              {props.schema &&
                renderTableField(
                  field,
                  props.entry,
                  handler,
                  props.read_only_view,
                  false,
                )}
            </View>
          );
        })}
      <View style={styles.buttonColumn}>
        <Pressable
          onPress={() => props.modalTrigger(props.index, props.read_only_view)}>
          <FontAwesomeIcon icon={faEdit} size={28} color={'black'} />
        </Pressable>
      </View>
    </View>
  );
};

const Footer = props => {
  return (
    <View style={styles.footer}>
      <Pressable onPress={props.addRow}>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>Add Row</Text>
        </View>
      </Pressable>
    </View>
  );
};

const RowModal = props => {
  const handler = (fieldname, value) => {
    const newEntry = {...props.entries[props.index]};
    newEntry[fieldname] = value;
    props.updateEntry(props.index, newEntry);
  };
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      onRequestClose={props.onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Edit Row</Text>
          <View style={styles.modalButtonContainer}>
            <Pressable style={styles.modalButton} onPress={props.onClose}>
              <FontAwesomeIcon icon={faTimes} size={20} />
            </Pressable>
          </View>
        </View>
        <ScrollView>
          {props.schema
            .filter(s => !s.hidden)
            .map(field => {
              return renderTableField(
                field,
                props.entries[props.index],
                handler,
                true,
              );
            })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default function TableField(props) {
  const [schema, setSchema] = React.useState([]);
  const [entries, setEntries] = React.useState(props.value);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalReadOnly, setModalReadOnly] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(null);

  const addRow = () => {
    const row = {
      idx: (entries || []).length,
      __islocal: 1,
      name: `New ${props.options} ${randomID()}`,
    };
    schema.map(field => {
      row[field.fieldname] = null;
    });
    if (!entries) {
      setEntries([row]);
      return;
    }
    const newEntries = [...entries];
    newEntries.push(row);
    setEntries(newEntries);
  };

  const removeRow = index => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const showRowTable = (rowIndex, read_only) => {
    setModalVisible(true);
    setModalReadOnly(read_only);
    setModalIndex(rowIndex);
  };

  const updateEntry = (idx, newEntry) => {
    // Only applicable for modal
    const newEntries = [...entries];
    newEntries[idx] = newEntry;
    setEntries(newEntries);
  };

  React.useEffect(() => {
    if (!(entries && entries.length > 0)) {
      return;
    }
    entries.forEach((e, i) => {
      Object.keys(e).forEach(k => {
        if (props.value && props.value[i] && e[k] != props.value[i][k]) {
          console.log(`${e[k]} != ${props.value[i][k]}`);
        }
      });
    });
    props.onChange(entries);
  }, [entries]);

  React.useEffect(() => {
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.form`, {
        params: {
          doctype: props.options,
        },
      })
      .then(res => {
        setSchema(res.data.message.meta.fields);
      });
    if (props.value) {
      setEntries(props.value);
    }
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(props.value) != JSON.stringify(entries)) {
      setEntries(props.value);
    }
  }, [props.value]);

  if (!(schema && schema.length > 0)) {
    return <View style={{height: 0}} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <Heading schema={schema} />
          <Body
            entries={entries}
            schema={schema}
            removeRow={removeRow}
            form={props.form}
            setEntries={setEntries}
            modalTrigger={showRowTable}
          />
          <Footer addRow={addRow} />
        </View>
      </ScrollView>
      <RowModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        entries={entries}
        index={modalIndex}
        schema={schema}
        read_only_view={modalReadOnly}
        updateEntry={updateEntry}
      />
    </View>
  );
}

export {randomID};

const baseColumn = {
  // borderRightWidth: 1,
  // borderLeftWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#eee',
};

const baseHeadingColumn = {
  padding: 8,
  borderRightWidth: 1,
  backgroundColor: colors.primary,
  borderColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 24,
  },
  table: {
    ...card,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    ...text,
    marginBottom: 8,
  },
  heading: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  row: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    ...card,
    borderColor: '#eee',
    padding: 0,
  },
  footer: {
    borderWidth: 1,
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    ...card,
    borderColor: '#ccc',
  },
  column: {
    ...baseColumn,
    width: 200,
    alignItems: 'left',
  },
  buttonColumn: {...baseColumn, width: 40},
  headingColumn: {
    ...baseHeadingColumn,
    width: 200,
  },
  buttonHeadingColumn: {
    ...baseHeadingColumn,
    width: 40,
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.primary,
    width: 75,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonLabel: {
    color: 'white',
  },
  readOnlyContainer: {
    padding: 8,
  },
  readOnlyText: {
    color: 'black',
    fontSize: 16,
  },
  readOnlyHeader: {
    ...baseHeadingColumn,
    width: 200,
    backgroundColor: 'black',
  },
  modalContainer: {
    margin: 24,
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalButton: {
    padding: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
