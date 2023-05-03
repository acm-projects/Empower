import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

import { LinearGradient } from "expo-linear-gradient";

import nightSky from "../assets/nightSky.jpeg";
import logo from "../assets/image.png";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // handle login logic here
    navigation.navigate("Home");
  };

  const getStuff = () => {
    axios
      .get("http://localhost:3000/users/")
      .then(function (response) {
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={nightSky}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay} />
        <Image source={logo} style={styles.logo} />
      </ImageBackground>
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={["#FFC0CB", "#4c00b0"]}
          style={styles.bottomContainer}
        >
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              let userExist = false,
                passwordValid = false;

              navigation.navigate("Home");
            }}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={[styles.signupText, { color: "#FFC0CB" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000424",
    borderWidth: 0,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: -40,
    borderBottomRightRadius: -40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  logo: {
    width: 270,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#4c00b0",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 0,
    borderWidth: 0,
    overflow: "hidden",
  },
  inputView: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    marginTop: 30,
    marginLeft: 60,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#4c00b0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 60,
  },
  loginText: {
    color: "white",
  },
  gradientContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#FFFF",
  },
  signupBtn: {
    width: "70%",
    backgroundColor: "#FFC0CB",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 60,
    elevation: 8,
    shadowColor: "#000",
  },
});

export default LoginScreen;
