import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Appearance,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCaretDown,
  faPlus,
  faSearch,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {card, inputContainer, inputText, text} from '../../styles/inputs';
import FieldContainer from './field';
import axios from 'axios'
import constants from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Label } from '../text';

export default function LinkField(props) {
  const [optionsVisible, setOptionsVisible] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

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
      <OptionsModal
        visible={optionsVisible}
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        setValue={setValue}
        onClose={() => {
          setOptionsVisible(false);
        }}
      />
    </View>
  );
}

const OptionsModal = props => {
  const [options, setOptions] = React.useState([]);
  const [allOptions, setAllOptions] = React.useState([]);
  const [input, setInput] = React.useState(props.value);
  const navigator = useNavigation()


  React.useEffect(() => {
    axios.get(`${constants.server_url}/api/method/erp.public_api.list`, {
        params: {
            doctype: props.options,
        }
    }).then(res => {
        setAllOptions(res.data.message.data)
    }).catch(err => {
      console.log(err)
      console.log("Could not retrieve the list")
    })
  }, [props.options, props.value]);

  React.useEffect(() => {
    setOptions(allOptions);
  }, [allOptions]);

  React.useEffect(() => {
    if (input && input.length > 2) {
      setOptions(
        allOptions.filter(opt => {
          if (
            opt.name &&
            opt.name.toLowerCase().indexOf(input.toLowerCase()) > -1
          ) {
            return true;
          }
          return false;
        }),
      );
    }
  }, [input]);

  React.useEffect(() => {
      setInput(props.value);
  }, [props.value]);

  const clearInput = () => {
    setInput("")
    props.setValue("")
    setOptions(allOptions)
  }

  const iconColors = Appearance.getColorScheme() == "dark" ?  "white" : "black"

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.modalContainer}>
        <Label>Select an option</Label>
        <View style={styles.input}>
        <FontAwesomeIcon icon={faSearch} />
          <TextInput
            value={input}
            onChangeText={setInput}
            style={styles.inputText}
          />
          <Pressable onPress={clearInput}>
            <FontAwesomeIcon icon={faTimes} color={iconColors} />
          </Pressable>
        </View>
        <Pressable style={styles.createNewBtn} onPress={() => {
          props.onClose()
          navigator.navigate("List", {doctype: props.options})
          navigator.navigate("Form", {doctype: props.options})
        }}>
          <FontAwesomeIcon size={28} color={'steelblue'} icon={faPlus} />
          <Text style={styles.createNewText}>Create New</Text>
        </Pressable>
        <FlatList
          style={styles.optionList}
          data={options}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                props.setValue(item.name);
                props.onClose();
              }}>
              <View style={styles.option}>
                <Text style={styles.optionText}>{item.name}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={item => item.name}
        />
        <View style={styles.exit}>
          <Pressable onPress={props.onClose}>
            <FontAwesomeIcon icon={faTimesCircle} color="crimson" size={32} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export {OptionsModal}

const styles = StyleSheet.create({
  pressableStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 40
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
  createNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center', 
    gap: 12
  },
  createNewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'steelblue'
  }
});
