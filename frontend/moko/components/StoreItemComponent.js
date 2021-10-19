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
import Feather from 'react-native-vector-icons/Feather';

function StoreItemComponent(props) {
  let navigation = props.navigation;
  let storeItem = props.storeItem;
  let storeItemName = props.storeItemName;
  let storeItemImage = props.itemImage;
  let edit = props.edit;
  let location = props.location;
  const [quantity, setQuantity] = useState(0);


  function incrementVal() {
    props.inc(storeItem);
    setQuantity(prevQty => prevQty + 1);
  }

  function decrementVal() {
    props.dec(storeItem);
    if (quantity > 0) {
      setQuantity(prevQty => prevQty - 1);
    }
  }

  return(
    <View style={styles.component}>
       <View style={styles.mainContentBox}>
        <Image style={styles.itemImage} source={storeItemImage} />

      </View>

      {edit ?
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate(location, { storeItemName, storeItemImage })}>
            <Feather name="edit-2" color={'#FFFFFF'} size={25} />
          </TouchableOpacity>
          :
          <View style={styles.quantityBox}>
            <TouchableOpacity style={styles.button1} onPress={() => incrementVal()}  >
                <MaterialCommunityIcons name="plus" color={'#4C6D41'} size={25} style={{marginLeft: -7}}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => decrementVal()}  >
                <MaterialCommunityIcons name="minus" color={'#4C6D41'} size={25} style={{marginLeft: 7}}/>
            </TouchableOpacity>

            <View style = {{width: 37, height: 35, backgroundColor: '#87B676', marginLeft: -66, alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{quantity}</Text>

            </View>
          </View>
      }

      <View style={styles.textInfo}>
        <Text style={styles.priceInfo}>{storeItem.price}</Text>
        <Text style={styles.nameInfo}>{storeItem.name}</Text>
        <Text style={styles.description}>{storeItem.description}</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  component: {
    width: 130,
    height: 215,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  mainContentBox: {
    width: 110,
    height: 110,
    borderWidth: 0.75,
    borderRadius: 10,
    borderColor: '#87B676',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityBox: {
    position: 'relative',
    flexDirection: 'row',
    marginLeft: 45,
    marginTop: -125
  },
  editBox: {
    position: 'relative',
    flexDirection: 'row',
  },
  button1: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: '#87B676',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  button2: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: '#87B676',
    borderRadius: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  editButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: '#87B676',
    borderRadius: 10,
    backgroundColor: '#87B676',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 85,
    marginTop: -120
  },
  editText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  itemImage: {
    height: 75,
    width: 75
  },
  textInfo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 90
  },
  priceInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#87B676'
  },
  nameInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default StoreItemComponent;
