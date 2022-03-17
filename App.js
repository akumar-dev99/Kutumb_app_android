import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,

} from "react-native";
import Contants from "expo-constants";
import Home from "./screen/Home";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={Home}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator> */}
      <Home />
    </View>
  );
}

// export default () => {
//   return (
//     <NavigationContainer>
//       <App />
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Contants.statusBarHeight,
  },
});
