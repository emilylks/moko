import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/UserLogin.js';
import SignUpScreen from '../screens/SignUp.js';

const Stack = createStackNavigator();

function SignUpStack() {
  return (
    <Stack.Navigator initialRouteName="Login"
                     screenOptions={{
                        headerShown: false
                     }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default SignUpStack;
