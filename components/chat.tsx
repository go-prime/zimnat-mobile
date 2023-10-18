import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faComments,
  faPaperPlane,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {shadow} from '../styles/inputs';
import axios from 'axios';
import constants from '../constants';
import ImageIcon from './image';
import {Row} from './layout';
import {subTitle, paragraph} from '../styles/text';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';
import Centered from './layout';
import { err } from 'react-native-svg/lib/typescript/xml';

const ChatBubble = props => {
  return (
    <View style={props.bot ? styles.botBubble : styles.chatBubble}>
      <Text style={styles.bubbleText}>{props.text}</Text>
    </View>
  );
};

const SendingBubble = props => {
  return (
    <View style={styles.botBubble}>
      <ActivityIndicator color={'white'} size={28} />
    </View>
  );
};

const ChatModal = props => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [chat, setChat] = React.useState([
    {
      text: "Hi, I'm Hustle Bot, how can I help?",
      bot: true,
    },
  ]);

  const [inputText, setInputText] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [customMargin, setCustomMargin] = React.useState(12);
  const scrollRef = React.useRef<ScrollView>(null)

  const sendMessage = () => {
    if (!inputText.length) {
      return;
    }
    const newChat = [...chat, {text: inputText, bot: false}];
    setChat(newChat);
    setIsSending(true);
    setInputText('');

    axios
      .post(
        `${constants.server_url}/api/method/edutec_courses.api.custom_api.custom_endpoint`,
        {
          user_message: inputText,
        },
      )
      .then(res => {
        const newMessages = res.data.message.map(msg => ({text: msg.content, bot: true}))
        
        setChat(prevChat => {
          const newChat = [...prevChat, ...newMessages];
          return newChat
        });
        
        setIsSending(false);
      })
      .catch(err => {
        Alert.alert("Error", "Cannot communicate with the chatbot service.")
        console.log(err)
        if(err.response) {
          console.log(err.response)
        }
      })
  };

  return (
    <Modal animationType="slide" transparent visible>
      <View style={[styles.modalContent, {height: height - 162}]}>
        <ScrollView 
          ref={scrollRef} 
          style={styles.messageContainer}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd()}>
          {chat.map((c, i) => (
            <ChatBubble {...c} key={i} />
          ))}
          {isSending && <SendingBubble />}
        </ScrollView>
        <Row styles={{marginBottom: customMargin}}>
          <Row styles={styles.inputContainer}>
            <Pressable onPress={props.toggleVisible}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                color={'white'}
                style={{marginLeft: 6}}
                size={24}
              />
            </Pressable>
            <TextInput
              style={styles.input}
              autoFocus
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setCustomMargin(height / 3)}
              onBlur={() => setCustomMargin(12)}
            />
          </Row>
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <FontAwesomeIcon icon={faPaperPlane} size={20} color={'white'} />
          </Pressable>
        </Row>
      </View>
    </Modal>
  );
};

export default function ChatButton(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Pressable
        onPress={() => setShowModal(true)}
        disabled={props.disabled}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        android_ripple={{color: 'rgba(0,0,0,0.1)'}}
        activeOpacity={0.7}
        style={styles.chatButton}>
        <FontAwesomeIcon color={'white'} size={36} icon={faComments} />
      </Pressable>
      {showModal && (
        <ChatModal toggleVisible={() => setShowModal(!showModal)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    borderRadius: 12,
    padding: 12,
    ...shadow,
    elevation: 5,
    position: 'absolute',
    backgroundColor: colors.primary,
    bottom: 20,
    right: 20,
  },
  input: {
    marginLeft: 12,
    flex: 1,
  },
  modalContent: {
    marginHorizontal: 12,
    backgroundColor: 'white',
    marginTop: 100,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
  },
  inputContainer: {
    padding: 6,
    margin: 8,
    flex: 1,
    backgroundColor: colors.tertiary,
    alignItems: 'center',
    borderRadius: 36,
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 4,
    marginLeft: 8,
    color: 'white',
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    marginLeft: 0,
  },
  botBubble: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    marginBottom: 8,
    marginRight: 50,
  },
  chatBubble: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 12,
    borderBottomRightRadius: 0,
    marginBottom: 8,
    marginLeft: 50,
  },
  bubbleText: {
    color: 'white',
  },
  messageContainer: {
    padding: 12,
    paddingTop: 24,
    flex: 1,
  },
});
