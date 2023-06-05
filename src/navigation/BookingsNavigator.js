import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewBooking from '../features/form/NewBooking';
import ClassBookings from '../features/bookings/ClassBookings';

const Stack = createStackNavigator();

export const BookingsNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
     >
      <Stack.Screen name="NewBooking" component={NewBooking} />
      <Stack.Screen name="ClassBookings" component={ClassBookings} />
    </Stack.Navigator>
  );
};

