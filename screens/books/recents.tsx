import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {Heading} from '../../components/text';
import {faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {card} from '../../styles/inputs';
import {background, text} from '../../styles/text';
import {iconColor} from '../../styles/inputs';
import Loading from '../../components/loading';
import constants from '../../constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Recent = ({document_type, document_id, icon}) => {
  const navigator = useNavigation()
  return (
    <Pressable style={styles.recent} onPress={() => {
      navigator.navigate("Form", {doctype: document_type, id: document_id})
    }}>
      <View style={styles.recentContent}>
        <FontAwesomeIcon icon={faFileAlt} size={48} color={iconColor} />
        <View>
          <Text style={styles.bold}>{document_type}</Text>
          <Text style={styles.label}>{document_id}</Text>
        </View>
      </View>
    </Pressable>
  );
};
const Older = ({document_type, document_id, icon}) => {
  return (
    <Pressable style={styles.older} onPress={() => {
      navigator.navigate("Form", {doctype: document_type, id: document_id})
    }}>
      <FontAwesomeIcon icon={faFileAlt} size={28} color={iconColor} />
      <View>
        <Text style={styles.bold}>{document_type}</Text>
        <Text style={styles.label}>{document_id}</Text>
      </View>
    </Pressable>
  );
};

export default function RecentScreen(props) {
  const [recents, setRecents] = React.useState([])
  React.useEffect(() => {
    axios.get(`${constants.server_url}/api/method/erp.public_api.recents`)
    .then(res => {
      console.log(res.data)
      setRecents(res.data.message)
    }).catch(err => {
      console.log(err)
      if(err.response) {
        console.log(err.response.data)
      }
    })
  })

  if(recents.length == 0) {
    return <Loading />
  }

  return (
    <ScrollView style={{backgroundColor: background.color}}>
      <Heading>Recent Documents</Heading>
      <ScrollView horizontal>
        {recents.slice(0, 5).map(r => <Recent document_id={r.name} document_type={r.doctype} />)}
      </ScrollView>
      <Heading>OLDER</Heading>
      {recents.slice(5, 16).map(r => <Older document_id={r.name} document_type={r.doctype} />)}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recentContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  recent: {
    ...card,
    padding: 24,
    margin: 16,
    borderRadius: 5,
    elevation: 5,
  },
  older: {
    ...card,
    padding: 8,
    margin: 6,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    elevation: 5,
  },
  bold: {
    ...text,
    fontWeight: 'bold',
  },
  label: {
    ...text,
    fontSize: 16,
  },
});
