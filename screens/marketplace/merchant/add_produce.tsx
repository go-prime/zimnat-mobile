import React from 'react'

import {View, Text } from 'react-native'

import React from 'react';

import {View, Text, ScrollView} from 'react-native';
import Field, {LinkField} from '../../../components/form';
import {Link} from '@react-navigation/native';

export default AddProduceScreen = props => {
  const [category, setCategory] = React.useState("")
  
    return (
    <ScrollView>
      <LinkField
        filters={{'1': '1'}}
        label={'Category'}
        doctype="Produce Group"
        label_field="name"
        value={category}
        onChange={setCategory}
      />
      <Field label="" />
    </ScrollView>
  );
};
// {"produce_name":"Beans", "price": "22", "quantity": "7", "category": "Produce"}


