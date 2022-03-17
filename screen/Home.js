import { StatusBar } from "expo-status-bar";
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
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const dataURL = "https://gh-trending-api.herokuapp.com/repositories";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  const fetchData = () => {
    fetch(dataURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log("refreshed");
        console.log(json);
        setData(json);
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
                borderWidth: 1,
                borderColor: "green",
                padding: 15,
                marginLeft: 15,
                marginRight: 15,
                borderRadius: 5,
                marginTop: height * 0.15,
              }}
            >
              <Text style={{ alignSelf: "center", color: "green" }}>RETRY</Text>
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
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity>
                  <Card style={styles.card}>
                    <View style={styles.cardView}>
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 50, resizeMode: 'cover' }}
                        source={{
                          uri: item.builtBy[0].avatar,
                        }}
                      />

                      <View style={{ justifyContent: "space-between" }}>
                        <Text style={styles.text}>{item.username}</Text>
                        <Text style={styles.text}>{item.repositoryName}</Text>
                      </View>

                      <View
                        style={{
                          justifyContent: "space-evenly",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="circle" size={14} color={item.languageColor} />
                        <Text>hey</Text>
                        <AntDesign name="star" size={14} color="#FFA500" />
                        <Text>{item.totalStars}</Text>
                        <AntDesign name="fork" size={14} color="black" />
                        <Text>{item.forks}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              </View>
            )}
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

const { width, height } = Dimensions.get("window");

//   const data = [
//     { id: 1, name: "mukesh", position: "web dev" },
//     { id: 2, name: "mukesh", position: "web development" },
//     { id: 3, name: "mukesh", position: "web dev" },
//     { id: 4, name: "mukesh", position: "web dev" },
//     { id: 5, name: "mukesh", position: "web dev" },
//     { id: 6, name: "mukesh", position: "web dev" },
//     { id: 7, name: "mukesh", position: "web dev" },
//     { id: 8, name: "mukesh", position: "web dev" },
//     { id: 9, name: "mukesh", position: "web dev" },
//     { id: 10, name: "mukesh", position: "web dev" },
//   ];

//   <Card style={styles.card}>
//   <View style={styles.cardView}>
//     <Image
//       style={{ width: 60, height: 60, borderRadius: 50 }}
//       source={{
//         uri: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//       }}
//     />
//     <View style={{ justifyContent: "space-between" }}>
//       <Text style={styles.text}> Name </Text>
//       <Text style={styles.text}> Position </Text>
//     </View>
//   </View>
// </Card>
