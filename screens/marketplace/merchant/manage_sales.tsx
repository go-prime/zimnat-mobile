import React from 'react';

import {View, Text, ScrollView} from 'react-native';
import {Heading} from '../../../components/text';
import {ProfileButton} from '../../../components/button';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import getColors from '../../../hooks/colors';
import {card, text} from '../../../styles/inputs';
import Table from '../../../components/table';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';
import Loading from '../../../components/loading';

export default ManageSalesScreen = props => {
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
      <ProfileButton label="Confirm Sale" />
      <Heading>Sales Summary</Heading>
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
