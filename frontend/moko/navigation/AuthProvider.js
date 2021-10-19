import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { URLS } from '../constants/resources';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email == "" || email == null)
            Alert.alert("Please enter a valid email");
          else if (password == "" || password == null)
            Alert.alert("Please enter a password");
          else {
            await auth().signInWithEmailAndPassword(email, password)
                  .catch(e => {
                    if (e.code === 'auth/invalid-email')
                      Alert.alert("Invalid Email Address");
                    if (e.code === 'auth/user-disabled')
                      Alert.alert("This user has been disabled");
                    if (e.code === 'auth/user-not-found')
                      Alert.alert("User not found, please try again");
                    if (e.code === 'auth/wrong-password')
                      Alert.alert("Incorrect Password");

                    console.log(e);
                    console.log('Sign in Failed');
                  });
          }
        },
        register: async (email, password, address, phone, isSeller) => {
            if (email == "" || email == null)
              Alert.alert("Please enter a valid email");
            else if (password == "" || password == null)
              Alert.alert("Please enter a password");
            else {
              await auth().createUserWithEmailAndPassword(email, password)
                    .then( async (user) => {
                      await fetch(`${URLS.serverUrl}/users`, {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userID: user.user.uid,
                          isSeller: isSeller,
                          address: address,
                          email: email,
                          phoneNumber: phone,
                        })
                      });
                    })
                    .catch(e => {
                      if (e.code === 'auth/email-already-in-use')
                        Alert.alert("An account already exists with this email");
                      if (e.code === 'auth/invalid-email')
                        Alert.alert("Invalid Email Address");
                      if (e.code === 'auth/weak-password')
                        Alert.alert("This password is too weak, please enter a new one");

                      console.log(e);
                      console.log('Create User Failed');
                  });
                }
        },
        logout: async () => {
            await auth().signOut()
                    .catch(err => console.error(e));
        }
      }}>
      {(children)}
    </AuthContext.Provider>
  );
};
