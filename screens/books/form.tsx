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
import FrappeForm from '../../scripts/frm';
import frappe from '../../scripts/frappe';

const renderField = (field, data, setData, doctype) => {
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

// previous event handlers
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function FormScreen({navigation, route}) {
  const [fields, setFields] = React.useState([]);
  const [data, setData] = React.useState({});
  const prevData = usePrevious(data)
  const [doctype, setDoctype] = React.useState('');
  const [id, setID] = React.useState('');

  const updateLocals = () => {
    // setup global object that cal look up values from any table in a multidimensional map
    const newLocals = {}
    const docname = data.name
    newLocals[doctype] = {}
    newLocals[doctype][`${docname}`] = data
    fields
      .filter(f => f.fieldtype == "Table")
      .forEach(f => {
        newLocals[f.options] = {};
        (data[f.fieldname] || []).forEach(row => {
          newLocals[f.options][row.name] = row
        })
      })

    window.locals = newLocals
  }

  const loadForm = () => {
    // retrieve schema, scripts and data from remote server
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
          eval(res.data.message.script);
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
    // post form to remote server
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
    // initialize tables with empty arrays
    const newData = {...data}
    fields
      .filter(f => f.fieldtype == "Table")
      .forEach(f => {
        newData[f.fieldname] = []
      })
    setData(newData)
  }, [fields])
  
  React.useEffect(() => {
    console.log('data update!')
    updateLocals()
    // for initial state of form
    if(!window.frm) return 

    // HACKY
    window.frm.doc = data

    // trigger events when data changes.
    let val 
    let field
    const dataFields = Array.from(Object.keys(data))
    for(let f of dataFields) {
      if(JSON.stringify(data[f]) != JSON.stringify(prevData[f])) {
        val = data[f]
        field = fields.filter(g => g.fieldname == f)[0]
        console.log({val})
        break
      }
    }
    if(!field) {
      return
    }

    if(val instanceof Array) {
      if(!prevData[field.fieldname] || prevData[field.fieldname].length != val.length) {
        // adding or removing a row, return
        return
      }
      // find diff
      val.forEach((row, i) => {
        const oldRow = prevData[field.fieldname][i]
        Object.keys(row).forEach(k => {
          if(oldRow[k] != row[k]) {
            frm.script_manager.trigger(k, field.options, row.name)
          }
        })
      })

    } else {
      frm.script_manager.trigger(field.fieldname)
    }
  }, [data])

  React.useEffect(() => {
    navigation.setOptions({title: `New ${doctype}`});
    const newData = {...data}
    newData.__islocal = 1
    newData.doctype = doctype
    newData.name = `New ${doctype}`
    setData(newData)
    loadForm();
  }, [doctype]);

  React.useEffect(() => {
    navigation.setOptions({title: `${doctype} ${id}`});
    const newData = {...data}
    newData.name = id
    delete newData['__islocal']
    setData(newData)
    loadForm();
  }, [id]);

  React.useEffect(() => {
    window.frappe = frappe
    window.frm = new FrappeForm(data, setData, fields, setFields)
    window.locals = {}
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
      {fields.map(f => renderField(f, data, setData, doctype))}
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