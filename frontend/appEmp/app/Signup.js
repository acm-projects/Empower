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

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const postUserInfo = (username, pass) => {
    axios
      .post("http://localhost:3000/users/register", {
        name: username,
        password: pass,
      })
      .then(function (response) {
        // handle success
      })
      .catch(function (error) {
        // handle error
        alert(error);
      });
  };

  const handleSignup = (user, pass, passConfirmed) => {
    if (passConfirmed === pass) {
      postUserInfo(user, pass);
      navigation.navigate("Home");
    } else {
      return (
        <View>
          <Text>Password does not match</Text>
        </View>
      );
    }
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
          style={styles.gradientContainer}
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
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => handleSignup(username, password, confirmPassword)}
          >
            <Text style={styles.signupText}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already Have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signIn");
              }}
            >
              <Text style={[styles.loginText, { color: "#FFC0CB" }]}>
                Login
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
    marginTop: 10,
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
    alignItems: "center",
  },
  signupText: {
    color: "#FFFF",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
