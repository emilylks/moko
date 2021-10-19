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
  Button,
  Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//itemName, description, price, imageURL, qty
export default function CartItem(props) {
   let cartItem = props.cartItem;
   let checkout = props.checkout;
   console.log(cartItem);
   const [qty, setQty] = useState(cartItem.quantity);

    const incrementVal = () => {
      props.inc(cartItem);
      setQty(prevQty => prevQty + 1);
    };

    const decrementVal = () => {
      props.dec(cartItem);
      if (qty > 0) {
        setQty(prevQty => prevQty - 1);
      }
    };

    function chooseImage(name){
        if (name == 'Chocolate Chip Cookie'){
        return require('../images/cookie.jpg');
      }
      if (name == 'Banana Bread'){
        return require('../images/banana.jpg');
      }
      if (name == 'Vanilla Cupcake'){
        return require('../images/cupcake.jpg');
      }
    
      };

    return (
            <View style = {styles.item}>
                <Image style =  {styles.itemImage} source={chooseImage(cartItem.name)} />

                <View style = {{flexDirection: 'column', marginLeft: 10, width: 200}}>
                    <Text style = {styles.itemName}>{cartItem.name}</Text>
                    <Text style = {styles.itemDescript}>{cartItem.description}</Text>
                    <Text style = {styles.itemPrice}>${cartItem.price}</Text>
                </View>

                {checkout ?
                  <View style = {{width: 38, height: 40, backgroundColor: '#87B676', borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style ={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{qty}</Text>
                  </View>
                  :
                  <View style = {{flexDirection: 'row', marginRight: 50}}>
                    <TouchableOpacity style={styles.button1} onPress={() => incrementVal()}  >
                        <MaterialCommunityIcons name="plus" color={'#4C6D41'} size={25} style={{marginLeft: -7}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={() => decrementVal()}  >
                        <MaterialCommunityIcons name="minus" color={'#4C6D41'} size={25} style={{marginLeft: 7}}/>
                    </TouchableOpacity>

                    <View style = {{width: 37, height: 35, backgroundColor: '#87B676', marginLeft: -66, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{qty}</Text>
                    </View>
                  </View>
                 }
            </View>
    );
};

const styles = StyleSheet.create({
    item: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
        borderWidth: 2,
        paddingBottom: 15,
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#FFFFFF',
        borderTopColor: '#FFFFFF',
        borderBottomColor: '#E0E0E0',
        justifyContent: 'center'
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold'
      },
    itemDescript: {
        fontSize: 15
    },
    itemPrice: {
        fontSize: 18,
        color: '#4C6D41',
        fontWeight: 'bold'
    },
    itemImage: {
        height: 80,
        width: 80
    },
    button1: {
        height: 35,
        width: 38,
        borderWidth: 1,
        borderColor: '#87B676',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2: {
        height: 35,
        width: 38,
        borderWidth: 1,
        borderColor: '#87B676',
        borderRadius: 10,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
