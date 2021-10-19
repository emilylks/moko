import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import UserStack from './UserStack';
import SignUpStack from './SignUpStack';

function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log(user ? "logged in" : "logged out");

  return (
    <NavigationContainer >
      {user ? <UserStack /> : <SignUpStack />}
    </NavigationContainer>
  );
}

export default Routes;
