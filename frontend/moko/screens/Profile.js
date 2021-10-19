import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Profile({ navigation }) {
  const { height } = Dimensions.get('window');
  const { logout } = useContext(AuthContext);

  return (
    <View style={{backgroundColor: '#FFFFFF', height: height}}>
        <Text style={styles.name}>Profile</Text>

        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.headerText}>Account</Text>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="account" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Edit Profile</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="key" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Change Password</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style={styles.headerText}>General</Text>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="basket" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Orders</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="heart" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Favorites</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="map-marker" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>My Addresses</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'column', marginLeft: 20}}>
          <Text style = {styles.headerText}>My Store</Text>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="clipboard-check" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Manage Sales</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
              <MaterialCommunityIcons name="cog" color='#575757' size={40} style={{width: 100}}/>
              <Text style={styles.optionsText}>Store Settings</Text>
              <MaterialCommunityIcons name="chevron-right" color='#575757' size={35}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <MaterialCommunityIcons name="logout-variant" color='#575757' size={35} style= {{marginLeft: 10}}/>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    name: {
      marginTop: 20,
      marginLeft: 40,
      marginHorizontal: 10,
      fontFamily: 'Inter-Regular',
      fontSize: 30,
      fontWeight: 'bold'
      },
    headerText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4C6D41',
      marginTop: 25,
    },
    profileOption: {
      flexDirection: 'row',
      marginLeft: 30,
      height: 40,
      marginTop: 10
    },
    optionsText: {
      fontSize: 18,
      width: 250,
      marginTop: 5
    },
    logout: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      justifyContent: 'space-around',
    },
    logoutText:{
      fontSize: 20,
      marginLeft: -270,
      marginTop: -5
    }
});

export default Profile;
