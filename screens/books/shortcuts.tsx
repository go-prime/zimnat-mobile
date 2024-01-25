import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native'
import { faBook, faBoxes, faCalendar, faCalendarAlt, faChartLine, faClipboardList, faDollarSign, faFile, faFileAlt, faFileInvoiceDollar, faHand, faListDots, faPenFancy, faRuler, faScaleBalanced, faTruck, faUser, faUserAlt, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { Heading } from '../../components/text'
import { background, text } from '../../styles/text'
import { card, iconColor } from '../../styles/inputs'

const Shortcut = ({icon, text, route}) => {
    const navigator = useNavigation()
    return (
        <Pressable onPress={() => {
            navigator.navigate(route.name, route.options)
        }} style={styles.shortcut} >
            <View style={styles.shortcutContent} >
                <FontAwesomeIcon icon={icon} size={40} color={iconColor}/>
                <Text style={styles.shortcutText} >{text}</Text>
            </View>
        </Pressable>
    )
}

export default function ShortcutScreen(props) {
    return (
    <ScrollView style={{backgroundColor: background}}>
        <Heading>Sales</Heading>
        <View style={styles.content}>
        <Shortcut text="Sales Invoice"  icon={faFileAlt} route={{name: "List", options: {doctype: "Sales Invoice"}}}/>
        <Shortcut text="Quotation"  icon={faPenFancy} route={{name: "List", options: {doctype: "Quotation"}}}/>
        <Shortcut text="Credit Note"  icon={faClipboardList} route={{name: "List", options: {doctype: "Credit Note"}}}/>
        <Shortcut text="Prices"  icon={faDollarSign} route={{name: "List", options: {doctype: "Item Price"}}}/>
        </View>
        <Heading>Inventory</Heading>
        <View style={styles.content}>
        <Shortcut text="Item"  icon={faBoxes} route={{name: "List", options: {doctype: "Item"}}}/>
        <Shortcut text="Units"  icon={faRuler} route={{name: "List", options: {doctype: "UOM"}}}/>
        <Shortcut text="Warehouses"  icon={faWarehouse} route={{name: "List", options: {doctype: "Warehouse"}}}/>
        <Shortcut text="Purchase Order"  icon={faCalendarAlt} route={{name: "List", options: {doctype: "Purchase Order"}}}/>
        <Shortcut text="Purchase Invoice"  icon={faFileInvoiceDollar} route={{name: "List", options: {doctype: "Purchase Invoice"}}}/>
        <Shortcut text="Purchase Receipt"  icon={faTruck} route={{name: "List", options: {doctype: "Purchase Receipt"}}}/>
        
        </View>
        <Heading>Accounts</Heading>
        <View style={styles.content}>
        <Shortcut text="Customers"  icon={faUser} route={{name: "List", options: {doctype: "Customer"}}}/>
        <Shortcut text="Suppliers"  icon={faUserAlt} route={{name: "List", options: {doctype: "Supplier"}}}/>
        <Shortcut text="Journal Entry"  icon={faScaleBalanced} route={{name: "List", options: {doctype: "Journal Entry"}}}/>
        <Shortcut text="Payment"  icon={faHand} route={{name: "List", options: {doctype: "Payment"}}}/>
        <Shortcut text="Currency"  icon={faDollarSign} route={{name: "List", options: {doctype: "Currency"}}}/>
        <Shortcut text="Exchange Rate"  icon={faChartLine} route={{name: "List", options: {doctype: "Currency Exchange"}}}/>
        <Shortcut text="Accounts"  icon={faBook} route={{name: "List", options: {doctype: "Account"}}}/>
        <Shortcut text="Payment Methods"  icon={faListDots} route={{name: "List", options: {doctype: "Payment Method"}}}/>
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
        ...card,
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
        ...text
    }
})