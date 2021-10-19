import { throwStatement } from '@babel/types';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
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
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import { URLS } from '../constants/resources'
import { Colours } from '../constants/colours'

function HomeScreen({ navigation }) {
  const { height } = Dimensions.get('window');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [listItems, setListItems] = useState([]);
  const [radius, setRadius] = useState(5);
  const [storesWithinRadius, setStoresWithinRadius] = useState([]);
  const [colorChange, setColorChange] = useState([
      false, false, false, false, false, false, false, false, false, false
  ]);
  const [tagItems, setTagItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    fetchTags();
    fetchUser();
  }, [isFocused]);

  function fetchTags() {
    fetch(`${URLS.serverUrl}/tags`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        setTagItems(responseJson);
        console.log(responseJson);
    })
    .catch((error) => {
        console.log(error)
    })
  }

  function fetchUser() {
    fetch(`${URLS.serverUrl}/users/${firebase.auth().currentUser.uid}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        setUser(responseJson[0]);
        console.log(responseJson);
    })
    .then(() => updateRadiusSearch('5')) // default radius is 5km
    .catch((error) => {
        console.log(error)
    })
  }

  function updateListItems(search) {
    setSearch(search);
    // update the list of stores
    setListItems(() => {
      let storeList = storesWithinRadius.filter(item =>
        storesWithinRadius.filter(inRad => inRad.storeID == item.storeID).length > 0 &&
        (item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()))
      );
      return storeList;
    });
  }

  function updateRadiusSearch(radius) {
    if (radius !== "") {
      let addressUrl = encodeURIComponent(user.address);
      fetch(`${URLS.serverUrl}/stores/${radius}/${addressUrl}`, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        setStoresWithinRadius(responseJson);
        return responseJson;
      })
      .then((stores) => {
        // update the list of stores
        console.log("updating radius search");
        console.log(stores);
        setListItems(() => {
          let storeList = stores.filter(item =>
            stores.filter(inRad => inRad.storeID == item.storeID).length > 0 &&
            (item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()))
          );
          return storeList;
        });
      })
      .catch(error => console.error(error));
    }
  }

  function changeColor(index) {
    var temp = [...colorChange];
    temp[index] = !temp[index];
    setColorChange(temp);
  }

  function pickImage(name){
      if (name == 'Sweet Stand'){
        return require('../images/cake.jpg');
      } else {
        return require('../images/veggie.jpg');
      }
  }

  return (
    <View style={{backgroundColor: '#FFFFFF', height: height, alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.name} source={require('../images/Logo_Final.png')}/>
        <MaterialCommunityIcons name="map-marker" color={Colours.DARK_GRAY} size={32} style={styles.locationIcon}/>
        <Text style={styles.locationText}>Radius:</Text>
        <TextInput
          style={styles.radiusBox}
          onChangeText={(radius) => updateRadiusSearch(radius)}
          keyboardType="numeric"
          placeholder='5'
        ></TextInput>
        <Text style={styles.locationText}>km</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
            style={styles.searchBar}
            onChangeText={(search) => updateListItems(search)}
            placeholder='Search'
        ></TextInput>
        <MaterialCommunityIcons name="close-circle" color={Colours.DARK_GRAY} size={30} style={styles.searchIcon}
                                onPress={() => setSearch("")} />
      </View>
      <View style={styles.tagList}>
        <FlatList
          horizontal
          data={tagItems}
          extraData={tagItems}
          keyExtractor={item => item.tagID}
          renderItem={({item}) => (
            <TouchableOpacity style={colorChange[item.tagID - 1] ? styles.selectedTagRectangle : styles.tagRectangle}
                                onPress={()=> changeColor(item.tagID - 1)}>
              <Text style={colorChange[item.tagID - 1] ? styles.selectedTagName : styles.tagName }>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={listItems}
        extraData={listItems}
        keyExtractor={item => item.description}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('StoreFront', { storeName: item.name, desc: item.description, storeID: item.storeID })}>
            <View style={styles.vendorRectangle}>
                <Image style={styles.image} source={pickImage(item.name)} />
                <View style={{flexDirection: 'column', marginTop: 10, marginLeft: 8, alignItems: 'flex-start', width: 200}}>
                  <Text style={styles.vendorName}>{item.name}</Text>
                  <Text style={styles.vendorDescription}>{item.description}</Text>
                </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    name: {
      marginTop: 35,
      marginRight: 20
    },
    searchBar: {
      borderRadius: 10,
      backgroundColor: Colours.LIGHT_GRAY,
      width: "90%",
      height: 50,
      marginTop: 20,
      fontSize: 20,
      fontFamily: 'Inter-Light',
      paddingLeft: 30,
      marginLeft: -20,
    },
    radiusBox: {
      width: 40,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colours.LIGHT_GRAY,
      borderRadius: 7,
      marginTop: 35,
      marginLeft: 5,
      paddingBottom: 0,
      fontSize: 15
    },
    searchIcon: {
        marginTop:30,
        marginLeft: -50
    },
    locationIcon: {
        marginTop: 40,
        marginLeft: 35
    },
    locationText: {
        marginTop: 50,
        marginLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    tagRectangle: {
        height: 45,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderColor: '#4C6D41',
        borderWidth: 1.5,
        marginTop: 10,
        alignItems: 'center',
        marginHorizontal: 10
    },
    selectedTagRectangle:{
        height: 45,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#4C6D41',
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
    selectedTagName: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 8,
        color: Colours.WHITE
    },
    vendorRectangle: {
        height: 122,
        width: 350,
        flexDirection: 'row',
        borderTopColor: '#87B676',
        borderBottomColor: '#87B676',
        borderLeftColor: Colours.WHITE,
        borderRightColor: Colours.WHITE,
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginTop: -2,
        justifyContent: 'center'
    },
    tagList: {
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 8,
        paddingTop: 8,
        marginLeft: -15
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
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    vendorDescription: {
        fontSize: 18,
        marginTop: 10
    },
    image: {
        width: 100,
        height: 80,
        marginTop: 25
    }
});

export default HomeScreen;
