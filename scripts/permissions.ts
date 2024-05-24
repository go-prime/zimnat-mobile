import {Alert} from 'react-native'

const handleResourceRetrievalError = (err, navigator) => {
  if (err.response && err.response.data) {
    JSON.parse(err.response.data._server_messages).forEach(m => {
      const msg = JSON.parse(m);
      Alert.alert(msg.title, msg.message);
      if (err.response.data.exc_type == 'ValidationError' && navigator) {
        navigator.goBack();
      }
    });
  }
};


export default handleResourceRetrievalError;