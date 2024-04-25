import React from 'react';
import {View, TextInput, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/colors';
import FieldContainer from './field';
import {inputText} from '../../styles/inputs';

const convertDateToString = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export default function DateField(props) {
  const [value, setValue] = React.useState(null)
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if(value && convertDateToString(value) != props.value) {
      props.onChange(convertDateToString(value));
    }
  }, [value]);
  React.useEffect(() => {
    if(props.value && !value) {
      setValue(new Date(props.value))
    }
  }, [props])

  return (
    <View>
      <FieldContainer
        input={props.isInput}
        read_only={props.read_only}
        mandatory={props.mandatory}
        hidden={props.hidden}
        label={props.label}>
        <Pressable onPress={() => setShow(true)}>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size={20}
            color={colors.primary}
          />
        </Pressable>
        <Text style={styles.inputText}>{value && value.toDateString()}</Text>
      </FieldContainer>
      {show && (
        <DateTimePicker
          mode="date"
          value={value || new Date()}
          onChange={(event, date) => {
            setValue(date);
            setShow(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: inputText,
});
