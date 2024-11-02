import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
 
} from "react-native";
import React, { useState,useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
// import Splash from "./Splash";
import { jwtDecode } from "jwt-decode";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  
  useEffect(() => {
    const ConfirmLogIn = async () =>{
        try{
          const token = await AsyncStorage.getItem("authToken");
          if(token){
            navigation.replace("Main")
          }
        }catch(error){
            console.log("error message")
        }
    }
    ConfirmLogIn();
  
  },[]); 


  const handleLogIn = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "invalid Email");
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.LogIn}>
      <View style={styles.logo}>
        {/* <Image
          source={require("../assets/logo4.png")}
          style={{ width: 250, height: 60, borderRadius: 10 }}
        /> */}
        {/* <Text style={{
            fontSize:20,
            fontWeight:'normal',
          
          }}> DaFemme</Text> */}
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 60,
              color: "black",
              width: 200,
              // backgroundColor:'red'
            }}
          >
            Log into your account
          </Text>
        </View>

        <View style={{ marginTop: 60 }}>
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
            onPress={handleLogIn}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              // borderWidth:6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 10,
              marginTop: 50,
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
              Log In
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 20, alignSelf: "center" }}
          >
            <Text>Dont have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  LogIn: {
    alignItems: "center",
    flex: 1,
    // width:200,
    // alignItems:'center'
    alignContent: "center",
    marginTop:50
  },
  logo: {
    marginTop: 50,
    alignSelf: "center",
  },
});
