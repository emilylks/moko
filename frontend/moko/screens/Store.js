import React, { useState } from 'react';
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
import StoreItemComponent from '../components/StoreItemComponent.js';

const { height } = Dimensions.get('window');
function Store({ navigation }) {
  const [storeItems, setStoreItems] = useState([
    {
      storeItemID: 1,
      storeID: 1,
      name: "Cucumber",
      description: "A very fresh cucumber",
      stockQty: 10,
      price: 1.99,
      imageUrl: require('../images/cucumber.jpg'),
      imageName: ""
    },
    {
      storeItemID: 2,
      storeID: 1,
      name: "Tomato",
      description: "A very fresh tomato",
      stockQty: 10,
      price: .99,
      imageUrl: require('../images/tomato.jpg'),
      imageName: ""
    },
    {
      storeItemID: 3,
      storeID: 1,
      name: "Eggs",
      description: "Organic Eggs",
      stockQty: 10,
      price: 12.80,
      imageUrl: require('../images/eggs.jpg'),
      imageName: ""
    },
    {
      storeItemID: 4,
      storeID: 1,
      name: "Coffee",
      description: "Freshly roasted coffee",
      stockQty: 10,
      price: 9.70,
      imageUrl: require('../images/coffee.jpg'),
      imageName: ""
    },
  ]);

  if ([...storeItems].length == 0) {
    return (
      <View style = {{backgroundColor: '#FFFFFF', height: height}}>
        <View style = {{flexDirection: 'row'}}>
            <Text style={styles.name}>Store</Text>
        </View>
        <View style = {{flexDirection: 'column'}}>
            <Image style = {styles.image} source={require('../images/storeEmpty.png')}/>
            <Text style = {styles.text1}>Become a vendor</Text>
            <Text style = {styles.text2}>Want to join your local market</Text>
            <Text style = {styles.text3}>community?</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('UserStack')}>
                <Text style={styles.btnText}>Create your store</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={{flexDirection:'column', backgroundColor: '#FFFFFF', alignItems: 'center', height: height}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.storeName}>Your Store Name</Text>
        </View>
        <TouchableOpacity style={styles.dotBtn} onPress={() => navigation.navigate('AddStoreItem')}>
            <Text style={styles.dotBtnText}>+ Add Product</Text>
        </TouchableOpacity>
        <FlatList
          data={storeItems}
          extraData={storeItems}
          numColumns={2}
          keyExtractor={item => item.storeItemID}
          renderItem={({ item }) => (
            <StoreItemComponent storeItem={item} storeItemName={item.name} itemImage={item.imageUrl} edit={true} location='StoreItem' navigation={navigation} />
          )}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    name: {
        marginTop: 20,
        marginLeft: 40,
        marginHorizontal: 10,
        fontFamily: 'Inter-Regular',
        fontSize: 40
    },
    image: {
        alignSelf: 'center',
        marginTop: 120,
        width: 300,
        height: 250
    },
    text1: {
        marginTop: 20,
        fontSize: 30,
        fontFamily: 'Inter-Bold',
        alignSelf: 'center'
    },
    text2: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'Inter-Light',
        alignSelf: 'center'
    },
    text3: {
        fontSize: 20,
        fontFamily: 'Inter-Light',
        alignSelf: 'center'
    },
    btn:{
        height:55,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50,
        backgroundColor:"#87B676",
        width: "70%",
        borderRadius:15,
        alignSelf: 'center',
        marginBottom: 20,
      },
      btnText: {
        height: 50,
        flex: 1,
        padding: 10,
        alignSelf: 'center',
        alignItems: "center",
        alignContent: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inter-Regular'
      },
      storeName:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20
      },
      dotBtn: {
        height:55,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 30,
        width: "80%",
        borderRadius:15,
        borderWidth: 2,
        borderColor: '#DC8433',
        borderStyle: 'dashed',
        alignSelf: 'center',
        marginBottom: 20,
      },
      dotBtnText:{
        height: 50,
        flex: 1,
        padding: 10,
        alignSelf: 'center',
        alignItems: "center",
        alignContent: 'center',
        color: '#DC8433',
        fontSize: 20,
        fontFamily: 'Inter-Regular'
      },
      tag: {
        marginTop: 20,
        fontSize: 25,
        color: '#4C6D41',
        fontWeight: 'bold'
      },
      flatList: {
        alignItems: 'center'
      }
});

export default Store;
