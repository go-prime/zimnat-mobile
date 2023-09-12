import React from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Carousel from 'react-native-reanimated-carousel';
import {faSearch, faUser, faImage} from '@fortawesome/free-solid-svg-icons';
import { shadow } from '../styles/inputs';


const Drawer = createDrawerNavigator();

export default function HomeScreen({navigation}): JSX.Element {
  const width = Dimensions.get('window').width;
  const [search, setSearch] = React.useState('');
  return (
    <ScrollView>
        <View style={styles.searchInput}>
            <FontAwesomeIcon
                style={{width: 50}}
                size={28}
                icon={faSearch}
                />
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
            />
        </View>
     <View style={styles.carouselContainer}>
      <Carousel
          loop
          width={width}
          height={200}
          autoPlay={true}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={3000}
          renderItem={({index}) => (
            <View
              style={styles.carouselItemContainer}>
                <FontAwesomeIcon icon={faImage} size={72}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Message {index}</Text>
            </View>
          )}
        />
     </View>
      <Text style={styles.heading}>Subject</Text>
      <Text style={styles.heading}>What's New</Text>
      <Text style={styles.heading}>Continue Learning</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    carouselContainer: {
      backgroundColor: "white",
      ...shadow,
      elevation: 5,
      margin: 12,
      borderRadius: 24,
      height: 200,

    },
    carouselItemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: 'row',
        height: 200,
        padding: 16
      },
      searchInput: {
        margin: 12,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: "white",
        ...shadow,
        elevation: 5
      },
      input: {
        marginLeft: 12
      }, 
      heading: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black"
      }
})