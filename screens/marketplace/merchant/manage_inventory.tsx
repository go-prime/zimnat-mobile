import React from 'react';

import {View, Text, ScrollView, useColorScheme} from 'react-native';
import {ProfileButton} from '../../../components/button';
import {Heading} from '../../../components/text';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';
import Loading from '../../../components/loading';
import {Row} from '../../../components/layout';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import getColors from '../../../hooks/colors';
import {card, text} from '../../../styles/inputs';
import Table from '../../../components/table';


export default ManageInventoryScreen = props => {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          '/api/method/open_marketplace.open_marketplace.api.inventory_summary',
        ),
      )
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
      <ProfileButton
        label="Create Inventory Entry"
        action={() => {
          navigation.navigate('Add Inventory');
        }}
      />
      <ProfileButton
        action={() => {
          navigation.navigate('Add Produce');
        }}
        label="Add Produce"
      />
      <Heading>Inventory Summary</Heading>
      <Table
        columns={[
          {label: 'Produce', fieldname: 'produce_name', ratio: 3},
          {label: 'Price', fieldname: 'formatted', ratio: 1},
          {label: 'Qty', fieldname: 'rate', ratio: 1},
        ]}
        data={data}
        key_field={'produce_name'}
      />
    </ScrollView>
  );
};
