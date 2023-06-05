import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import {firebase} from '../../config'

const CreateProfile = () => {
    const {user} = useContext(AuthenticationContext)
    const userId = user?.uid;
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [rate, setRate] = useState('');
  const [availability, setAvailability] = useState('');
  const [pincode, setPincode] = useState('');
  const [qualifications, setQualifications] = useState([]);


  const todoRef = firebase.firestore().collection("tutorProfiles");



  const handleQualificationChange = (index, text) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = text;
    setQualifications(updatedQualifications);
  };

  const handleAddQualification = () => {
    const updatedQualifications = [...qualifications, ''];
    setQualifications(updatedQualifications);
  };


   // add a todo
   const addTodo = () => {
    // check if we have a name.
    if (name && name.length > 0) {
      // get the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        name: name,
        subject: subject,
        experience: experience,
        contact: contact,
        rate: rate, 
        availability: availability,
        pincode: pincode,
        qualifications: qualifications,
        createdAt: timestamp,
        userId: userId
      };
      todoRef
        .add(data)
        .then(() => {
          // release todo state
          setName("");
          setSubject("");
          setExperience('');
          setContact('');
          setRate('');
          setAvailability('');
          setPincode('')
          setQualifications([]);
      
          // release keyboard
          Keyboard.dismiss();
        })
        .catch((error) => {
          // show an alert in case of error
          alert(error);
        });
    }
  };


  const handleSubmit = () => {
    // Handle form submission here, e.g., send data to backend or perform validation
    console.log('Submitted:', {
      name,
      subject,
      experience,
      contact,
      rate,
      availability,
    });

    // Reset form fields after submission
    setName('');
    setSubject('');
    setExperience('');
    setContact('');
    setRate('');
    setAvailability('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={(subject) => setSubject(subject)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={experience}
        onChangeText={(experience) => setExperience(experience)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate per hour"
        value={rate}
        onChangeText={setRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Availability"
        value={availability}
        onChangeText={setAvailability}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
      />
      {qualifications.map((qualification, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Qualification ${index + 1}`}
          value={qualification}
          onChangeText={(text) => handleQualificationChange(index, text)}
        />
      ))}
      <Button title="Add Qualification" onPress={handleAddQualification} />
      <Button title="Submit" onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default CreateProfile;
