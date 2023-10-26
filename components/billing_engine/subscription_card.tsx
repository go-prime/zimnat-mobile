import {View, StyleSheet, Pressable} from 'react-native';
import {card} from '../../styles/inputs';
import ImageIcon from '../image';
import {SubTitle, SmallLabel} from '../text';
import {Row} from '../layout';
import { useNavigation } from '@react-navigation/native';

export default SubscriptionCard = ({
  cover_image,
  subscription_name,
  subscription_id,
  rate,
  per_discount,
  discount,
}) => {

    const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate("Subscription", {subscription_id: subscription_id})}>
      <View style={styles.container}>
        <ImageIcon width={150} height={150} url={cover_image} />
        <View style={styles.content}>
          <SubTitle subtitle={subscription_name} />
          {discount ? (
            <View>
              <SmallLabel>{per_discount}% off</SmallLabel>
              <Row>
                <SmallLabel style={{textDecoration: 'line-through'}} label={rate} />
                <SmallLabel label={rate - discount} />
              </Row>
            </View>
          ) : (
            <SmallLabel label={Number(rate).toFixed(2)} />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...card,
    margin: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 12,
  },
});
