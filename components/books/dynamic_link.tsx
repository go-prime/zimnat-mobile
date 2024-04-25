import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {card, inputContainer, inputText, text} from '../../styles/inputs';
import FieldContainer from './field';
import { OptionsModal } from './link';

export default function DynamicLinkField(props) {
  const [optionsVisible, setOptionsVisible] = React.useState(false);
  const [value, setValue] = React.useState(props.value);
  const [options, setOptions] = React.useState(null)
  React.useEffect(() => {
    if(props.formData[props.options] != options) {
        setOptions(props.formData[props.options])
    } 
  }, [props.formData])

  React.useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <View>
      <FieldContainer
        input={props.isInput}
        read_only={props.read_only}
        mandatory={props.mandatory}
        hidden={props.hidden}
        label={props.label}>
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            props.read_only ? null : setOptionsVisible(true);
          }}>
          <Text style={styles.inputText}>{props.value || ''}</Text>
          <FontAwesomeIcon icon={faCaretDown} />
        </Pressable>
      </FieldContainer>
      {options && <OptionsModal
        visible={optionsVisible}
        value={props.value}
        onChange={props.onChange}
        options={options}
        setValue={setValue}
        onClose={() => {
          setOptionsVisible(false);
        }}
      />}
    </View>
  );
}


const styles = StyleSheet.create({
  pressableStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: 8,
    marginBottom: 16,
  },
  modalContainer: {
    margin: 36,
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: inputContainer,
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    ...text,
    marginBottom: 8,
  },
  inputText: inputText,
  option: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
    ...card,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    ...text,
  },
  exit: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchField: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
