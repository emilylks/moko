import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StoreItemComponent from '../components/StoreItemComponent.js';

function StoreFront({ navigation, route }) {
  const { height } = Dimensions.get('window');

  const {storeName} = route.params;
  const {desc} = route.params;
  const {storeID} = route.params;

  const isFocused = useIsFocused();

  const [storeItems, setStoreItems] =  useState([]);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    fetch(`http://ec2-13-57-28-56.us-west-1.compute.amazonaws.com:3000/store_items/by_store/${storeID}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        setStoreItems(responseJson);
        let order = {};
        responseJson.forEach(item => {
          order[item.storeItemID] = 0;
        })
        setUserOrder(order);
        console.log(responseJson);
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const incrementVal = (item) => {
    let temp = {...userOrder};
    temp[item.storeItemID]++;
    setUserOrder(temp);
    updateCart(item, temp[item.storeItemID]);
  };

  const decrementVal = (item) => {
    let temp = {...userOrder};
    if (temp[item.storeItemID] > 0) {
      temp[item.storeItemID]--;
    }
    setUserOrder(temp);
    updateCart(item, temp[item.storeItemID]);
  };

  function updateCart(item, quantity) {
    fetch(`http://ec2-13-57-28-56.us-west-1.compute.amazonaws.com:3000/cart_items`, {
        method: 'PUT',
        body: {
          userID: item.userID,
          storeItemID: item.storeItemID,
          storeID: item.storeID,
          quantity: quantity,
          price: item.price,
          imageUrl: item.imageUrl,
          imageName: item.imageName,
          name: item.name,
          description: item.description
        }
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch(error => console.error(error));
  }

function chooseImage(name){
  if (name=='Celery'){
    return require('../images/celetry.jpg');
  } 

  if (name=='Lettuce'){
    return require('../images/lettuce.jpg');
  }

  if (name=='Tomatoes'){
    return require('../images/tomato.jpg');
  }
  if (name=='Cucumbers'){
    return require('../images/cucumber.jpg');
  }
  if (name == 'Apples'){
    return require('../images/apples.jpg');
  }
  if (name == 'Chocolate Chip Cookie'){
    return require('../images/cookie.jpg');
  }
  if (name == 'Banana Bread'){
    return require('../images/banana.jpg');
  }
  if (name == 'Vanilla Cupcake'){
    return require('../images/cupcake.jpg');
  }
}

  return (
    <View style = {{backgroundColor: '#FFFFFF', height: height, alignItems: 'center'}}>
        <MaterialCommunityIcons name="chevron-left" color='#575757' size={40} style={styles.backBut} onPress={() => navigation.navigate('HomeScreen') }/>
        <Text style={styles.name}>{storeName}</Text>
        <Text style={styles.description}>{desc}</Text>

        <FlatList
          data={storeItems}
          extraData={storeItems}
          numColumns={2}
          style={{marginBottom: 40}}
          keyExtractor={item => item.storeItemID}
          renderItem={({ item }) => (
            <StoreItemComponent inc={incrementVal} itemImage={chooseImage(item.name)} dec={decrementVal} storeItem={item} edit={false}/>
          )}
        >
        </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
    name: {
      marginTop: -40,
      marginHorizontal: 10,
      fontFamily: 'Inter-Regular',
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black'
    },
    backBut: {
      marginTop: 40,
      marginLeft: -400
    },
    description:{
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
    }
});

export default StoreFront;
