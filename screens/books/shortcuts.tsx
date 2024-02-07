import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {
  faBook,
  faBoxes,
  faBuilding,
  faCalendar,
  faCalendarAlt,
  faChartLine,
  faClipboardList,
  faDollar,
  faDollarSign,
  faFile,
  faFileAlt,
  faFileInvoiceDollar,
  faHand,
  faListDots,
  faPenFancy,
  faRuler,
  faScaleBalanced,
  faTruck,
  faUser,
  faUserAlt,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import {Heading} from '../../components/text';
import {background, text} from '../../styles/text';
import {card, iconColor} from '../../styles/inputs';
import {TextInput} from 'react-native-gesture-handler';

const ICON_MAP = {
  'fa-book': faBook,
  'fa-boxes': faBoxes,
  'fa-building': faBuilding,
  'fa-calendar-alt': faCalendarAlt,
  'fa-chart-line': faChartLine,
  'fa-clipboard-list': faClipboardList,
  'fa-dollar-sign': faDollarSign,
  'fa-file': faFile,
  'fa-file-alt': faFileAlt,
  'fa-file-invoice-dollar': faFileInvoiceDollar,
  'fa-hand': faHand,
  'fa-list-dots': faListDots,
  'fa-pen-fancy': faPenFancy,
  'fa-ruler': faRuler,
  'fa-scale-balanced': faScaleBalanced,
  'fa-truck': faTruck,
  'fa-user': faUser,
  'fa-user-alt': faUserAlt,
  'fa-warehouse': faWarehouse,
};

const SHORTCUT_LIST = [
  {
    module: 'Sales',
    text: 'Sales Invoice',
    icon: 'fa-file-alt',
    route: {name: 'List', options: {doctype: 'Sales Invoice'}},
  },
  {
    module: 'Sales',
    text: 'Quotation',
    icon: 'fa-pen-fancy',
    route: {name: 'List', options: {doctype: 'Quotation'}},
  },
  {
    module: 'Sales',
    text: 'Credit Note',
    icon: 'fa-clipboard-list',
    route: {name: 'List', options: {doctype: 'Credit Note'}},
  },
  {
    module: 'Sales',
    text: 'Prices',
    icon: 'fa-dollar-sign',
    route: {name: 'List', options: {doctype: 'Item Price'}},
  },
  {
    module: 'Inventory',
    text: 'Item',
    icon: 'fa-boxes',
    route: {name: 'List', options: {doctype: 'Item'}},
  },
  {
    module: 'Inventory',
    text: 'Units',
    icon: 'fa-ruler',
    route: {name: 'List', options: {doctype: 'UOM'}},
  },
  {
    module: 'Inventory',
    text: 'Warehouses',
    icon: 'fa-warehouse',
    route: {name: 'List', options: {doctype: 'Warehouse'}},
  },
  {
    module: 'Inventory',
    text: 'Purchase Order',
    icon: 'fa-calendar-alt',
    route: {name: 'List', options: {doctype: 'Purchase Order'}},
  },
  {
    module: 'Inventory',
    text: 'Purchase Invoice',
    icon: 'fa-file-invoice-dollar',
    route: {name: 'List', options: {doctype: 'Purchase Invoice'}},
  },
  {
    module: 'Inventory',
    text: 'Purchase Receipt',
    icon: 'fa-truck',
    route: {name: 'List', options: {doctype: 'Purchase Receipt'}},
  },
  {
    module: 'Accounts',
    text: 'Customers',
    icon: 'fa-user',
    route: {name: 'List', options: {doctype: 'Customer'}},
  },
  {
    module: 'Accounts',
    text: 'Suppliers',
    icon: 'fa-user-alt',
    route: {name: 'List', options: {doctype: 'Supplier'}},
  },
  {
    module: 'Accounts',
    text: 'Journal Entries',
    icon: 'fa-scale-balanced',
    route: {name: 'List', options: {doctype: 'Journal Entry'}},
  },
  {
    module: 'Accounts',
    text: 'Payment',
    icon: 'fa-hand',
    route: {name: 'List', options: {doctype: 'Customer'}},
  },
  {
    module: 'Accounts',
    text: 'Currency',
    icon: 'fa-dollar-sign',
    route: {name: 'List', options: {doctype: 'Currency'}},
  },
  {
    module: 'Accounts',
    text: 'Exchange Rate',
    icon: 'fa-chart-line',
    route: {name: 'List', options: {doctype: 'Exchange Rate'}},
  },
  {
    module: 'Accounts',
    text: 'Accounts',
    icon: 'fa-book',
    route: {name: 'List', options: {doctype: 'Account'}},
  },
  {
    module: 'Accounts',
    text: 'Payment Methods',
    icon: 'fa-list-dots',
    route: {name: 'List', options: {doctype: 'Payment Method'}},
  },
];

const Shortcut = ({icon, text, route}) => {
  const navigator = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigator.navigate(route.name, route.options);
      }}
      style={styles.shortcut}>
      <View style={styles.shortcutContent}>
        <FontAwesomeIcon icon={icon} size={40} color={iconColor} />
        <Text style={styles.shortcutText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default function ShortcutScreen(props) {
  const [input, setInput] = React.useState('');
  const [filterdItems, setFilteredItems] = React.useState(SHORTCUT_LIST);
  React.useEffect(() => {
    if(!input || input.length < 3) {
        setFilteredItems(SHORTCUT_LIST)
        return
    }
    setFilteredItems(SHORTCUT_LIST.filter(s => s.text.toLowerCase().indexOf(input.toLowerCase()) > -1))

  }, [input])
  
  return (
    <>
        <View style={styles.search}>
            <TextInput placeholder='Search' value={input} onChangeText={setInput} />
        </View>
        {/* <View>
            <Text>My Company</Text>
            <FontAwesomeIcon icon={faBuilding} size={32} color='black' />
        </View> */}
      <ScrollView style={{backgroundColor: background.color}}>
        {Array.from(new Set(filterdItems.map(f => f.module)))
          .sort()
          .map(m => {
            return (<>
              <Heading>{m}</Heading>
              <View style={styles.content}>
                {filterdItems
                  .filter(i => i.module == m)
                  .map(fi => (
                    <Shortcut
                      text={fi.text}
                      icon={ICON_MAP[fi.icon]}
                      route={fi.route}
                    />
                  ))}
              </View>
            </>);
          })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  shortcut: {
    ...card,
    elevation: 5,
    padding: 16,
    borderRadius: 8,
    width: 150,
    height: 100,
  },
  shortcutContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortcutText: {
    ...text,
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    padding: 4,
    margin: 8
  }
});
