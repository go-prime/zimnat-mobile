import React from 'react';

import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native';
import colors from '../../styles/colors';
import { shadow } from '../../styles/inputs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';  
import axios from 'axios';
import {  faImage, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants';
import Centered from '../../components/centered';
import Rating from '../../components/rating';
import ImageIcon from '../../components/image';

const BundleProduct = (props) => {
    return (
        <View style={[styles.card, {flexDirection: "row", padding: 12}]}>
            <View>
                <ImageIcon width={75} height={75} url={`${constants.server_url}/${props.image}`} />
            </View>
            <View>
                <Text style={styles.heading}>{props.id}</Text>
                <Text>{props.description}</Text>
                <Text style={styles.heading}>{props.price} x {props.qty}</Text>
            </View>
        </View>
    )
}


export default function BundleScreen(props) {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        axios.get(`${constants.server_url}/api/method/partner_hub.partner_hub.api.get_bundle`, {params: {bundle_id: props.route.params.bundle}})
            .then(res => {
                console.log(res.data.message)
                setData(res.data.message)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <ScrollView>
            <View style={styles.card}>
                <Centered styles={{margin: 16}}>
                    {data && data.cover_image ? (
                        <Image source={{uri: `${constants.server_url}/${data.cover_image}`, width: 100,
                        height: 100,}} />
                    ) : (
                    <FontAwesomeIcon 
                        icon={faImage} 
                        size={72} 
                        color={colors.primary} />
                    )}
                </Centered>
                <Text style={styles.title}>
                    {data && data.name}
                    
                </Text>
                <Text style={styles.heading}>
                    {data && data.partner}
                </Text>
                <Text style={styles.description}>
                    {data && data.description}
                </Text>
            </View>
            <View>
                
                <Rating value={4.2} size={24}/>
            </View>
            <View>
                
            </View>
            <View>
                <Text style={styles.heading}>
                    Components
                </Text>
                {data && data.products.map(pro => (
                    <BundleProduct key={pro.id} {...pro} />))}
            </View>
            <View style={styles.row}>
            <View style={styles.wishlist}>
                
                <FontAwesomeIcon icon={faHeart} size={24} color={"white"} />
            </View>
            <View style={styles.addToCart}>
            <FontAwesomeIcon icon={faShoppingCart} size={24} color={"white"} />
            <Text style={{color: "white", fontSize: 16, marginLeft: 4}}>Add To Cart</Text>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 4,
        padding: 4
    },
    wishlist: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "crimson",
        padding: 12,
        borderRadius: 4

    },
    addToCart: {
        flex: 2,
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 4,
        alignItems: "center",
        borderRadius: 4,
        flexDirection: "row",
    
    },
    title: {
        fontSize: 24,
        padding: 12,
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 0
      },
      heading: {
        fontSize: 18,
        padding: 12,
        paddingTop: 0,
        color: '#666',
        fontWeight: 'bold',
      },
      description: {
        color: 'black',
        padding: 12,
      },
      card: {
        ...shadow,
        backgroundColor: 'white',
        margin: 12,
        elevation: 5,
        borderRadius: 12,
      },
})