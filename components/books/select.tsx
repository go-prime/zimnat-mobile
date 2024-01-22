import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FieldContainer from './field';

export default function SelectField(props) {
  const [value, setValue] = React.useState(props.value);
  
  React.useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <FieldContainer
      input={props.isInput}
      read_only={props.read_only}
      hidden={props.hidden}
      mandatory={props.mandatory}
      picker
      label={props.label}>
      {props.read_only ? (
        <Text style={styles.inputText}>{props.value}</Text>
      ) : (
        <Picker
          selectedValue={value}
          style={{color: 'black'}}
          dropdownIconColor={'black'}
          onValueChange={(itemValue, itemIndex) => {
            setValue(itemValue);
          }}>
          <Picker.Item label="Select" value="" />
          {props.options.split('\n').map((option, index) => (
            <Picker.Item key={index} value={option} label={option} />
          ))}
        </Picker>
      )}
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#dedede',
    padding: 2,
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  inputText: {
    fontSize: 16,
    padding: 6,
  },
});
