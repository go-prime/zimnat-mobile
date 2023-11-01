import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Loading from '../../components/loading';
import { Title } from '../../components/text';
import ImageIcon from '../../components/image';
import { Image } from 'react-native';

export default function BooksHomeScreen({navigation}): JSX.Element {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Title title="Coming Soon..."></Title>
      <Image source={require('../../assets/images/books-alternate.png')} style={{width:300, height:300}}  />
    </View>
  );
}

const styles = StyleSheet.create({

});
