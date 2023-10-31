import React from 'react';

import {View, Text, ScrollView, useColorScheme} from 'react-native';
import {ProfileButton} from '../../../components/button';
import {Heading} from '../../../components/text';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';
import Loading from '../../../components/loading';
import {Row} from '../../../components/layout';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getColors from '../../../hooks/colors'
import { card, text } from '../../../styles/inputs';


export default ManageInventoryScreen = props => {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation()
  const colorScheme = getColors(navigation)
  React.useEffect(() => {
    axios
      .get(getAbsoluteURL('/api/method/open_marketplace.open_marketplace.api.inventory_summary'))
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Could not retrieve resources from the server');
      });
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <Heading>Actions</Heading>
      <ProfileButton label="Create Inventory Entry" action={() => {
        navigation.navigate("Add Inventory")
      }} />
      {/* <ProfileButton label="Add Produce" /> */}
      <Heading>Inventory Summary</Heading>
      <Row styles={{backgroundColor: colorScheme.primary, padding: 12}}>
        <Text style={{flex: 3, color: 'white', fontWeight: "bold", fontSize: 20}}>Item</Text>
        <Text style={{flex: 1, color: 'white', fontWeight: "bold", fontSize: 20}}>Price</Text>
        <Text style={{flex: 1, color: 'white', fontWeight: "bold", fontSize: 20}}>Qty</Text>
      </Row>
      {data.map(item => (
        <Row styles={{...card, padding: 12}}>
          <Text style={{flex: 3, ...text, fontSize: 20}}>{item.produce_name}</Text>
          <Text style={{flex: 1, ...text, fontSize: 20}}>{item.formatted}</Text>
          <Text style={{flex: 1, ...text, fontSize: 20}}>{item.rate}</Text>
        </Row>
      ))}
    </ScrollView>
  );
};
