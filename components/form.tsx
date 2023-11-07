import React from 'react';
import {View, Text, TextInput, StyleSheet, Appearance} from 'react-native';
import { card, text } from '../styles/inputs';
import { getAbsoluteURL } from '../utils';
import { Label } from './text';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
const LinkField = ({value, onChange, label, doctype, filters, label_field}) => {
  const [options, setOptions] = React.useState([])
  React.useEffect(() => {
    axios.get(getAbsoluteURL('/api/method/billing_engine.billing_engine.api.get_link_options'), {
      params: {
        doctype: doctype,
        label_field: label_field,
        filters: filters
      }})
      .then(res => {
        setOptions(res.data.message)
      })
      .catch(err => {
        console.log(err)
        console.log(err.response.data)
      })
  }, [])

  return (<View>
    <View style={{paddingLeft: 8}}><Label>{label}</Label></View>
    <View style={styles.inputContainer}>
    <Picker selectedValue={value} onValueChange={(val, idx) => onChange(val)}>
      {options && options.map(opt => (<Picker.Item label={opt[label_field]} value={opt.name} />))}
    </Picker>
    </View>
  </View>)

}

export {LinkField}

export default Field = ({value, onTextChange, label, multiline, password}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onTextChange}
        style={styles.input}
        placeholder={label}
        secureTextEntry={password || false}
        numberOfLines={multiline ? 4 : 1}
        placeholderTextColor={Appearance.getColorScheme() == "dark" ?  "white" : 'black'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 4,
        ...card,
        margin: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        flex: 1
      },
      input: {
        ...text,
        fontSize: 18,
        textAlignVertical: 'top',
      },
});
