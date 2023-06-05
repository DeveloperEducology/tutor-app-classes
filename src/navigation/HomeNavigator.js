import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import NewBooking from '../features/form/NewBooking';
import Home from '../features/home/Home';

const SettingsStack = createStackNavigator();

export const HomeNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SettingsStack.Screen name="Home" component={Home} />
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="NewBooking"
        component={NewBooking}
      />
    </SettingsStack.Navigator>
  );
};
