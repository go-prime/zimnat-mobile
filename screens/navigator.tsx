import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {
  faUser,
  faHouse,
  faHeart,
  faShoppingCart,
  faUserGraduate,
  faShop,
  faHandshake,
  faDoorOpen,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {shadow, text} from '../styles/inputs';
import HomeScreen from './partner_store/home';
import PartnerScreen from './partner_store/partner';
import BundleScreen from './partner_store/bundle';
import ProductScreen from './partner_store/product';
import CategoryScreen from './partner_store/category';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  Appearance,
} from 'react-native';
import colors from '../styles/colors';
import WishlistScreen from './billing/wishlist';
import CartScreen from './billing/cart';
import ProfileScreen from './profile';
import CoursesHomeScreen from './edutec/home';
import LoginScreen from './login';
import CourseCategoryScreen from './edutec/courses';
import MarketplaceHome from './marketplace/home';
import CourseScreen from './edutec/course';
import VideoPlayer from './edutec/video';
import ArticleViewer from './edutec/article';
import ProduceScreen from './marketplace/produce';
import StorefrontScreen from './marketplace/storefront';
import MarketplaceCategoryScreen from './marketplace/category';
import {useNavigation} from '@react-navigation/native';
import Subscriptions from './edutec/my_courses';
import InAppWebViewScreen from './web';
import BooksHomeScreen from './books/home';
import Centered from '../components/layout';
import SearchScreen from './search';
import SubscriptionScreen from './billing/subscription';
import SubscriptionListScreen from './billing/subscriptions';
import AddInventoryScreen from './marketplace/merchant/add_inventory';
import ManageStorefrontScreen from './marketplace/merchant/manage_storefront';
import SaleDetailScreen from './marketplace/merchant/sale_detail';
import ConfirmSaleScreen from './marketplace/merchant/confirm_sale';
import ManageInventoryScreen from './marketplace/merchant/manage_inventory';
import ManageSalesScreen from './marketplace/merchant/manage_sales';
import AddProduceScreen from './marketplace/merchant/add_produce';

const Drawer = createDrawerNavigator();

const DrawerItem = props => {
  let source = props.source;
  const dark_mode = Appearance.getColorScheme() === 'dark';
  if (dark_mode && props.dark_source) {
    source = props.dark_source;
  }

  return (
    <Pressable onPress={props.handler}>
      <View style={styles.statusContainer}>
        {props.icon && (
          <FontAwesomeIcon icon={props.icon} color={colors.primary} size={24} />
        )}
        {source && (
          <Centered styles={{width: 30, height: 30, overflow: 'hidden'}}>
            <Image source={source} style={{width: 80, height: 80}} />
          </Centered>
        )}
        <Text style={styles.status}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

function DrawerContent(props): JSX.Element {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        source={require('../assets/images/marketplace.png')}
        dark_source={require('../assets/images/marketplace_dark.png')}
        label="Marketplace"
        handler={() => props.navigation.navigate('Marketplace Home')}
      />
      <DrawerItem
        source={require('../assets/images/partner_store.png')}
        dark_source={require('../assets/images/partner_store_dark.png')}
        label="Partner Store"
        handler={() => props.navigation.navigate('Home')}
      />

      <DrawerItem
        source={require('../assets/images/edutec.png')}
        dark_source={require('../assets/images/edutec_dark.png')}
        label="Edutec"
        handler={() => props.navigation.navigate('Courses Home')}
      />
      <DrawerItem
        source={require('../assets/images/books.png')}
        dark_source={require('../assets/images/books_dark.png')}
        label="Business Books"
        handler={() => props.navigation.navigate('Books')}
      />
      <DrawerItem
        icon={faUser}
        label="My Profile"
        handler={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        icon={faHeart}
        label="My Wishlist"
        handler={() => props.navigation.navigate('Wishlist')}
      />
      <DrawerItem
        icon={faShoppingCart}
        label="My Shopping Cart"
        handler={() => props.navigation.navigate('Cart')}
      />
    </DrawerContentScrollView>
  );
}

const NavOptions = props => {
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <FontAwesomeIcon
          icon={faSearch}
          size={28}
          color={colors.primary}
          style={{marginRight: 16}}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <FontAwesomeIcon
          icon={faDoorOpen}
          size={28}
          color={colors.primary}
          style={{marginRight: 16}}
        />
      </Pressable>
    </View>
  );
};

export default function HomeScreenNavigator({navigation}): JSX.Element {
  return (
    <Drawer.Navigator
      backBehavior="history"
      swipeEnabled={false}
      screenOptions={{
        headerRight: () => <NavOptions />,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          ...text,
        },
        headerTintColor: colors.primary,
        headerShadowVisible: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen component={AddProduceScreen} name="Add Produce" />
      {/* Basic Screens */}
      <Drawer.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <Drawer.Screen component={WishlistScreen} name="Wishlist" />
      <Drawer.Screen component={CartScreen} name="Cart" />
      <Drawer.Screen component={ProfileScreen} name="Profile" />
      <Drawer.Screen component={SearchScreen} name="Search" />
      <Drawer.Screen component={SubscriptionListScreen} name="Subscriptions" />
      <Drawer.Screen component={SubscriptionScreen} name="Subscription" />
      <Drawer.Screen
        options={{headerShown: false}}
        component={InAppWebViewScreen}
        name="WebView"
      />

      {/* Partner Screens */}
      <Drawer.Screen
        component={MarketplaceCategoryScreen}
        name="Produce Category"
      />
      <Drawer.Screen component={HomeScreen} name="Home" />
      <Drawer.Screen component={PartnerScreen} name="Partner" />
      <Drawer.Screen component={BundleScreen} name="Bundle" />
      <Drawer.Screen component={ProductScreen} name="Product" />
      <Drawer.Screen component={CategoryScreen} name="Category" />

      {/* Edutec Screens */}
      <Drawer.Screen component={CoursesHomeScreen} name="Courses Home" />
      <Drawer.Screen component={CourseCategoryScreen} name="Course Category" />
      <Drawer.Screen component={CourseScreen} name="Course" />
      <Drawer.Screen
        component={VideoPlayer}
        name="Video"
        gestureEnabled={false}
        swipeEnabled={false}
      />
      <Drawer.Screen component={ArticleViewer} name="Article" />
      <Drawer.Screen component={Subscriptions} name="My Course Subscriptions" />

      {/* Marketplace Screens */}
      <Drawer.Screen component={MarketplaceHome} name="Marketplace Home" />
      <Drawer.Screen component={ProduceScreen} name="Produce" />
      <Drawer.Screen component={StorefrontScreen} name="Storefront" />
      
      <Drawer.Screen
        component={ManageStorefrontScreen}
        name="Manage Storefront"
      />
      <Drawer.Screen component={SaleDetailScreen} name="Sale Detail" />
      <Drawer.Screen component={ConfirmSaleScreen} name="Confirm Sale" />
      <Drawer.Screen
        component={ManageInventoryScreen}
        name="Manage Inventory"
      />
      <Drawer.Screen component={ManageSalesScreen} name="Manage Sales" />
      
      
      {/* Books */}
      <Drawer.Screen component={BooksHomeScreen} name="Books" />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  status: {
    ...text,
    fontWeight: 'bold',
    paddingLeft: 18,
    fontSize: 18,
  },
});
