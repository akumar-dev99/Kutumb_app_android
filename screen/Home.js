import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Card } from "react-native-paper";

const movieURL = "https://gh-trending-api.herokuapp.com/repositories";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);

  //   async function getMoviesAsync() {
  //     try {
  //       let response = await fetch(movieURL);
  //       let json = await response.json();
  //       setData(json.movies);
  //       setTitle(json.title);
  //       setDescription(json.description);
  //       setLoading(false);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }

  const fetchData = () => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        console.log("refreshed");
        setData(json);
        // setImage(json.builtBy)
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
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
              <View style={{ paddingBottom: 10 }}>
                <Card style={styles.card}>
                  <View style={styles.cardView}>
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                      source={{
                        uri: item.avatar,
                      }}
                    />

                    <View style={{ justifyContent: "space-between" }}>
                      <Text style={styles.text}>{item.username}</Text>
                      <Text style={styles.text}>{item.repositoryName}</Text>
                    </View>
                  </View>
                </Card>
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
