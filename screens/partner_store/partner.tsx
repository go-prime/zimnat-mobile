import React from 'react';

import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import { shadow } from '../../styles/inputs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';  
import axios from 'axios';

export default function PartnerScreen(props) {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {

    }, [])

    return (
        <View>
            <View>
                <Image />
                <FontAwesomeIcon />
            </View>
            <View>
                <Text>
                    Partner
                </Text>
                <Text>
                    Partner Description
                </Text>
            </View>
            <View>
                <Text>
                    Products
                </Text>
            </View>
            <View>
                <Text>
                    Bundles
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})