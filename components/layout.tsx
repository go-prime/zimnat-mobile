import React from 'react'
import { View } from 'react-native'


export default function Centered(props) {
    return <View style={{justifyContent: 'center', alignItems: 'center', ...props.styles}}>
        {props.children}
    </View>
}

const Row = (props) =>  {
    return <View style={{flexDirection: "row", ...props.styles}}>
        {props.children}
    </View>
}

export {Row}