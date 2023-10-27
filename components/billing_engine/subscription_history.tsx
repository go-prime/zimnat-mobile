import {View, StyleSheet, Pressable} from 'react-native';
import {card} from '../../styles/inputs';
import ImageIcon from '../image';
import {SubTitle, SmallLabel, Pill} from '../text';
import {Row} from '../layout';
import {useNavigation} from '@react-navigation/native';
import colors from '../../styles/colors';

export default SubscriptionHistory = ({
  cover_image,
  subscription_type,
  expiry,
  activated_on
}) => {
  const navigation = useNavigation();
  const expiryDate = new Date(expiry);
  const activationDate = new Date(activated_on);
  let msg = "Pending"
  let color 
  if(expiryDate > new Date() && activationDate < new Date()) {
    msg = "Active"
    color = colors.primary
  }

  if(expiryDate < new Date()) {
    msg = "Expired"
    color = "crimson"
  }

  if(activationDate > new Date()) {
    msg = "Pending"
    color = "#ccc"
  }

  
  return (
    <Row styles={styles.container}>
        <ImageIcon width={100} height={100} url={cover_image} />
        
        <View style={styles.content}>
          
          <SubTitle subtitle={subscription_type} />
          <Pill color={color}>{msg}</Pill>
        </View>
      </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    ...card,
    borderLeftWidth: 7,
    borderLeftColor: colors.primary,
    borderRadius: 6
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
});
