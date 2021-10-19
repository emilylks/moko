import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home.js';
import StoreFront from '../screens/StoreFront.js';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
                      screenOptions={{
                          headerShown: false,
                      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StoreFront" component={StoreFront} />
    </Stack.Navigator>
  );
}

export default HomeStack;
