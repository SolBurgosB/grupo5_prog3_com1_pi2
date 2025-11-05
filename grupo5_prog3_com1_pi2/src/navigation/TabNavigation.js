import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommentsNavigation from './CommentsNavigation';
import Profile from '../screens/Profile';
import CrearPost from '../screens/CrearPost';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator(); 
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false}}>
        <Tab.Screen name="CommentsNavigation" component={CommentsNavigation} screenOptions={{tabBarShowLabel:false}} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown: false }}  /> 
        <Tab.Screen name="CrearPost" component={CrearPost} screenOptions={{tabBarShowLabel:false}} options={{tabBarIcon: () => <FontAwesome6 name="add" size={24} color="black" />, headerShown: false}}/>
        <Tab.Screen name="Profile" component={Profile} screenOptions={{tabBarShowLabel:false}} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />, headerShown: false}}/>
    </Tab.Navigator>
  )
}