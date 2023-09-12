import React from 'react';
import { Text, Pressable, View, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import { shadow } from '../../styles/inputs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';


const RoundButton  = function (props) {
    return (<Pressable onPress={props.handler}>
        <View style={styles.round}>
            {props.url 
                ? <Image source={{uri: props.url, width: 40, height: 40}} />
                : <FontAwesomeIcon icon={faImage} size={30} color={colors.primary} />
            }
        </View>
        {props.title && <Text style={styles.text} >{props.title}</Text>}
    </Pressable>)
}

const RoundedSquareButton  = function (props) {
    return (<Pressable onPress={props.handler}>
        <View style={styles.round}>
            {props.url 
                ? <Image source={{uri: props.url, width: 40, height: 40}} />
                : <FontAwesomeIcon icon={faImage} size={30} color={colors.primary} />
            }
        </View>
        {props.title && <Text style={styles.text}>{props.title}</Text>}
    </Pressable>)
}


const styles = StyleSheet.create({
    round: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        backgroundColor: "white",
        ...shadow,
        elevation: 5
    },
    square: {
        width: 75,
        height: 75,
        borderRadius: 12.5,
        backgroundColor: "white",
        ...shadow,
        elevation: 5
    },
    text: {
        fontSize: 16, 
        fontWeight: "bold"
    }
})

export {RoundButton, RoundedSquareButton}