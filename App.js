import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import CartIcon from './components/CartIcon';

const splashImage = require('./assets/fakestore.png');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={splashImage} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }

  const ProductsNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={({ route }) => ({ title: route.params?.category || 'Products' })}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name="MyOrdersScreen"
          component={MyOrdersScreen}
          options={{ title: 'My Orders' }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ title: 'User Profile' }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Products') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'ShoppingCart') {
                return <CartIcon color={color} size={size} />;
              } else if (route.name === 'UserProfile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'MyOrders') {
                iconName = focused ? 'cart' : 'cart-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Products" component={ProductsNavigator} />
          <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} />
          <Tab.Screen name="MyOrders" component={MyOrdersScreen} />
          <Tab.Screen name="UserProfile" component={UserProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
