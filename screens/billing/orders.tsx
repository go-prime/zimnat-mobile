import React from 'react';
import {FlatList, View, Pressable, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import Loading from '../../components/loading';
import {getAbsoluteURL} from '../../utils';
import {Label, Pill, SubTitle, Title, textStyles} from '../../components/text';
import {card} from '../../styles/inputs';
import {Row} from '../../components/layout';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import getColors from '../../hooks/colors';
import { Money } from '../../components/text';

const OrderItem = props => {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Order Detail', {order_id: props.name});
      }}
      style={[styles.container, {borderColor: colorScheme.primary}]}>
      <SubTitle light>{props.name}</SubTitle>
      <Row styles={{alignItems: 'center'}}>
        <View style={{flex: 3}}>
          <Label>{props.supplier_name}</Label>
          <Pill containerStyles={{alignSelf: 'flex-start'}}>
            {props.status}
          </Pill>
        </View>
        <View style={{flex: 2}}>
          <Money style={textStyles.title} symbol={props.symbol} >{props.total}</Money>
        </View>
      </Row>
    </Pressable>
  );
};

export default MyOrdersScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused()
  React.useEffect(() => {
    axios
      .get(
        getAbsoluteURL(
          'api/method/billing_engine.billing_engine.api.get_orders',
        ),
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        Alert.alert('Error getting Orders');
      });
  }, [isFocused]);

  if (!(data && data.length > 0)) {
    return <Loading />;
  }
  return (
    <View>
      <FlatList
        data={data}
        renderItem={item => <OrderItem {...item.item} symbol={data.currency_symbol} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...card,
    padding: 8,
    margin: 12,
    borderRadius: 8,
    borderLeftWidth: 8,
  },
});
