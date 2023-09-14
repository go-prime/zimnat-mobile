import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {View, StyleSheet, TextInput} from 'react-native';
import { shadow } from '../styles/inputs';

export default function SearchBar(props) {
    const [search, setSearch] = React.useState("")

    React.useEffect(() => {
        if(props.onInput) {
            return props.onInput(search)
        }
    }, [search])

  return (
    <View style={styles.searchInput}>
      <FontAwesomeIcon style={{width: 50}} size={28} icon={faSearch} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
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
        backgroundColor: "white",
        ...shadow,
        elevation: 5,
        flex: 1
      },
      input: {
        marginLeft: 12
      }, 
})