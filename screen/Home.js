import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";

export default function Home() {
  const data = [
    { id: 1, name: "mukesh", position: "web dev" },
    { id: 2, name: "mukesh", position: "web development" },
    { id: 3, name: "mukesh", position: "web dev" },
    { id: 4, name: "mukesh", position: "web dev" },
    { id: 5, name: "mukesh", position: "web dev" },
    { id: 6, name: "mukesh", position: "web dev" },
    { id: 7, name: "mukesh", position: "web dev" },
    { id: 8, name: "mukesh", position: "web dev" },
    { id: 9, name: "mukesh", position: "web dev" },
    { id: 10, name: "mukesh", position: "web dev" },
  ];

  const renderList = (item) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={{
              uri: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            }}
          />
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.text}> {item.name}</Text>
            <Text style={styles.text}> {item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return renderList(item);
      }}
      keyExtractor={(item) => `${item.id}`}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },

  text: {
    fontSize: 16,
    marginLeft: 10,
  },
});
