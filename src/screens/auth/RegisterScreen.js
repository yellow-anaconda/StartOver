import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Axios   from "axios";
import  {Alert}  from "react-native";
import LoginSCreen from "../auth/LoginScreen"

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    
    // send a post request to the backend
    Axios.post("http://localhost:8000/register", user).then((response) => {
        console.log(response.data);
        Alert.alert(
          "regsitration successful",
          "you have registered successfully"
        );

        setName("");
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration error",
          "an error occured during registration"
        );
        console.log(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.LogIn}>
      <View style={styles.logo}>
        {/* <Image
          source={require("../assets/logo4.png")}
          style={{ width: 250, height: 80, borderRadius: 10 }}
        /> */}
        {/* <Text style={{
            fontSize:20,
            fontWeight:'normal',
          
          }}> LaFemme</Text> */}
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 50,
              color: "black",
              width: 200,
              // backgroundColor:'red'
            }}
          >
            Create your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D3D3D3",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color="black"
              style={{ marginLeft: 5 }}
            />
            <TextInput
             value={name}
              onChangeText={(text) => setName(text)}

              style={{
                width: 300,
                marginVertical: 10,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your Name"
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D3D3D3",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="black"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                width: 300,
                marginVertical: 10,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D3D3D3",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 15,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="black"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: 300,
                marginVertical: 10,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-around",
          }}
        >
          <Text>keep me logged in</Text>
          <Text style={{ color: "blue" }}>forgot password</Text>
        </View>

        <View>
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              // borderWidth:6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 10,
              marginTop: 70,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20, alignSelf: "center" }}
          >
            <Text>Already have an account? Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  LogIn: {
    alignItems: "center",
    flex: 1,
    // width:200,
    // alignItems:'center'
    alignContent: "center",
  },
  logo: {
    marginTop: 30,
    alignSelf: "center",
  },
});
