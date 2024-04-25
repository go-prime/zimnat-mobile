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


const Bar = ({label, value, per, color}) => {
  return (
    <View style={styles.barContainer}>
      <View style={styles.bar}>
        <View
          style={[{width: `${per}%`, backgroundColor: color}, styles.filledBar]}
        />
      </View>
      <View style={styles.barLabel}>
        <SmallLabel>{label}</SmallLabel>
        <Label>{`$ ${value.toFixed(2)}`}</Label>
      </View>
    </View>
  );
};

export default function InsightScreen(props) {
  const [insights, setInsights] = React.useState(null);
  const [range, setRange] = React.useState(1)
  React.useEffect(() => {
    axios
      .get(`${constants.server_url}/api/method/erp.public_api.insights`)
      .then(res => {
        setInsights(res.data.message);
        setRange(Math.max(res.data.message.expenses, res.data.message.total_sales, res.data.message.profit))
      });
  }, []);

  if (!insights) {
    return <Loading />;
  }

  return (
    <ScrollView style={{backgroundColor: background.color}}>
      <View style={styles.card}>
        <Heading>Revenue vs Expenses</Heading>
        <Bar
          per={(insights.total_sales / range) * 100}
          label={'Revenue'}
          color={'limegreen'}
          value={insights.total_sales}
        />
        <Bar
          per={(insights.expenses / range) * 100}
          label={'Expenses'}
          color={'crimson'}
          value={insights.expenses}
        />
        <Bar
          per={(insights.profit / range) * 100}
          label={'Profit'}
          color={'steelblue'}
          value={insights.profit}
        />
      </View>
      <View style={styles.card}>
        <Heading>Expense Breakdown</Heading>
        <View style={{flex: 1, height: 300}}>
          <PieChart
            style={styles.chart}
            drawEntryLabels={false}
            legend={{
              enabled: true,
              textSize: 15,
              form: 'CIRCLE',
              position: 'RIGHT_OF_CHART',
              wordWrapEnabled: true,
            }}
            data={{
              dataSets: [
                {
                  label: '',
                  config: {
                    valueTextSize: 14,
                    colors: [
                      processColor('#FA4B37'),
                      processColor('#28DC75'),
                      processColor('#2FA0EC'),
                      processColor('#8CEAFF'),
                      processColor('#FFD305'),
                    ],
                  },
                  values: insights.expense_breakdown.map(exp => ({
                    value: exp.amount,
                    label: exp.expense_head,
                  })),
                },
              ],
            }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Heading>Accounts Receivable</Heading>
        <View style={{flex: 1, height: 300}}>
          <PieChart
            style={styles.chart}
            drawEntryLabels={false}
            entryLabelTextSize={12}
            legend={{
              enabled: true,
              textSize: 15,
              form: 'CIRCLE',
              position: 'RIGHT_OF_CHART',
              wordWrapEnabled: true,
            }}
            data={{
              dataSets: [
                {
                  label: '',
                  config: {
                    valueTextSize: 14,
                    colors: [
                      processColor('#FA4B37'),
                      processColor('#28DC75'),
                      processColor('#2FA0EC'),
                      processColor('#8CEAFF'),
                      processColor('#FFD305'),
                    ],
                  },
                  values: insights.accounts_receivable.map(ar => ({value: ar.accounts_receivable, label: ar.party})),
                },
              ],
            }}
          />
        </View>
      </View>
      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  card: {
    elevation: 5,
    ...card,
    margin: 12,
    padding: 8,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#eee',
    height: 40,
    marginBottom: 12,
    flex: 1,
  },
  filledBar: {
    height: 40,
    borderRadius: 5,
  },
  barContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  barLabel: {
    width: 80,
  },
  chart: {
    flex: 1,
  }
});
