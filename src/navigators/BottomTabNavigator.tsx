// modules
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// icons
// @ts-ignore
import IconLucide from 'react-native-vector-icons/Feather';
// @ts-ignore
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import IconSheet from 'react-native-vector-icons/Entypo';

// screens
import {
  Test1Screen,
  Test2Screen,
  Test3Screen,
  LocationSearchScreen,
  RouteMapScreen,
} from '../screens';

// typings
import { Test2StackParamList } from './typings';

const Tab = createBottomTabNavigator();
const Test2Stack = createNativeStackNavigator<Test2StackParamList>();

function Test2StackNavigator() {
  return (
    <Test2Stack.Navigator>
      <Test2Stack.Screen
        name="RouteInputScreen"
        component={Test2Screen}
        options={{ headerShown: false }}
      />
      <Test2Stack.Screen
        name="LocationSearchScreen"
        component={LocationSearchScreen}
        options={{ title: 'Search Location' }}
      />
      <Test2Stack.Screen
        name="RouteMapScreen"
        component={RouteMapScreen}
        options={{ title: 'Route Map' }}
      />
    </Test2Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Test 1"
        component={Test1Screen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconSheet name="spreadsheet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Test 2"
        component={Test2StackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconLucide name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Test 3"
        component={Test3Screen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconFontAwesome5 name="route" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
