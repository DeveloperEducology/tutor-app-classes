import { ScrollView, View, Text, Button } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import {firebase} from '../../../config'
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Home = ({ navigation }) => {
  const { user, onLogout } = useContext(AuthenticationContext);
  const userId = user?.uid
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchCollectionData();
  }, []);

  const fetchCollectionData = async () => {
    try {
      const collectionRef = firebase.firestore().collection("tutorProfiles");

      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProfiles(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const FilterData = profiles.filter((item) => {
    return item?.userId === userId;
  });

  console.log(FilterData);

  const handleLogOut = () => {
    onLogout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.paragraph}>{user?.email}</Text>
      </View>
      <View>
      {FilterData.length > 0 ? (FilterData.map((book) => (
        <View>
        <Text>{book?.name}</Text>
        </View>
      ))): <View><Text>No bookings yet</Text></View>}
      </View>
      <View style={styles.Button}>
        <Button
          title="Create Profile"
          onPress={() => {
            navigation.navigate("CreateProfile");
          }}
        />
        <Button
          title="Bookings"
          onPress={() => {
            navigation.navigate("Bookings");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  Button: {
    flex: 1,
    marginTop: 5,
    padding: 7,
  },
});

export default Home;
