import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Contants from "expo-constants";
import Home from "./screen/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Trending"
          component={Home}
          options={{
            headerShown: true,
            title: "Trending",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Contants.statusBarHeight,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});
