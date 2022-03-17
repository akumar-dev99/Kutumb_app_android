import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

const dataURL = "https://gh-trending-api.herokuapp.com/repositories";

export default function Home(navigation) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const fetchData = () => {
    fetch(dataURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log("refreshed");
        setData(json.sdad.ss);
        // setImage(json.builtBy)
      })
      .catch((error) => {
        console.log("list error", error);
        setNetworkError(error);
      }) // display errors
      .finally(() => setLoading(false)); // change loading state
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card style={styles.card}>
        <TouchableOpacity style={styles.wrap} onPress={onItemPress}>
          <View style={styles.cardView}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                resizeMode: "cover",
                alignSelf: "center",
              }}
              source={{
                uri: item.builtBy[0].avatar,
              }}
            />

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 20,
                  paddingBottom: 10,
                  color: "#404040",
                }}
              >
                {item.username}
              </Text>
              <Text style={styles.text}>{item.repositoryName}</Text>
            </View>
          </View>
          {expanded && (
            <View
              style={{
                marginLeft: 80,
              }}
            >
              <Text style={{ fontSize: 14, color: "#404040" }}>
                {item.description} ({item.url})
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <FontAwesome
                  name="circle"
                  size={14}
                  color={item.languageColor}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ marginRight: 5, color: "#404040" }}>
                  {item.language}
                </Text>
                <AntDesign
                  style={{ marginRight: 5 }}
                  name="star"
                  size={14}
                  color="#FFA500"
                />
                <Text style={{ marginRight: 5, color: "#404040" }}>
                  {item.totalStars}
                </Text>
                <AntDesign
                  style={{ marginRight: 5 }}
                  name="fork"
                  size={14}
                  color="black"
                />
                <Text style={{ marginRight: 5, color: "#404040" }}>
                  {item.forks}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      {networkError ? (
        <View>
          <View
            style={{
              paddingHorizontal: 10,
              alignSelf: "center",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              style={{
                width: width * 0.8,
                height: height * 0.6,
                resizeMode: "contain",
              }}
              source={require("../assets/networkerror.jpg")}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#383838",
              }}
            >
              Something went wrong..
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 18, color: "#989898" }}
            >
              An alien is probably blocking your signal.
            </Text>
          </View>
          <TouchableOpacity onPress={() => fetchData()}>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                borderWidth: 1.2,
                borderColor: "#008000",
                padding: 15,
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 5,
                marginTop: height * 0.15,
              }}
            >
              <Text style={{ alignSelf: "center", color: "#008000" }}>RETRY</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color="#ff9900" />
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.rank}`}
            renderItem={({ item }) => {
              return renderList(item);
            }}
            onRefresh={() => fetchData()}
            refreshing={isLoading}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 2,
    padding: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },

  text: {
    fontSize: 16,
    marginLeft: 20,
    color: "#404040",
    fontWeight: "bold",
  },

  wrap: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
  },

  details: { margin: 10 },
});

const { width, height } = Dimensions.get("window");
