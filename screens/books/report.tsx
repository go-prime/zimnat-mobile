import React from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable, Alert} from 'react-native';
import axios from 'axios';
import constants from '../../constants';
import {card} from '../../styles/inputs';
import {Heading} from '../../components/text';
import Loading from '../../components/loading';

import DataField from '../../components/books/data';
import DateField from '../../components/books/date';
import BooleanField from '../../components/books/boolean';
import LinkField from '../../components/books/link';
import NumberField from '../../components/books/number';
import TextField from '../../components/books/text';
import DynamicLinkField from '../../components/books/dynamic_link';
import colors from '../../styles/colors';
import Table from '../../components/books/report_table';

const renderField = (field, filters, setFilters) => {
  let renderedField;
  const props = {
    fieldtype: field.fieldtype,
    fieldname: field.fieldname,
    options: field.options,
    mandatory: field.is_reqd,
    label: field.label,
    isInput: true,
    value: filters[field.fieldname] || null,
    onChange: val => {
      const newFilters = {...filters};
      newFilters[field.fieldname] = val;
      setFilters(newFilters);
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
    case 'DynamicLink':
      renderedField = <DynamicLinkField {...props} />;
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
  }

  return renderedField;
};

export default function ReportScreen({navigation, route}) {
  const [filters, setFilters] = React.useState({});
  const [fields, setFields] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    // capture the result
    window.frappe = {
      query_reports: {},
    };
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.report`, {
        params: {name: route.params.id},
      })
      .then(res => {
        eval(res.data.message.script);
        if (frappe.query_reports[route.params.id].filters) {
          setFields(frappe.query_reports[route.params.id].filters);
        }
        setTitle(route.params.id)
        navigation.setOptions({'title': `${route.params.id} Report`});
      });
  }, []);


  if (title.length == 0) {
    return <Loading />;
  }

  const renderResults = () => {
    axios
      .post(`${constants.server_url}/api/method/erp.public_api.report`, {
        name: route.params.id,
        filters: filters,
      })
      .then(res => {
        setColumns(res.data.message[0]);
        setData(res.data.message[1]);
      }).catch(err => {
        if (err.response) {
            JSON.parse(err.response.data._server_messages).forEach(m => {
              const msg = JSON.parse(m)
              Alert.alert(msg.title, msg.message)
            })
          }
      });
  };

  return (
    <ScrollView style={{paddingBottom: 60}}>
      <View style={styles.card}>
        <Heading>Filters</Heading>
        {fields.map(f => renderField(f, filters, setFilters))}
        <Pressable style={styles.button} onPress={renderResults}>
          <Text style={styles.buttonText}>Render</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Heading>Content</Heading>
        <ScrollView horizontal={true}>
          {data.length > 0 && (
            <Table
              data={data}
              columns={columns}
              key_field={columns[0].fieldname}
            />
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    ...card,
    margin: 12,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
