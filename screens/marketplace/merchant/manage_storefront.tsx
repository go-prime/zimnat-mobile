import React from 'react';

import {
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Row} from '../../../components/layout';
import {Title, SubTitle, Heading} from '../../../components/text';
import {Circle} from '../../../components/layout';
import ImageIcon from '../../../components/image';
import Field from '../../../components/form';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {ProfileButton} from '../../../components/button';
import colors from '../../../styles/colors';
import axios from 'axios';
import Loading from '../../../components/loading';
import {getAbsoluteURL} from '../../../utils';
import { useNavigation } from '@react-navigation/native';

export default ManageStorefrontScreen = props => {
  const [data, setData] = React.useState(null);
  const [storeName, setStoreName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logo, setLogo] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [featuredProduce, setFeaturedProduce] = React.useState([]);
  const navigation = useNavigation()

  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          '/api/method/open_marketplace.open_marketplace.api.get_storefront',
        ),
      )
      .then(res => {
        console.log(res.data);
        setData(res.data.message);
        setAddress(res.data.message.address);
        setPhone(res.data.message.phone);
        setEmail(res.data.message.email);
        setDescription(res.data.message.description);
        setStoreName(res.data.message.name);
      })
      .catch(err => {
        Alert.alert('Error', 'Could not fetch resources');
      });
  }, []);

  const updateStorefrontDetails = () => {
    axios
      .post(
        getAbsoluteURL(
          '/api/method/open_marketplace.open_marketplace.api.update_storefront',
        ),
        {data: {
          storefront_name: storeName,
          email: email,
          phone: phone,
          address: address,
          description: description,
        }},
      )
      .then(res => {
        Alert.alert('Success', 'Updated storefront details successfully');
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to update storefront details');
      });
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <Row>
        <Circle radius={50}>
          <ImageIcon width={75} height={75} url={data.image} />
        </Circle>
        <View>
          <Title>{data.name}</Title>
          <SubTitle>{data.merchant}</SubTitle>
        </View>
      </Row>
      <Heading>Actions</Heading>
      <ProfileButton action={() => {
        navigation.navigate("Manage Inventory")
      }} label={'Manage Inventory'} />
      {/* <ProfileButton label={'Manage Sales'} /> */}
      <Heading>Storefront Properties</Heading>
      <Field
        label={'Storefront Name'}
        value={storeName}
        onTextChange={setStoreName}
      />
      <Field label={'Phone'} value={phone} onTextChange={setPhone} />
      <Field label={'Email'} value={email} onTextChange={setEmail} />
      <Field
        multiline
        label={'Address'}
        value={address}
        onTextChange={setAddress}
      />
      <Field multiline label={'Description'} value={description} onTextChange={setDescription} />

      <Pressable onPress={updateStorefrontDetails} style={styles.save}>
        <Row>
          <FontAwesomeIcon
            icon={faSave}
            size={24}
            color={'white'}
            style={{marginRight: 12}}
          />
          <Text style={styles.tierText}>Save Changes</Text>
        </Row>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  save: {
    padding: 12,
    backgroundColor: colors.tertiary,
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  tierText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
