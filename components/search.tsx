import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {card, shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import ImageIcon from './image';
import {Row} from './layout';
import {subTitle, paragraph} from '../styles/text';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';
import Centered from './layout';

const SearchItem = (props) => {
  const navigation = useNavigation();
  const keyMap = {
    Bundle: 'bundle',
    Product: 'product',
    Course: 'course_id',
    Partner: 'partner',
    Produce: 'produce',
  };
  const searchResultNavigate = () => {
    const key = keyMap[props.type];
    props.hideModal()
    navigation.navigate(props.type, {[key]: props.id});
  };

  return (
    <Pressable onPress={searchResultNavigate}>
      <Row styles={styles.result}>
        <ImageIcon url={props.img_url} width={50} height={50} />
        <View style={styles.resultTextContainer}>
          <Text style={subTitle}>{props.title}</Text>
          <Text style={paragraph}>{props.description}</Text>
        </View>
      </Row>
    </Pressable>
  );
};

const SearchModal = props => {
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  React.useEffect(() => {
    if (search.length < 3) {
      return;
    }

    axios
      .get(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.search`,
        {
          params: {q: search},
        },
      )
      .then(res => {
        setResults(res.data.message);
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to get results.');
        console.log(err);
      });
  }, [search]);
  return (
    <Modal transparent visible>
      <View style={styles.modalContent}>
        <View style={styles.modalSearchInput}>
          <Pressable onPress={() => {
            props.input.blur()
            props.toggleVisible()
          }}>
            <FontAwesomeIcon color={colors.primary} style={{width: 50}} size={28} icon={faTimes} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            autoFocus={true}
          />
        </View>
        {searching ? (
          <Centered>
            <ActivityIndicator color={colors.primary} size={48} />
          </Centered>
        ) : (
          <FlatList
            data={results}
            renderItem={item => <SearchItem hideModal={props.toggleVisible} {...item.item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </Modal>
  );
};

export default function SearchBar(props) {
  const [showModal, setShowModal] = React.useState(false);
  const inputRef = React.useRef();
  return (
    <View style={styles.searchInput}>
      <FontAwesomeIcon style={{width: 50}} size={28} color={colors.primary} icon={faSearch} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        onFocus={() => setShowModal(true)}
        ref={inputRef}
      />
      {showModal && (
        <SearchModal input={inputRef.current} toggleVisible={() => setShowModal(!showModal)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    margin: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    
    flex: 1,
  },
  modalSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    height: 50,
  },
  input: {
    marginLeft: 12,
    flex: 1,
  },
  modalContent: {
    marginHorizontal: 12,
    ...card,
    height: 300,
    marginTop: 65,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
  },
  result: {
    padding: 12,
  },
  resultTextContainer: {
    paddingLeft: 12,
  },
});
