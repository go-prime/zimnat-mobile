import {Alert} from 'react-native';

const handleResourceRetrievalError = (err, navigator) => {
  if (err.response && err.response.data) {
    const messages = JSON.parse(err.response.data._server_messages);
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      const msg = JSON.parse(m);
      console.log(msg)
      Alert.alert(msg.title, msg.message);
      if (err.response.data.exc_type == 'ValidationError' && navigator) {
        navigator.navigate('Subscriptions');
        break;
      }
    }
  }
};

export default handleResourceRetrievalError;
