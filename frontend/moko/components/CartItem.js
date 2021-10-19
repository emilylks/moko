import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colours } from '../constants/colours';

// itemName, description, price, imageURL, qty
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

  function chooseImage(name) {
    switch(name) {
      case 'Chocolate Chip Cookie':
        return require('../images/cookie.jpg');
      case 'Banana Bread':
        return require('../images/banana.jpg');
      case 'Vanilla Cupcake':
        return require('../images/cupcake.jpg');
      default:
        return require('../images/generic_product_image.jpeg');
    }
  };

  return (
    <View style={styles.cartItem}>
      <Image style={styles.itemImage} source={chooseImage(cartItem.name)} />

      <View style={{width: 160, marginLeft: 10}}>
        <Text style={styles.itemName}>{cartItem.name}</Text>
        <Text style={styles.itemDescript}>{cartItem.description}</Text>
        <Text style={styles.itemPrice}>${cartItem.price}</Text>
      </View>

      {checkout ?
        <View style={styles.checkoutItem}>
            <Text style={styles.qtyText}>{qty}</Text>
        </View>
        :
        <View style={{flexDirection: 'row', marginRight: 50}}>
          <TouchableOpacity style={styles.plusButton} onPress={() => incrementVal()}  >
              <MaterialCommunityIcons name="plus" color={Colours.DARK_GREEN} size={25} style={{marginLeft: -7}}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.minusButton} onPress={() => decrementVal()}  >
              <MaterialCommunityIcons name="minus" color={Colours.DARK_GREEN} size={25} style={{marginLeft: 7}}/>
          </TouchableOpacity>

          <View style={styles.qtyComponent}>
              <Text style={styles.qtyText}>{qty}</Text>
          </View>
        </View>
       }
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutItem: {
    width: 38,
    height: 40,
    backgroundColor: Colours.LIGHT_GREEN,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartItem: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,
    paddingBottom: 15,
    borderLeftColor: Colours.WHITE,
    borderRightColor: Colours.WHITE,
    borderTopColor: Colours.WHITE,
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
    color: Colours.DARK_GREEN,
    fontWeight: 'bold'
  },
  itemImage: {
    height: 80,
    width: 80
  },
  qtyComponent: {
    width: 37,
    height: 35,
    backgroundColor: Colours.LIGHT_GREEN,
    marginLeft: -66,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colours.WHITE
  },
  plusButton: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  minusButton: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    borderRadius: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
