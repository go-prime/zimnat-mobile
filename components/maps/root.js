import React from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview'

export default LeafletView = (props) => {
    return (
        <View>
            <Text>Hello World</Text>
            <WebView
    originWhitelist={['*']}
    source={{ html: '<p>Here I am</p>' }}
/>
  <Text>Goodbye Cruel World</Text>
        </View>
    )
}