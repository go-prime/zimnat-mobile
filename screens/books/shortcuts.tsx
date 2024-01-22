import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native'
import { faBook, faBoxes, faCalendar, faCalendarAlt, faChartLine, faClipboardList, faDollarSign, faFile, faFileAlt, faFileInvoiceDollar, faHand, faListDots, faPenFancy, faScaleBalanced, faTruck } from '@fortawesome/free-solid-svg-icons'
import { Heading } from '../../components/text'


const Shortcut = ({icon, text, route}) => {
    const navigator = useNavigation()
    return (
        <Pressable onPress={() => {
            navigator.navigate(route)
        }} style={styles.shortcut} >
            <View style={styles.shortcutContent} >
                <FontAwesomeIcon icon={icon} size={40} />
                <Text style={styles.shortcutText} >{text}</Text>
            </View>
        </Pressable>
    )
}

export default function ShortcutScreen(props) {
    return (
    <ScrollView style={{backgroundColor: 'white'}}>
        <Heading>Sales</Heading>
        <View style={styles.content}>
        <Shortcut text="Sales Invoice" name="user" icon={faFileAlt} route={'Form'}/>
        <Shortcut text="Quotation" name="user" icon={faPenFancy} route={'Form'}/>
        <Shortcut text="Credit Note" name="user" icon={faClipboardList} route={'Form'}/>
        <Shortcut text="Prices" name="user" icon={faDollarSign} route={'Form'}/>
        </View>
        <Heading>Inventory</Heading>
        <View style={styles.content}>
        <Shortcut text="Item" name="user" icon={faBoxes} route={'Form'}/>
        <Shortcut text="Purchase Order" name="user" icon={faCalendarAlt} route={'Form'}/>
        <Shortcut text="Purchase Invoice" name="user" icon={faFileInvoiceDollar} route={'Form'}/>
        <Shortcut text="Purchase Receipt" name="user" icon={faTruck} route={'Form'}/>
        </View>
        <Heading>Accounts</Heading>
        <View style={styles.content}>
        <Shortcut text="Journal Entry" name="user" icon={faScaleBalanced} route={'Form'}/>
        <Shortcut text="Payment" name="user" icon={faHand} route={'Form'}/>
        <Shortcut text="Currency" name="user" icon={faDollarSign} route={'Form'}/>
        <Shortcut text="Exchange Rate" name="user" icon={faChartLine} route={'Form'}/>
        <Shortcut text="Accounts" name="user" icon={faBook} route={'Form'}/>
        <Shortcut text="Payment Methods" name="user" icon={faListDots} route={'Form'}/>
        </View>
        

    </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 24
    },
    shortcut: {
        backgroundColor: 'white',
        elevation: 5,
        padding: 16,
        borderRadius: 8,
        width: 150,
        height: 100
    },
    shortcutContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shortcutText: {
        color: 'black'
    }
})