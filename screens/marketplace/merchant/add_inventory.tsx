import React from 'react';

import {Pressable, Text, ScrollView, Alert} from 'react-native';
import Field, {LinkField} from '../../../components/form';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';
import colors from '../../../styles/colors';
import {SubmitButton} from '../../../components/button';
import handleResourceRetrievalError from '../../../scripts/permissions';

export default AddInventoryScreen = props => {
  const [produce, setProduce] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [qty, setQty] = React.useState(0);
  const navigation = useNavigation();

  const submitInventory = () => {
    axios
      .post(
        getAbsoluteURL(
          '/api/method/open_marketplace.open_marketplace.api.make_inventory_entry',
        ),
        {
          data: {produce: produce, new_price: price, new_quantity: qty},
        },
      )
      .then(res => {
        Alert.alert('Success', 'Created new inventory Entry');
        navigation.navigate('Manage Inventory');
      })
      .catch(err => {
        console.log(err.response.data);
        handleResourceRetrievalError(err, navigation)
      });
  };

  return (
    <ScrollView>
      <LinkField
        label={'Produce'}
        doctype="Produce"
        label_field="produce_name"
        value={produce}
        onChange={setProduce}
      />
      <Field label="New Quantity" value={qty} onTextChange={setQty} />
      <Field label="New Price" value={price} onTextChange={setPrice} />
      <SubmitButton action={submitInventory} />
    </ScrollView>
  );
};
