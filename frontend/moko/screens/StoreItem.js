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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function StoreItem({ navigation, route }) {
  const { height } = Dimensions.get('window');
  const [qty, onChangeQty] = React.useState("X");
  const [price, onChangePrice] = React.useState("X.XX");
  const [text, onChangeText] = React.useState("add a description");

  const {storeItemName} = route.params;
  const {storeItemImage} = route.params;

    return (
        <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <View style = {{backgroundColor: '#FFFFFF', height: height}}>
        <View style = {{flexDirection: 'row'}}> 
            <Text style={styles.name}>{storeItemName}</Text>     
        </View> 
        <View style = {{flexDirection: 'column'}}>
            <Image style = {styles.image} source={storeItemImage}/> 
           
            <View style = {{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 30}}> 
                <Text style = {styles.text1}>Qty:</Text>
                <TextInput style={styles.qty} 
                        onChangeText={onChangeQty}
                        value={qty}
                        placeholder="X"
                        keyboardType="numeric"
                />
            </View>

            <View style = {{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 30}}> 
                <Text style = {styles.text1}>Price: $</Text>
                <TextInput style={styles.price} 
                        onChangeText={onChangePrice}
                        value={price}
                        placeholder="X.XX"
                        keyboardType="numeric"
                />
            </View>

            <View style = {{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 30}}> 
                <Text style = {styles.text1}>Description:</Text>
                <TextInput style={styles.desc} 
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="add a description of your product"
                />
            </View>
            
            <View style = {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableOpacity style={styles.done} onPress={() =>  navigation.navigate('Store')}> 
                    <MaterialCommunityIcons name="check" color='#FFFFFF' size={50} style={{marginTop: -5}}/> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.delete} onPress={() =>  navigation.navigate('Store')}> 
                    <MaterialCommunityIcons name="trash-can-outline" color='#87B676' size={40} style={{}}/> 
                </TouchableOpacity>
            </View>
           
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
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
        marginTop: 80,
        width: 250,
        height: 250
    },
    text1: {
        marginTop: 15,
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        alignSelf: 'center'
    },
    qty: {
        height: 35,
        width: 100,
        borderWidth: 2,
        padding: 5,
        textAlign:'center',
        marginTop: 20, 
        marginLeft: 95,
        fontSize: 20, 
        borderColor: '#E0E0E0', 
        borderRadius: 10
      },
      price: {
        height: 35,
        width: 100,
        borderWidth: 2,
        padding: 5,
        textAlign:'center',
        marginTop: 20, 
        marginLeft: 60,
        fontSize: 20, 
        borderColor: '#E0E0E0', 
        borderRadius: 10
      },
    desc: {
        height: 35,
        width: 220,
        borderWidth: 2,
        padding: 5,
        textAlign:'center',
        marginTop: 20, 
        marginLeft: 15,
        fontSize: 20,
        borderColor: '#E0E0E0',
        borderRadius: 10
    }, 
    done: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 50, 
        width: 90, 
        backgroundColor: '#87B676', 
        borderWidth: 3, 
        borderColor: '#87B676', 
        borderRadius: 20, 
        marginTop: 40, 
        //marginLeft: 10
    }, 
    delete: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 50, 
        width: 90, 
        backgroundColor: '#FFFFFF', 
        borderWidth: 3, 
        borderColor: '#87B676', 
        borderRadius: 20, 
        marginTop: 40, 
        //marginRight: 20
    }


});

export default StoreItem;
