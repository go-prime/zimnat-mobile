import React from 'react';
import {ScrollView, View, Text, StyleSheet, Pressable} from 'react-native';
import axios from 'axios';
import {getAbsoluteURL} from '../../utils';
import Loading from '../../components/loading';
import {Alert} from 'react-native';
import {card} from '../../styles/inputs';
import {Label, SubTitle, Title} from '../../components/text';
import {Row} from '../../components/layout';
import Table from '../../components/table';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import colors from '../../styles/colors';

const completeSale = (id, navigator) => {
  axios
    .post(
      getAbsoluteURL(
        '/api/method/billing_engine.billing_engine.api.complete_checkout',
      ),
      {
        checkout_id: id,
      },
    )
    .then(res => {
      if (!res.data.message.url) {
        Alert.alert(
          'Complete',
          'To complete this order, scan the QR code provided by your vendor when they deliver your goods',
        );
      }
      navigator.navigate('WebView', {url: res.data.message.url});
    }).catch(err => {
        Alert.alert("Error", "Failed to complete checkout")
        console.log(err.response.data)
    });
};

const CompleteOrderButton = props => {
  const navigator = useNavigation();
  return (
    <Pressable
      style={styles.completeBtn}
      onPress={() => completeSale(props.id, navigator)}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
        Complete
      </Text>
    </Pressable>
  );
};

export default OrderDetailScreen = ({navigation, route}) => {
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
        console.log(res.data.message);
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
      <ScrollView style={styles.paper}>
        <Title>ORDER</Title>
        <SubTitle light>{data.id}</SubTitle>
        <Row styles={{marginBottom: 10}}>
          <View style={{flex: 2}}>
            <Label>Vendor</Label>
            <SubTitle>
              {data.supplier_type} - {data.supplier_name}
            </SubTitle>
          </View>
          <View style={{flex: 1}}>
            <Label>Delivery Method</Label>
            <SubTitle>{data.delivery_method}</SubTitle>
          </View>
        </Row>
        <Row styles={{marginBottom: 20}}>
          <View style={{flex: 2}}>
            <Label>Status</Label>
            <SubTitle>{data.status}</SubTitle>
          </View>
          <View style={{flex: 1}} />
        </Row>
        <View style={{flex: 1, marginBottom: 40}}>
          <Table
            sm
            columns={[
              {label: 'Item', fieldname: 'product', ratio: 4},
              {label: 'Qty', fieldname: 'qty', ratio: 1},
              {label: 'Amt', fieldname: 'amount', ratio: 1, align: 'right'},
            ]}
            data={data.items}
            key_field={'product'}
          />
        </View>
        <View style={{marginBottom: 70}}>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <SubTitle>Subtotal</SubTitle>
            </View>
            <View>
              <SubTitle>{data.net_amount}</SubTitle>
            </View>
          </Row>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <SubTitle>Tax</SubTitle>
            </View>
            <View>
              <SubTitle>{data.tax}</SubTitle>
            </View>
          </Row>
          <Row styles={{justifyContent: 'space-between'}}>
            <View>
              <Title>Total</Title>
            </View>
            <View>
              <Title>{data.total}</Title>
            </View>
          </Row>
        </View>
      </ScrollView>
      {data.status == "Order" && <CompleteOrderButton id={data.id} />}
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
