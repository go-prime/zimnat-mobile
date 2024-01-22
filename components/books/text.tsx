import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {inputContainer, inputText, label} from '../../styles/inputs';
import FieldContainer from './field';

export default function TextField(props) {
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
      label={props.label}>
      {props.read_only ? (
        <Text style={styles.inputText} numberOfLines={4}>
          {props.value}
        </Text>
      ) : (
        <TextInput
          value={props.value}
          onChangeText={setValue}
          style={props.read_only ? styles.readOnlyInput : styles.inputText}
          multiline={true}
          numberOfLines={props.isInput ? 4 : 1}
        />
      )}
    </FieldContainer>
  );
}

const styles = StyleSheet.create({
  inputText: inputText,
  readOnlyInput: {...inputText, backgroundColor: 'red'},
});
