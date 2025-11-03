import React from 'react'
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
export default function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Login" component={Home} options={{ tabBarIcon: () => <Entypo name="login" size={24} color="black" /> }} />
            <Tab.Screen name="Register" component={Profile} options={{ tabBarIcon: () => <AntDesign name="register" size={24} color="black" /> }} />
        </Tab.Navigator>
    )
}