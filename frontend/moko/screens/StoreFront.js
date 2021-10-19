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
import { URLS } from '../constants/resources';
import { Colours } from '../constants/colours';

const { height } = Dimensions.get('window');
function StoreFront({ navigation, route }) {
  const { storeName, desc, storeID } = route.params;
  const [storeItems, setStoreItems] =  useState([]);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    fetch(`${URLS.serverUrl}/store_items/by_store/${storeID}`, {
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
    fetch(`${URLS.serverUrl}/cart_items`, {
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

function chooseImage(name) {
  if (name == 'Celery') {
    return require('../images/celetry.jpg');
  } else if (name == 'Lettuce') {
    return require('../images/lettuce.jpg');
  } else if (name == 'Tomatoes') {
    return require('../images/tomato.jpg');
  } else if (name == 'Cucumbers') {
    return require('../images/cucumber.jpg');
  } else if (name == 'Apples') {
    return require('../images/apples.jpg');
  } else if (name == 'Chocolate Chip Cookie') {
    return require('../images/cookie.jpg');
  } else if (name == 'Banana Bread') {
    return require('../images/banana.jpg');
  } else if (name == 'Vanilla Cupcake') {
    return require('../images/cupcake.jpg');
  } else {
    return require('../images/generic_product_image.jpeg');
  }
}

  return (
    <View style = {styles.content}>
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
  content: {
    backgroundColor: Colours.WHITE,
    height: height,
    alignItems: 'center'
  },
  name: {
    marginTop: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: Colours.BLACK
  },
  description:{
    fontSize: 20,
    marginTop: 15,
    marginBottom: 20,
  }
});

export default StoreFront;
