import React from 'react';

import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import { shadow } from '../../styles/inputs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';  
import axios from 'axios';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


export default function ProductScreen(props) {
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
                    Product Name
                </Text>
                <Text>
                    Product Category
                </Text>
                <View>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </View>
            </View>
            <View>
                <Text>
                    Product Description
                </Text>
            </View>
            <View>
                <Text>
                    Price
                </Text>
                <Text>
                    Add to cart
                </Text>
                <Text>
                    Add to wishlist
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    
})