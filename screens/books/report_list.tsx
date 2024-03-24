import React from 'react';
import {View, Text, ScrollView, StyleSheet, processColor, Pressable} from 'react-native';
import {Heading, Label, SmallLabel} from '../../components/text';
import {PieChart, LineChart} from 'react-native-charts-wrapper';
import {card} from '../../styles/inputs';
import {background, text} from '../../styles/text';
import axios from 'axios';
import constants from '../../constants';
import Loading from '../../components/loading';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';

export default function ReportListScreen(props) {

  return (
    <ScrollView style={{backgroundColor: background.color}}>
      <View style={styles.card}>
        <Heading>Accounts Reports</Heading>
            <ReportButton name="General Ledger" label="General Ledger" />
            <ReportButton name="Trial Balance" label="Trial Balance" />
            <ReportButton name="Statement of Comprehensive Income" label="Income Statement" />
            <ReportButton name="Balance Sheet" label="Balance Sheet" />
            <ReportButton name="Accounts Receivable" label="Accounts Receivable" />
            <ReportButton name="Accounts Payable" label="Accounts Payable" />
      </View>
      <View style={styles.card}>
        <Heading>Sales Reports</Heading>
            <ReportButton name="Customer Statement" label="Customer Statement" />
            <ReportButton name="Invoice Ageing" label="Invoice Ageing" />
      </View>
      <View style={styles.card}>
        <Heading>Inventory Reports</Heading>
            <ReportButton name="Stock Ledger" label="Stock Ledger" />
            <ReportButton name="Stock Levels" label="Stock Levels" />
            <ReportButton name="Outstanding Orders" label="Outstanding Orders" />
            <ReportButton name="Stock Ageing" label="Stock Ageing" />

      </View>
    </ScrollView>
  );
}

const ReportButton  = ({name, label}) => {
  const navigator = useNavigation()
  return (
    <Pressable style={styles.button} onPress={() => {
      navigator.navigate("Report", {id: name})
    }}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>)
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    ...card,
    margin: 12,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
