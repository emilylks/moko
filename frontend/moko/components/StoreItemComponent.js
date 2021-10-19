import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colours } from '../constants/colours';

function StoreItemComponent(props) {
  let navigation = props.navigation;
  let storeItem = props.storeItem;
  let storeItemName = props.storeItemName;
  let storeItemImage = props.itemImage;
  let edit = props.edit;
  let location = props.location;
  const { cart, setCart } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(() => {
    if (cart.indexOf(storeItem) != -1) {
      return storeItem.quantity;
    } else {
      return 0;
    }
  });

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
            <Feather name="edit-2" color={Colours.WHITE} size={25} />
          </TouchableOpacity>
          :
          <View style={styles.quantityBox}>
            <TouchableOpacity style={styles.plusButton} onPress={() => incrementVal()}  >
                <MaterialCommunityIcons name="plus" color={Colours.DARK_GREEN} size={25} style={{marginLeft: -7}}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.minusButton} onPress={() => decrementVal()}  >
                <MaterialCommunityIcons name="minus" color={Colours.DARK_GREEN} size={25} style={{marginLeft: 7}}/>
            </TouchableOpacity>

            <View style={styles.qtyComponent}>
                <Text style={styles.qtyText}>{quantity}</Text>

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
    borderColor: Colours.LIGHT_GREEN,
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
  plusButton: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.WHITE
  },
  minusButton: {
    height: 35,
    width: 38,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    borderRadius: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.WHITE
  },
  editButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    borderRadius: 10,
    backgroundColor: Colours.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 85,
    marginTop: -120
  },
  editText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colours.WHITE
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
    color: Colours.LIGHT_GREEN
  },
  nameInfo: {
    fontSize: 18,
    fontWeight: 'bold',
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
  }
});

export default StoreItemComponent;
