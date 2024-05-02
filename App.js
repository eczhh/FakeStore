import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

const splashImage = require('./assets/fakestore.png');

const Stack = createStackNavigator();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide the splash screen after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer on unmounting
  }, []);

  if (showSplash) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={splashImage} style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CategoryScreen">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;