import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStar,
  faStarHalfStroke,
  faArrowUpRightFromSquare,
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {Heading, Paragraph, SubTitle} from './text';
import axios from 'axios';
import {card, shadow, text} from '../styles/inputs';
import constants from '../constants';
import {Row} from './layout';
import { LoadingButton } from './button';

const submitRating = (rating, description, item_type, item_name, onRating, toggleButton) => {
  toggleButton(true)
  axios
    .post(
      `${constants.server_url}/api/method/billing_engine.billing_engine.api.make_rating`,
      {
        item_type: item_type,
        item_name: item_name,
        description: description,
        rating: rating,
      },
    )
    .then(res => {
      console.log(res.data.message)
      Alert.alert("Message", res.data.message.message);
      onRating(res);
    })
    .catch(err => {
      toggleButton(false)
      console.log(err);
      console.log(err.response.data);
    });
};

const RatingModal = props => {
  const [loading, setLoading] = React.useState(false)
  const [rating, setRating] = React.useState(props.rating);
  const [description, setDescription] = React.useState('');
  const height = Dimensions.get('screen').height;
  const [userRatings, setUserRatings] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/billing_engine.billing_engine.api.get_ratings`,
        {
          params: {
            item_type: props.item_type,
            item_name: props.item_name,
          },
        },
      )
      .then(res => {
        setUserRatings(res.data.message);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
        Alert("Error", "Error submitting your rating")
      });
  }, [props.item_name]);

  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={[styles.modalBody, {height: height - 100}]}>
        <Pressable onPress={() => props.onClose()}>
          <FontAwesomeIcon icon={faTimesCircle} color={'crimson'} size={24} />
        </Pressable>

        <SubTitle subtitle="Rating" />
        <Row styles={{justifyContent: 'space-around'}}>
          {new Array(5).fill(0).map((_, i) => (
            <Pressable key={i} onPress={() => setRating(i+ 1)}>
              <FontAwesomeIcon
                icon={faStar}
                size={36}
                color={rating >= i + 1 ? '#FFA41C' : "#ccc"}
              />
            </Pressable>
          ))}
        </Row>
        <SubTitle subtitle="Description" />
        <View style={styles.inputContainer}>
          <TextInput
            style={{textAlignVertical: 'top'}}
            numberOfLines={4}
            multiline={true}
            verticalAlign="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <LoadingButton
          loading={loading}
          onPress={() =>
            submitRating(
              rating,
              description,
              props.item_type,
              props.item_name,
              (res) => {
                setDescription("")
                setLoading(false)
                setUserRatings(res.data.message.all_ratings)
                setRating(res.data.message.average_rating)
              },
              setLoading
            )
          }
          style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </LoadingButton>
        <Heading heading="User Ratings" />
        <ScrollView style={{flex: 1}}>
          {userRatings.map((r, index) => (
            <View style={styles.rating} key={index}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.number}>{r.rating}</Text>
                {new Array(r.rating).fill(0).map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    size={20}
                    color={'#FFA41C'}
                  />
                ))}
              </View>
              <Text style={styles.user}>{r.subscriber} says:</Text>
              <Paragraph text={r.description} />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default function Rating(props) {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [fullStars, setFullStars] = React.useState(Math.floor(props.value))
  const [halfStar, setHalfStar] = React.useState(props.value - fullStars > 0);
  const [emptyStars, setEmptyStars] = React.useState(5 - (fullStars + (halfStar ? 1 : 0)))
  React.useEffect(() => {
    setEmptyStars(5 - (fullStars + (halfStar ? 1 : 0)))
    setHalfStar(props.value - fullStars > 0)

  }, [fullStars])

  const containerWidth = ((props.size || 24) + 4) * 5 + 24;

  return (
    <>
      <Pressable
        style={[styles.container, {width: containerWidth}]}
        onPress={() => {
          setModalVisible(true);
        }}>
        {new Array(fullStars).fill(0).map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            size={props.size || 24}
            color={'#FFA41C'}
          />
        ))}
        {halfStar && (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            size={props.size || 24}
            color={'#FFA41C'}
          />
        )}
        {new Array(emptyStars).fill(0).map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            size={props.size || 24}
            color={'#ddd'}
          />
        ))}
      </Pressable>
      <RatingModal
        visible={modalVisible}
        item_type={props.item_type}
        item_name={props.item_name}
        rating={props.value}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
    marginLeft: 0,
    borderRadius: 24,
    borderWidth: 2,
    padding: 12,
    borderColor: '#FFA41C',
    ...card,
    gap: 4,
  },
  modalBody: {
    margin: 24,
    padding: 12,
    borderRadius: 12,
    ...shadow,
    elevation: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    margin: 12,
    borderColor: '#FFA41C',
  },
  button: {
    backgroundColor: '#FFA41C',
    padding: 12,
    borderRadius: 12,
    width: 150,
    margin: 16,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    padding: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    ...text,
    marginRight: 8,
  },
  user: {
    ...text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
