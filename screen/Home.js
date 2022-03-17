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
  const [networkError, setNetworkError] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 50,
                          resizeMode: "cover",
                        }}
                        source={{
                          uri: item.builtBy[0].avatar,
                        }}
                      />

                      <View style={{ justifyContent: "space-between" }}>
                        <Text style={styles.text}>{item.username}</Text>
                        <Text style={styles.text}>{item.repositoryName}</Text>
                      </View>

                      {/* <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>{item.url}</Text>
                        <FontAwesome
                          name="circle"
                          size={14}
                          color={item.languageColor}
                        />
                        <Text>hey</Text>
                        <AntDesign name="star" size={14} color="#FFA500" />
                        <Text>{item.totalStars}</Text>
                        <AntDesign name="fork" size={14} color="black" />
                        <Text>{item.forks}</Text>
                      </View> */}
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
