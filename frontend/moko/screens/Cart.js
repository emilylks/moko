import React, { useState, useEffect } from 'react';
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
  Alert,
  Modal,
  Button
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app';
import CartItem from "../components/CartItem.js";
import { URLS } from '../constants/resources';
import { Colours } from '../constants/colours';

const { height } = Dimensions.get('window');
function Cart({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartQuantities, setCartQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCart();
  }, [isFocused]);

  function getCart() {
    if (cartItems.length == 0) {
      fetch(`${URLS.serverUrl}/users/cart/${firebase.auth().currentUser.uid}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        if (!Array.isArray(responseJson)) {
          throw new Error("Could not find cart items for user");
          return;
        }
        console.log(responseJson);
        setCartItems(() => {
          let map = [];
          responseJson.forEach(item => map.push(item));
          return map;
        });
        setCartQuantities(() => {
          let map = {};
          responseJson.forEach(item => { map[item.storeItemID] = 0; });
          return map;
        });
        let sum = 0;
        responseJson.forEach(item => {
          sum += item.price * item.quantity;
        });
        setTotal(sum);
      })
      .catch(error => console.log(error))
    }
  }

  const incrementVal = (cartItem) => {
    let temp = {...cartQuantities};
    temp[cartItem.storeItemID]++;
    setCartQuantities(temp);
    setTotal(prevTotal => prevTotal + cartItem.price);
  };

  const decrementVal = (cartItem) => {
    let temp = {...cartQuantities};
    console.log("temp is");
    console.log(temp);
    console.log(cartItem.storeItemID);
    if (temp[cartItem.storeItemID] > 0) {
      console.log(temp[cartItem.storeItemID]);
      temp[cartItem.storeItemID]--;
      setTotal(prevTotal => prevTotal - cartItem.price);
    }
    setCartQuantities(temp);
  };

  function removeAllItems() {
    setCartItems([]);
    setTotal(0);
  }

  function goBackToBlankCart() {
      setModalOpen(false);
      removeAllItems();

      navigation.navigate('Cart');
  }

  if ([...cartItems].length == 0) {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.screenTitle}>Cart</Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <Image style={styles.cartEmptyImage} source={require('../images/cartEmpty.png')}/>
          <Text style={styles.text1}>Your cart is empty</Text>
          <View style={styles.descriptionTextWrapper}>
            <Text style={styles.text2}>Looks like you haven't made your choice yet...</Text>
          </View>
          <TouchableOpacity style={styles.startShoppingButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.btnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.content}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.screenTitle}>Cart</Text>
        </View>

        <View style={styles.listview}>
          <FlatList
            data={cartItems}
            extraData={cartItems}
            renderItem={({ item }) => (<CartItem cartItem={item} inc={incrementVal} dec={decrementVal} />)}
          />
          <TouchableOpacity style={{width: 400, height: 80, justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center'}} onPress={() => removeAllItems()}  >
            <Text style={{fontSize: 20, color:'#DC8433'}}>Remove All Items</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalOpen(true)}>
              <Text style={styles.btnText}>Checkout: ${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={modalOpen} animationType ='slide' >
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.title}>Checkout</Text>
              <MaterialCommunityIcons name="close-circle" color='#575757' size={30} style={styles.closeIcon}  onPress={() => setModalOpen(false)}/>
            </View>
            <Text style={styles.subheader}>Order Summary</Text>
            <View style={{height: 400}}>
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (<CartItem cartItem={item} checkout={true}/>)}
              />
            </View>
            <Text style={styles.orderText}>A text message will be sent to the vender notifying them of your order.
                Please confirm your pickup time and method of payment directly with the seller.</Text>
              <TouchableOpacity style={styles.placeOrderButton} onPress={() => goBackToBlankCart()}>
              <Text style={styles.btnText}>Place Order: ${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colours.WHITE,
    height: height
  },
  screenTitle: {
    marginTop: 20,
    marginLeft: 40,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 30,
    fontWeight: 'bold'
  },
  cartEmptyImage: {
    alignSelf: 'center',
    marginTop: 60,
    width: 250,
    height: 250
  },
  descriptionTextWrapper: {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: '10%'
  },
  text1: {
    marginTop: 40,
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
  startShoppingButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: Colours.LIGHT_GREEN,
    width: '70%',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnText: {
    height: 50,
    flex: 1,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Regular'
  },
  listview: {
    flexDirection: 'column',
    height: 0.9 * height,
    alignSelf: 'center',
    alignContent: 'center',
  },
  total: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.WHITE,
    width: '20%',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 90,
  },
  totalText: {
    height: 50,
    flex: 1,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-Regular'
  },
  checkoutButton: {
    height: 55,
    alignContent: 'center',
    backgroundColor: Colours.DARK_GREEN,
    width: '60%',
    borderRadius: 15,
    marginBottom: 90,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 30,
    alignSelf: 'center'
  },
  subheader: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
  },
  placeOrderButton: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: Colours.DARK_GREEN,
    width: "70%",
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  orderText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 20
  },
  closeIcon: {
    position: 'absolute',
    right: 30,
    marginTop: 25
  }
});

export default Cart;
