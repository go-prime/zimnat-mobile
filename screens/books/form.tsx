import React from 'react';
import {
  ScrollView,
  Alert,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import {text} from '../../styles/text';
import {iconColor} from '../../styles/inputs';
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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      data: {},
      doctype: props.route.params.doctype,
      id: '',
    };
    // frappe form
    this.fields_dict= {}
    this.script_manager = {
      trigger: (a, b, c) => {
        console.log({a,b,c})
        if (b) {
          if (frappe.ui.form.events[b] && frappe.ui.form.events[b][a]) {
            console.log(frappe.ui.form.events[b][a])
            frappe.ui.form.events[b][a](window.frm, b, c);
          }
          return;
        }
        if (
          frappe.ui.form.events[this.doc.doctype] &&
          frappe.ui.form.events[this.doc.doctype][a]
        ) {
          console.log(frappe.ui.form.events[this.doc.doctype][a])
          frappe.ui.form.events[this.doc.doctype][a](window.frm);
        }
      }
    }
  }

  loadForm() {
    const params = {doctype: this.state.doctype};
    if (this.state.id) {
      params.id = this.state.id;
    }
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.form`, {
        params: params,
      })
      .then(res => {
        if (res.data.message.meta) {
          this.setState({
            fields: res.data.message.meta.fields,
            data: {...this.state.data, ...res.data.message.data},
          });
          eval(res.data.message.script);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  updateLocals() {
    const newLocals = {};
    const docname = this.state.data.name;
    newLocals[this.state.doctype] = {};
    newLocals[this.state.doctype][`${docname}`] = this.state.data;
    this.state.fields
      .filter(f => f.fieldtype == 'Table')
      .forEach(f => {
        newLocals[f.options] = {};
        (this.state.data[f.fieldname] || []).forEach(row => {
          newLocals[f.options][row.name] = row;
        });
      });

    window.locals = newLocals;
  }

  /**
   * frappe form
   */

  get doc() {
    return this.state.data
  }

  get schema() {
    return this.state.fields
  }

  setData(data) {
    this.setState({data: data})
  }

  set_value(fieldname, value) {
    const newData = {...this.doc};
    newData[fieldname] = value;
    this.setData(newData);
    window.frm.doc = newData;
    this.script_manager.trigger(fieldname);
  }
  set_query(query) {}
  refresh_field(fieldname) {}
  refresh() {}
  disable_save() {}
  add_custom_button() {}
  
  // End frappe form

  componentDidMount() {
    window.frappe = frappe;
    window.frm = this;
    window.locals = {};
    this.setState({doctype: this.props.route.params.doctype});
    this.props.navigation.setOptions({title: `New ${this.state.doctype}`});
    const newData = {...this.state.data};
    newData.__islocal = 1;
    newData.doctype = this.state.doctype;
    newData.name = `New ${this.state.doctype}`;
    this.setState({data: newData});
    this.loadForm();

    if (this.props.route.params.id) {
      this.setState({id: this.props.route.params.id});
    }
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    if (prevState.id != this.state.id && this.state.id) {
      navigation.setOptions({title: `${doctype} ${id}`});
      const newData = {...this.state.data};
      newData.name = this.state.id;
      delete newData.__islocal;
      this.setState({data: newData});
      this.loadForm();
    }

    if (this.state.data != prevState.data) {
      this.onDataUpdate(prevState.data);
    }
  }

  onDataUpdate(prevData) {
    this.updateLocals();
    // for initial state of form
    if (!window.frm) {
      return;
    }

    // HACKY -- replaced by class based app
    // window.frm.doc = data

    // trigger events when data changes.
    let val;
    let field;
    const dataFields = Array.from(Object.keys(this.state.data));
    for (let f of dataFields) {
      if (JSON.stringify(this.state.data[f]) != JSON.stringify(prevData[f])) {
        val = this.state.data[f];
        field = this.state.fields.filter(g => g.fieldname == f)[0];
        console.log({val});
        break;
      }
    }
    if (!field) {
      return;
    }

    if (val instanceof Array) {
      if (
        !prevData[field.fieldname] ||
        prevData[field.fieldname].length != val.length
      ) {
        // adding or removing a row, return
        return;
      }
      // find diff
      val.forEach((row, i) => {
        const oldRow = prevData[field.fieldname][i];
        Object.keys(row).forEach(k => {
          if (oldRow[k] != row[k]) {
            frm.script_manager.trigger(k, field.options, row.name);
          }
        });
      });
    } else {
      frm.script_manager.trigger(field.fieldname);
    }
  }

  saveDocument() {
    // post form to remote server
    axios
      .post(`${constants.server_url}/api/method/erp.public_api.form`, {
        doctype: this.state.doctype,
        args: {...this.state.data, doctype: this.state.doctype},
      })
      .then(res => {
        if (res.data.message) {
          Alert.alert(
            'Success',
            `Saved ${this.state.doctype} ${res.data.message} successfully`,
          );
          this.props.navigation.navigate('List', {doctype: this.state.doctype});
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }

  render() {
    if (!this.state.fields || this.state.fields.length < 1) {
      return <Loading />;
    }

    return (
      <ScrollView>
        {this.state.fields.map(f =>
          renderField(
            f,
            this.state.data,
            newData => this.setState({data: newData}),
            this.state.doctype,
          ),
        )}
        <View style={styles.footer}>
          <Pressable style={styles.button} onPress={this.saveDocument}>
            <FontAwesomeIcon icon={faSave} size={24} color={iconColor} />
            <Text style={{...text, fontSize: 24}}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
}

export default function FormScreen({navigation, route}) {
  return <Form navigation={navigation} route={route} />;
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
    width: 140,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
