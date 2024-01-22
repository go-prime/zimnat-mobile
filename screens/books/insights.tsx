import React from 'react'
import {View, Text, ScrollView, StyleSheet, processColor} from 'react-native'
import { Heading, Label, SmallLabel } from '../../components/text'
import {PieChart, LineChart} from 'react-native-charts-wrapper';
import { card } from '../../styles/inputs';
import { text } from '../../styles/text';

const Bar = ({label, value, per, color}) => {
    return (
        <View style={styles.barContainer}>
            <View style={styles.bar}>
                <View style={[{width: `${per}%`, backgroundColor: color}, styles.filledBar]}></View>
            </View>
            <View style={styles.barLabel}>
                <SmallLabel>{label}</SmallLabel>
                <Label>{`$ ${value.toFixed(2)}`}</Label>
            </View>
        </View>
    )
}


export default function InsightScreen(props) {
    return (
    <ScrollView>
        <View style={styles.card}>
            <Heading>Revenue vs Expenses</Heading>
            <Bar per={80} label={'Revenue'} color={'limegreen'} value={3000} />
            <Bar per={60} label={'Expenses'} color={'crimson'} value={2400} />
            <Bar per={20} label={'Profit'} color={'steelblue'} value={600} />
        </View>
        <View style={styles.card}>
            <Heading>Expense Breakdown</Heading>
            <View style={{flex: 1, height: 200}}>
                <PieChart 
                    style={styles.chart} 
                    drawEntryLabels={false}
                    legend={{
                        enabled: true,
                        textSize: 15,
                        form: 'CIRCLE',
                
                        horizontalAlignment: "RIGHT",
                        verticalAlignment: "TOP",
                        orientation: "VERTICAL",
                        wordWrapEnabled: true
                      }}
                    data={{
                    dataSets: [{
                        label: '',
                        config: {
                            valueTextSize: 14,
                            colors: [processColor('#FA4B37'), processColor('#28DC75'), processColor('#2FA0EC'), processColor('#8CEAFF'), processColor('#FFD305')]
                        },
                        values: [
                            {value: 50, label: 'COGS'},
                            {value: 10, label: 'Transport'},
                            {value: 20, label: 'Rent'},
                            {value: 10, label: 'Utilities'},
                            {value: 20, label: 'Labour'},
                        ]
                    }]
                }} />    
            </View>
        </View>
        <View style={styles.card}>
            <Heading>Accounts Receivable</Heading>
            <View style={{flex: 1, height: 200}}>
                <PieChart 
                    style={styles.chart}
                    drawEntryLabels={false}
                    entryLabelTextSize={12}
                    legend={{
                        enabled: true,
                        textSize: 15,
                        form: 'CIRCLE',
                        horizontalAlignment: "RIGHT",
                        verticalAlignment: "TOP",
                        orientation: "VERTICAL",
                        wordWrapEnabled: true
                      }}
                    data={{
                    dataSets: [{
                        label: '',
                        config: {
                            valueTextSize: 14,
                            colors: [processColor('#FA4B37'), processColor('#28DC75'), processColor('#2FA0EC'), processColor('#8CEAFF'), processColor('#FFD305')]
                        },
                        values: [
                            {value: 50, label: 'Frank Sinatra'},
                            {value: 15, label: 'MHET'},
                            {value: 20, label: 'Latrom Sys.'},
                            {value: 15, label: 'INGCO'},
                        ]
                    }]
                }} />    
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        ...card,
        margin: 12,
        padding: 8,
        borderRadius: 5
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#eee",
        height: 40,
        marginBottom: 12,
        flex: 1
    },
    filledBar: {
        height: 40,
        borderRadius: 5
    },
    barContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    barLabel: {
        width: 80
    },
    chart: {
        flex: 1
    }

})