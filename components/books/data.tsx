import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {inputContainer} from '../../styles/inputs';
import FieldContainer from './field';
import { text } from '../../styles/text';

export default function DataField(props) {
  const [value, setValue] = React.useState(props.value);
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [value]);

  return (
    <FieldContainer
      input={props.isInput}
      read_only={props.read_only}
      hidden={props.hidden}
      mandatory={props.mandatory}
      label={props.label}>
      {props.read_only ? (
        <Text style={styles.inputText}>{props.value}</Text>
      ) : (
        <TextInput
          value={[null, undefined].includes(props.value) ? '' : props.value.toString()}
          onChangeText={setValue}
          style={styles.inputText}
          
        />
      )}
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    padding: 6,
    flex: 1,
    ...text
  },
});
