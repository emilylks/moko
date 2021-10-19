import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colours } from '../constants/colours';

const height = Dimensions.get('window').height;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  function loginUser() {
    if (email == "") {
      Alert.alert("Please enter a valid email");
      return;
    } else if (password == "") {
      Alert.alert("Please enter a password");
      return;
    }

    login(email, password);
  }

  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={ false }>
      <View style={styles.content}>
        <View>
          <Image source={require('../images/Logo_Final.png')} style={styles.icons} />
        </View>

        <Text style={styles.name}>a sustainable and delicious option</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" color='#000' size={20}/>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" color='#000' size={20}/>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={() => loginUser()}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.loginText}>SIGN UP</Text>
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
  icons: {
    marginHorizontal: 10,
    height: 100,
    width: 330,
    marginTop: 100
  },
  name: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontFamily: 'Inter-Light',
    fontSize: 20,
    marginBottom: 70,
    fontWeight: 'bold'
  },
  inputContainer: {
    marginBottom: 30,
    width: "100%",
    alignItems: 'center'
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: Colours.WHITE,
    borderColor: Colours.BLACK,
    borderWidth: 0.5,
    borderRadius: 12,
    width: "80%",
    height: 45,
    marginBottom: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    height: 48,
    fontSize: 18,
    fontFamily: "Inter-Light",
    marginLeft: 10,
  },
  submitBtn:{
    height: 45,
    width: "70%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.LIGHT_GREEN,
    borderRadius:15,
    marginBottom: 10
  },
  loginText: {
    textAlign: 'center',
    color: Colours.WHITE,
    fontSize: 20,
    fontFamily: 'Inter-Light',
  }
});

export default LoginScreen;
