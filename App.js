// In App.js in a new project

import React, {useContext} from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import LoginScreen from "./src/features/account/Login";
import { AuthenticationContext } from "./src/services/authentication/authentication.context";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Home from "./src/features/home/Home";
import ClassBookings from "./src/features/bookings/ClassBookings";
import CreateProfile from "./src/tutor/CreateProfile";


const firebaseConfig = {
  apiKey: "AIzaSyCnQJhNzPILgrPrmDDgRywM-6unRp6gz1s",
  authDomain: "fir-learning-29cf4.firebaseapp.com",
  databaseURL: "https://fir-learning-29cf4-default-rtdb.firebaseio.com",
  projectId: "fir-learning-29cf4",
  storageBucket: "fir-learning-29cf4.appspot.com",
  messagingSenderId: "711378401773",
  appId: "1:711378401773:web:c6a2f7fb0eb612c42f4fe4",
  measurementId: "G-SY8QEWCC1R",
};


  firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

function Account() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthStack({navigation}) {
  const { user, onLogout } = useContext(AuthenticationContext);
  const handleLogOut = () => {
    onLogout();
    navigation.replace('Login');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}  options={{
        headerRight: ({ tintColor }) => (
          <Button title="logout" onPress={handleLogOut} />
        ),
      }} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Bookings" component={ClassBookings} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthStack /> : <Account />}
    </NavigationContainer>
  );
};

function App() {
  return (
    <AuthenticationContextProvider>
      <Navigation />
    </AuthenticationContextProvider>
  );
}
export default App;
