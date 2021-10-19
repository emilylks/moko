import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colours } from '../constants/colours';

const height = Dimensions.get('window').height;

function SignUpScreen({ navigation }) {
  const [postal, setPostal] = useState('');
  const [province, setProvince] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setSeller] = useState(false);
  const { register } = useContext(AuthContext);

  function registerUser() {
    let address = {
      street: street,
      city: city,
      province: province,
      postal: postal,
    }

    if (!validateUser(address)) {
      return;
    }

    let addressString = `${street}, ${city}, ${province} ${postal}`;
    register(email, password, addressString, phone, isSeller);
  }

  function validateUser(address) {
    if (Object.values(address).indexOf('') > -1) {
      Alert.alert("Please complete your address before proceeding.");
      return false;
    } else if (!validateEmail(email)) {
      Alert.alert("Please enter a valid email address.");
      return false;
    } else if (password.length < 6) {
      Alert.alert("Please enter a stronger password.");
      return false;
    } else if (phone.length < 10) {
      Alert.alert("Please enter a valid phone number.");
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={ false }>
      <View style={styles.content}>
        <View>
          <Image source={require('../images/Logo_Final.png')} style={styles.logo} />
        </View>
        <Text style={styles.labelText}>Sign up:</Text>

        <ScrollView style={styles.scrollContent}>
          <View style={styles.inputView}>
            <Ionicons name="person-outline" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="lock-closed-outline" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={Colours.BLACK}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="pin" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Street Address"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(street) => setStreet(street)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="pin" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="City"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(city) => setCity(city)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="pin" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Province/State"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(province) => setProvince(province)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="md-pin" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Postal/Zip Code"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(postal) => setPostal(postal)}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons name="call" color={Colours.BLACK} size={25} />
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              maxLength={10}
              placeholder="Phone Number"
              placeholderTextColor={Colours.BLACK}
              onChangeText={(phone) => setPhone(phone)}
            />
          </View>

          <Text style={styles.sellerPromptText}>Are you a seller?</Text>
          <View style={styles.buttonRow}>
            <Text style={styles.radioButtonText}>Yes</Text>
            <TouchableOpacity style={isSeller ? styles.radioButtonFilled : styles.radioButtonEmpty}
                  onPress={() => setSeller(!isSeller)} />

                <Text style={styles.radioButtonText}>No</Text>
            <TouchableOpacity style={!isSeller ? styles.radioButtonFilled : styles.radioButtonEmpty}
                  onPress={() => setSeller(!isSeller)} />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.signinBtn} onPress={() => registerUser()}>
          <Text style={styles.signinText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colours.WHITE,
    height: height,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logo: {
    height: 50,
    width: 150,
    marginTop: 30
  },
  scrollContent: {
    width: "100%",
  },
  icons: {
    marginTop: 100,
    marginHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  name: {
    marginTop: 40,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    fontSize: 40,
    marginBottom: 40,
  },
  labelText: {
    marginTop: 10,
    fontSize: 25,
    color: Colours.DARK_GREEN,
    fontFamily: 'Inter-Light',
    fontWeight: 'bold',
    marginBottom: 15
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: Colours.WHITE,
    borderColor: Colours.BLACK,
    borderWidth: 0.5,
    borderRadius: 12,
    width: "80%",
    height: 45,
    marginBottom: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Inter-Light",
    marginLeft: 10,
  },
  sellerPromptText: {
    fontSize: 20,
    color: Colours.BLACK,
    fontFamily: 'Inter-Light',
    fontWeight: 'bold',
    marginLeft: "10%",
    marginBottom: 10,
  },
  buttonRow: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: "10%"
  },
  radioButtonText: {
    fontSize: 18,
    fontFamily: "Inter-Light",
  },
  radioButtonEmpty: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    marginLeft: 10,
    marginRight: 30,
  },
  radioButtonFilled: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colours.LIGHT_GREEN,
    backgroundColor: Colours.LIGHT_GREEN,
    marginLeft: 10,
    marginRight: 30,
  },
  signinBtn:{
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: Colours.LIGHT_GREEN,
    width: "70%",
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 60,
  },
  signinText: {
    padding: 5,
    alignSelf: 'center',
    color: Colours.WHITE,
    fontSize: 20,
    fontFamily: 'Inter-Light',
  },
});

export default SignUpScreen;
