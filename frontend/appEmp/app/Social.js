import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, ScrollView, Text, Button } from "react-native";
import { globalElements } from "../ui/globalUI.js";

const Social = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 32.9857,
          longitude: -96.7502,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <ScrollView style={styles.details} horizontal>
        <View style={styles.events}>
          <Text> This is something that will be shown </Text>
        </View>
      </ScrollView>
      <Button
        title="Back"
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "left", zIndex: 1, marginTop: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "50%",
    justifyContent: "flex-end",
  },
  boldText: {
    fontSize: 25,
    color: "red",
    marginVertical: 16,
    textAlign: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  details: {
    height: "50%",
    paddingTop: 400,
  },
  events: {
    heigth: "50%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});

export default Social;
