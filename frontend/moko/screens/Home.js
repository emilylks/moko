import { throwStatement } from '@babel/types';
import React, { useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  FlatList
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

let DATA = [
    {
      desc: 'eggs',
      name: 'egg shop'
    },
    {
      desc: 'meat',
      name: 'meat shop'
    },
    {
      desc: 'veggie',
      name: 'veg shop'
    },
    {
        desc: 'dairy',
        name: 'milk shop'
    },
    {
        desc: 'tofu',
        name: 'tofu shop'
    },

  ];

function HomeScreen({ navigation }) {

  const { height } = Dimensions.get('window');
  const [search, setSearch] = useState('');
  const [listItems, setListItems] = useState([]);

  function updateListItems(search) {
    setSearch(search);
    setListItems(() => {
       return DATA.filter(item => 
        item.desc.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
        );
    });
  }

  return (
    <View style = {{backgroundColor: '#FFFFFF', height: height}}>

    <View style = {{flexDirection: 'row'}}> 
        <Text style={styles.name}>Moko</Text>
        <MaterialCommunityIcons name="map-marker" color= '#575757' size= {32} style={styles.locationIcon}/>
        <Text style ={styles.locationText}>Radius</Text>
    </View>
    <View style = {{flexDirection: 'row'}}>
        <TextInput
            style={styles.searchBar}
            onChangeText={(search) => updateListItems(search)}
            placeholder = 'Search'
          >
        </TextInput>
        <MaterialCommunityIcons name="close-circle" color='#575757' size={30} style={styles.searchIcon}/>
    </View>
    <View style = {styles.scrowl}>
        <ScrollView horizontal = {true} > 
                <TouchableOpacity style = {styles.tagRectangle}>
                    <Text style = {styles.tagName}>Tag1</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.tagRectangle}>
                    <Text style = {styles.tagName}>Tag2</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.tagRectangle}>
                    <Text style = {styles.tagName}>Tag3</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.tagRectangle}>
                    <Text style = {styles.tagName}>Tag2</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.tagRectangle}>
                    <Text style = {styles.tagName}>Tag3</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    <ScrollView>
        <FlatList
        data = {listItems}
        keyExtractor={item => item.desc}
        renderItem={({item}) => (
            <TouchableOpacity> 
        <View style = {styles.vendorRectangle}>
            <Text style = {styles.vendorName}>{item.desc}</Text>
        </View>
    </TouchableOpacity>
        )}
        />
    </ScrollView>

  </View>
  );
}


const styles = StyleSheet.create({
    name: {
        marginTop: 20,
        marginLeft: 40,
        marginHorizontal: 10,
        fontFamily: 'Inter-Light',
        fontSize: 40
    },    
    searchBar: {
        borderRadius: 10, 
        backgroundColor: '#F1EFEF',
        width: "90%",
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        fontSize: 20,
        fontFamily: 'Inter-Light',
        paddingLeft: 30,   
    },
    searchIcon: {
        marginTop:30,
        marginLeft: -50
    },
    locationIcon: {
        marginTop: 40,
        marginLeft: 80
    },
    locationText: {
        marginTop: 45,
        marginLeft: 5,
        fontSize: 20 
    },
    tagRectangle: {
        height: 45,
        width: 100,
        borderRadius: 10,
        borderColor: '#4C6D41',
        borderWidth: 1.5,
        marginTop: 10,
        alignItems: 'center',
        marginHorizontal: 10
    },
    tagName: {
       fontSize:20,
       alignSelf: 'center',
       paddingTop: 8,
       color: '#4C6D41'
    },
    vendorRectangle: {
        height: 122,
        width: '90%',
        borderTopColor: '#87B676',
        borderBottomColor: '#87B676',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#FFFFFF',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 10
    },
    scrowl: {
        //flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row', 
        alignItems: 'center', 
        alignContent: 'center',
        paddingBottom: 8,
        paddingTop: 8
    
    },
    container: {
        flex: 1,
        paddingTop: 22
       },
    item: {
         padding: 10,
         fontSize: 18,
         height: 44,
       },
    vendorName: {
        fontSize: 18
    }
    
});

export default HomeScreen;