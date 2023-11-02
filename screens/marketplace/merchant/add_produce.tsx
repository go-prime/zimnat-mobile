import React from 'react';

import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import Field, {LinkField} from '../../../components/form';
import {useNavigation} from '@react-navigation/native';
import getColors from '../../../hooks/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {SubmitButton} from '../../../components/button';
import ImagePicker from '../../../components/image_picker';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';

export default AddProduceScreen = props => {
  const [category, setCategory] = React.useState('');
  const [produce_name, setProduceName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [img, setImg] = React.useState('');
  const [imgName, setImgName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const submitProduce = () => {
    axios
      .post(
        getAbsoluteURL(
          '/api/method/open_marketplace.open_marketplace.api.make_produce',
        ),
        {
          data: {
            category: category,
            produce_name: produce_name,
            description: description,
            img: img,
            img_name: imgName,
            price: parseFloat(price),
          },
        },
      )
      .then(res => {
        Alert.alert('Success', 'Produce Added');
        setCategory('')
        setProduceName('')
        setPrice('')
        setImg('')
        setImgName('')
        setDescription('')
      })
      .catch(err => {
        console.log(err.response.data);

        Alert.alert('Error', 'Could not add produce to storefront');
      });
  };

  return (
    <ScrollView>
      <ImagePicker
        onImageChange={setImg}
        onNameChange={setImgName}
        label={'Primary Photo'}
      />
      <LinkField
        label={'Category'}
        doctype="Produce Group"
        label_field="name"
        value={category}
        onChange={setCategory}
      />
      <Field
        label="Produce Name"
        value={produce_name}
        onTextChange={setProduceName}
      />
      <Field label="Price" value={price} onTextChange={setPrice} />
      <Field
        multiline={true}
        label="Description"
        value={description}
        onTextChange={setDescription}
      />
      <SubmitButton action={submitProduce} />
    </ScrollView>
  );
};
