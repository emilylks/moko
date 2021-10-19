import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Store from '../screens/Store.js';
import StoreItem from '../screens/StoreItem.js';
import AddStoreItem from '../screens/AddStoreItem.js';

const Stack = createStackNavigator();

function StoreStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Store"
                      screenOptions={{
                          headerShown: false,
                      }}>
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="StoreItem" component={StoreItem} />
      <Stack.Screen name="AddStoreItem" component={AddStoreItem} />
    </Stack.Navigator>
  );
}

export default StoreStack;
