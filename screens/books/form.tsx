import React from 'react';
import {ScrollView, Alert, Text, View, StyleSheet, Pressable} from 'react-native';
import axios from 'axios';
import constants from '../../constants';
import DataField from '../../components/books/data';
import DateField from '../../components/books/date';
import BooleanField from '../../components/books/boolean';
import LinkField from '../../components/books/link';
import NumberField from '../../components/books/number';
import TextField from '../../components/books/text';
import Loading from '../../components/loading';
import TableField from '../../components/books/table';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import { text } from '../../styles/text';
import { iconColor } from '../../styles/inputs';

const renderField = (field, data, setData) => {
  let renderedField;
  const props = {
    fieldtype: field.fieldtype,
    fieldname: field.fieldname,
    options: field.options,
    hidden: field.hidden,
    mandatory: field.mandatory,
    label: field.label,
    read_only: field.read_only,
    isInput: true,
    value: data[field.fieldname] || null,
    onChange: val => {
      console.log(val);
      const newData = {...data};
      newData[field.fieldname] = val;
      setData(newData);
    },
  };
  switch (field.fieldtype) {
    case 'Data':
      renderedField = <DataField {...props} />;
      break;
    case 'Date':
      renderedField = <DateField {...props} />;
      break;
    case 'Check':
      renderedField = <BooleanField {...props} />;
      break;
    case 'Link':
      renderedField = <LinkField {...props} />;
      break;
    case 'Int':
    case 'Float':
    case 'Currency':
      renderedField = <NumberField {...props} />;
      break;
    case 'Small Text':
    case 'Long Text':
    case 'Text':
    case 'Text Editor':
      renderedField = <TextField {...props} />;
      break;
    case 'Table':
      renderedField = <TableField {...props} />;
  }

  return renderedField;
};

export default function FormScreen({navigation, route}) {
  const [fields, setFields] = React.useState([]);
  const [data, setData] = React.useState({});
  const [doctype, setDoctype] = React.useState('');
  const [id, setID] = React.useState('');

  const loadForm = () => {
    const params = {doctype: doctype};
    if (id) {
      params.id = id;
    }
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.form`, {
        params: params,
      })
      .then(res => {
        if (res.data.message.meta) {
          setFields(res.data.message.meta.fields);
          setData(res.data.message.data);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  const saveDocument = () => {
    axios
      .post(
        `${constants.server_url}/api/method/erp.public_api.form`, 
        {doctype: doctype, args: {...data, doctype: doctype}}
      )
      .then(res => {
        if (res.data.message) {
          Alert.alert("Success", `Saved ${doctype} ${res.data.message} successfully`)
          navigation.navigate("List", {doctype: doctype})
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
    navigation.setOptions({title: `New ${doctype}`});
    loadForm();
  }, [doctype]);

  React.useEffect(() => {
    navigation.setOptions({title: `${doctype} ${id}`});
    loadForm();
  }, [id]);

  React.useEffect(() => {
    setDoctype(route.params.doctype);
    if (route.params.id) {
      setID(route.params.id);
    }
  }, []);

  if (!fields || fields.length < 1) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {fields.map(f => renderField(f, data, setData))}
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={saveDocument}>
          <FontAwesomeIcon icon={faSave} size={24} color={iconColor} />
          <Text style={{...text, fontSize: 24}}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: 140
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})