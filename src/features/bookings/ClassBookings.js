import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import NewBookComponent from "./NewBookings";
import { firebase } from "../../../config";

const ClassBookings = () => {
  const { user } = useContext(AuthenticationContext);
  const userId = user?.uid;
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();

  // fetch or read the data from firestore
  useEffect(() => {
    fetchCollectionData();
  }, []);

  const fetchCollectionData = async () => {
    try {
      const collectionRef = firebase.firestore().collection("todos");

      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const FilterData = todos.filter((item) => {
    return item?.userId === userId;
  });

  console.log(FilterData);

  // delete a todo from firestore db
  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        // show a successful alert
        alert("Deleted successfully");
      })
      .catch((error) => {
        // show an error alert
        alert(error);
      });
  };

  const newBookData = [
    {
      id: 1,
      class: "Class 6",
      subject: "Maths",
      time: "6pm",
      fee: "15000",
      contact: "222222222",
      address: ["H no 1-2", "NN colony", "road no 3"],
    },
  ];

  const classData = [
    {
      id: 1,
      class: "Class 6",
      subject: "Maths",
      time: "6pm",
      fee: "15000",
      contact: "222222222",
    },
    {
      id: 2,
      class: "Class 8",
      subject: "English",
      time: "4pm",
      fee: "12000",
      contact: "333333333",
    },
    // Add more class objects here if needed
  ];

  return (
    <View style={styles.contain}>
      <SafeAreaView>
        <ScrollView>
          {FilterData.length > 0 ? (FilterData.map((book) => (
            <NewBookComponent key={book.id} book={book} />
          ))): <View><Text>No bookings yet</Text></View>}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassBookings;
