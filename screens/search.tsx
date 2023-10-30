import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faTimes,
  faRectangleXmark,
} from '@fortawesome/free-solid-svg-icons';
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
import ImageIcon from '../components/image';
import {Row} from '../components/layout';
import {subTitle, paragraph} from '../styles/text';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';
import Centered from '../components/layout';
import {SubTitle} from '../components/text';

const SearchItem = props => {
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

export default SearchScreen = props => {
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
    <View style={styles.root}>
      <View style={styles.modalSearchInput}>
        <FontAwesomeIcon
          color={colors.primary}
          style={{width: 50}}
          size={28}
          icon={faSearch}
        />

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
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={item => <SearchItem {...item.item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Row styles={{padding: 12, alignItems: 'center'}}>
            <FontAwesomeIcon color={'white'} size={28} icon={faRectangleXmark} />
            <SubTitle>No Results Found</SubTitle>
          </Row>
      )}
    </View>
  );
};

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
  root: {
    margin: 12,
    ...card,
    flex: 1,
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
