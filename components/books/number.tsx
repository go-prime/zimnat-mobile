import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';
import {inputText} from '../../styles/inputs';
import FieldContainer from './field';

export default function NumberField(props) {
  const [value, setValue] = React.useState(props.value);
  React.useEffect(() => {
    props.onChange(parseFloat(value));
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
          value={[null, undefined].includes(props.value) ? 0 : props.value.toString() }
          keyboardType="numeric"
          onChangeText={setValue}
          style={styles.inputText}
        />
      )}
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputText: inputText,
});
