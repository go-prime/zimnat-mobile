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
} from '@fortawesome/free-solid-svg-icons';
import {shadow, text} from '../styles/inputs';
import HomeScreen from './partner_store/home';
import PartnerScreen from './partner_store/partner';
import BundleScreen from './partner_store/bundle';
import ProductScreen from './partner_store/product';
import CategoryScreen from './partner_store/category';
import {StyleSheet, Pressable, Text, View} from 'react-native';
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

const Drawer = createDrawerNavigator();

const DrawerItem = props => {
  return (
    <Pressable onPress={props.handler}>
      <View style={styles.statusContainer}>
        <FontAwesomeIcon icon={props.icon} color={colors.primary} size={24} />
        <Text style={styles.status}>{props.label}</Text>
      </View>
    </Pressable>
  );
};

function DrawerContent(props): JSX.Element {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={faShop}
        label="Marketplace"
        handler={() => props.navigation.navigate('Marketplace Home')}
      />
      <DrawerItem
        icon={faHandshake}
        label="Partner Store"
        handler={() => props.navigation.navigate('Home')}
      />

      <DrawerItem
        icon={faUserGraduate}
        label="Edutec"
        handler={() => props.navigation.navigate('Courses Home')}
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
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <FontAwesomeIcon
          icon={faUser}
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
      <Drawer.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <Drawer.Screen
        component={MarketplaceCategoryScreen}
        name="Produce Category"
      />
      <Drawer.Screen component={HomeScreen} name="Home" />
      <Drawer.Screen component={CoursesHomeScreen} name="Courses Home" />
      <Drawer.Screen component={PartnerScreen} name="Partner" />
      <Drawer.Screen component={BundleScreen} name="Bundle" />
      <Drawer.Screen component={ProductScreen} name="Product" />
      <Drawer.Screen component={CategoryScreen} name="Category" />
      <Drawer.Screen component={WishlistScreen} name="Wishlist" />
      <Drawer.Screen component={CartScreen} name="Cart" />
      <Drawer.Screen component={ProfileScreen} name="Profile" />
      <Drawer.Screen component={CourseCategoryScreen} name="Course Category" />
      <Drawer.Screen component={MarketplaceHome} name="Marketplace Home" />
      <Drawer.Screen component={CourseScreen} name="Course" />
      <Drawer.Screen component={VideoPlayer} name="Video" />
      <Drawer.Screen component={ArticleViewer} name="Article" />
      <Drawer.Screen component={Subscriptions} name="Subscriptions" />
      <Drawer.Screen component={ProduceScreen} name="Produce" />
      <Drawer.Screen component={StorefrontScreen} name="Storefront" />
      <Drawer.Screen options={{headerShown: false}} component={InAppWebViewScreen} name="WebView" />
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
