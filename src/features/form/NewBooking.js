import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { firebase } from "../../../config";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { Ionicons } from "@expo/vector-icons";

const NewBooking = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const userId = user.uid;
  const [classs, setClasss] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [fee, setFee] = useState("");
  const [contact, setContact] = useState("");
  const [addresses, setAdresses] = useState([]);
  const [pin, setPin] = useState("");

  const todoRef = firebase.firestore().collection("todos");

  const handleAddressChange = (index, text) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = text;
    setAdresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    const updatedAddresses = [...addresses, ""];
    setAdresses(updatedAddresses);
  };

  // add a todo
  const addTodo = () => {
    // check if we have a name.
    if (classs && classs.length > 0) {
      // get the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        classs: classs,
        time: time,
        fee: fee,
        subject: subject,
        contact: contact,
        addresses: addresses,
        pin: pin,
        createdAt: timestamp,
        userId: userId,
      };
      alert("suceess");
      todoRef.add(data).then(() => {
        // release todo state
        setClasss("");
        setTime("");
        setFee("");
        setSubject("");
        setContact("");
        setPin("");
        setAdresses([]);

        // release keyboard
        Keyboard.dismiss();
      });
      navigation.navigate("Bookings").catch((error) => {
        // show an alert in case of error
        alert(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Class"
        value={classs}
        onChangeText={(classs) => setClasss(classs)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={(time) => setTime(time)}
      />
      <TextInput
        style={styles.input}
        placeholder="fee"
        value={fee}
        onChangeText={setFee}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="contact"
        value={contact}
        onChangeText={setContact}
      />
      {addresses.map((qualification, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Address Line ${index + 1}`}
          value={qualification}
          onChangeText={(text) => handleAddressChange(index, text)}
        />
      ))}
      <TextInput
        style={styles.input}
        placeholder="pincode"
        value={pin}
        onChangeText={setPin}
      />
      <Button title="Add address" onPress={handleAddAddress} />
      <Button title="Submit" onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default NewBooking;
