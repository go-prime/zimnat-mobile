import React from 'react';
import {ScrollView, View, Text, StyleSheet, Pressable} from 'react-native';
import axios from 'axios';
import {getAbsoluteURL} from '../../../utils';
import Loading from '../../../components/loading';
import {Alert} from 'react-native';
import {card} from '../../../styles/inputs';
import {
  Label,
  Money,
  Paragraph,
  SubTitle,
  Title,
  textStyles,
} from '../../../components/text';
import {Row} from '../../../components/layout';
import Table from '../../../components/table';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';
import {Heading} from '../../../components/text';
import {ProfileButton} from '../../../components/button';

export default SaleDetailScreen = ({navigation, route}) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          'api/method/billing_engine.billing_engine.api.get_order_detail',
        ),
        {
          params: {
            order_id: route.params.order_id,
          },
        },
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        Alert.alert('Error', 'Error getting Order ');
      });
  }, [route.params.order_id]);

  if (!data) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Heading>Actions</Heading>
      <ProfileButton
        action={() => {
          navigation.navigate('Confirm Sale', {
            order_id: route.params.order_id,
          });
        }}
        label="Confirm Sale"
      />
      <ScrollView style={styles.paper}>
        <Title>Sale</Title>
        <SubTitle light>{data.id}</SubTitle>
        <Row styles={{marginBottom: 10}}>
          <View style={{flex: 2}}>
            <Label>Customer</Label>
            <SubTitle>{data.client_name}</SubTitle>
          </View>
          <View style={{flex: 1}}>
            <Label>Delivery Method</Label>
            <SubTitle>{data.delivery_method}</SubTitle>
          </View>
        </Row>
        <Row styles={{marginBottom: 20}}>
          <View style={{flex: 2}}>
            <Label>Delivery Address</Label>
            <SubTitle>{data.delivery_address}</SubTitle>
          </View>
          <View style={{flex: 1}}>
            <Label>Status</Label>
            <SubTitle>{data.status}</SubTitle>
          </View>
        </Row>
        <View style={{flex: 1, marginBottom: 40}}>
          <Table
            sm
            columns={[
              {label: 'Item', fieldname: 'product', ratio: 4},
              {label: 'Qty', fieldname: 'qty', ratio: 1},
              {label: 'Amt', fieldname: 'amount', ratio: 1, align: 'right'},
            ]}
            data={data.items.map(i => ({
              ...i,
              amount: parseFloat(i.amount).toFixed(2),
            }))}
            key_field={'product'}
          />
        </View>
        <View style={{marginBottom: 24}}>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <SubTitle>Subtotal</SubTitle>
            </View>
            <View>
              <Money style={textStyles.subtitle}>{data.net_amount}</Money>
            </View>
          </Row>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <SubTitle>Tax</SubTitle>
            </View>
            <View>
              <Money style={textStyles.subtitle}>{data.tax}</Money>
            </View>
          </Row>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <Title>Total</Title>
            </View>
            <View>
              <Money style={textStyles.title} symbol={data.currency_symbol}>
                {data.total}
              </Money>
            </View>
          </Row>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paper: {
    ...card,
    flex: 1,
    padding: 20,
    margin: 8,
    elevation: 5,
  },
  completeBtn: {
    position: 'absolute',
    left: 20,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    elevation: 5,
    bottom: 20,
  },
});
