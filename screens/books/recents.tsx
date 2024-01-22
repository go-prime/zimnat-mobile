import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native'
import { Heading } from '../../components/text'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { card } from '../../styles/inputs'
import { text } from '../../styles/text'
import { iconColor } from '../../styles/inputs'

const Recent = ({document_type, document_id, icon}) => {
    return (
        <Pressable style={styles.recent}>
            <View style={styles.recentContent}>
                <FontAwesomeIcon icon={faFileAlt} size={48} color={iconColor} />
                <View>
                    <Text style={styles.bold}>{document_type}</Text>
                    <Text style={styles.label}>{document_id}</Text>
                </View>
            </View>
        </Pressable>
    )
}
const Older = ({document_type, document_id, icon}) => {
    return (
        <Pressable style={styles.older}>
                <FontAwesomeIcon icon={faFileAlt} size={28} color={iconColor} />
                <View>
                    <Text style={styles.bold}>{document_type}</Text>
                    <Text style={styles.label}>{document_id}</Text>
                </View>
        </Pressable>
    )
}


export default function RecentScreen(props) {
    return (
    <ScrollView >
        <Heading>Recent Documents</Heading>
        <ScrollView horizontal>
            <Recent document_id={'INV-000156'} document_type={'Sales Invoice'} />
            <Recent document_id={'INV-000150'} document_type={'Sales Invoice'} />
            <Recent document_id={'INV-000148'} document_type={'Sales Invoice'} />
        </ScrollView>
        <Heading>OLDER</Heading>
        <Older document_id={'INV-000128'} document_type={'Sales Invoice'} />
        <Older document_id={'QUOT-000192'} document_type={'Quotation'} />
        <Older document_id={'PROD-0023'} document_type={'Item'} />
        <Older document_id={'PROD-0040'} document_type={'Item'} />
        <Older document_id={'PR-000060'} document_type={'Purchase Receipt'} />
        <Older document_id={'PO-000096'} document_type={'Purchase Order'} />
        <Older document_id={'PROD-0042'} document_type={'Item'} />

    </ScrollView>
    )
}

const styles = StyleSheet.create({
    recentContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
    },
    recent: {
        ...card,
        padding: 24,
        margin: 16,
        borderRadius: 5,
        elevation: 5
    },
    older: {
        ...card,
        padding: 8,
        margin: 6,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
        elevation: 5
    },
    bold: {
        ...text,
        fontWeight: 'bold'
    },
    label: {
        ...text,
        fontSize: 16
    },
})