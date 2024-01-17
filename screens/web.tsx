import React, {Component} from 'react';
import {WebView} from 'react-native-webview';


export default function InAppWebViewScreen(props) {
  return <WebView source={{uri: props.route.params.url}} />;
}
