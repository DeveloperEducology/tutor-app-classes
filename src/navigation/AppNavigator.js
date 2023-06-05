import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import BookingsNavigator from './BookingsNavigator';
import HomeNavigator from './HomeNavigator'
import Home from '../features/home/Home';
import ClassBookings from '../features/bookings/ClassBookings'
import NewBooking from '../features/form/NewBooking'

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: 'md-home',
  Bookings: 'md-pencil',
  Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Bookings" component={ClassBookings} />
  </Tab.Navigator>
);
