import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommentsNavigation from './CommentsNavigation';
import Profile from '../screens/Profile';
import CrearPost from '../screens/CrearPost';

const Tab = createBottomTabNavigator(); 
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={ { tabBarShowLabel: false }}>
        <Tab.Screen name="CommentsNavigation" component={CommentsNavigation}/> //navegacion anidada como una screen
        <Tab.Screen name="CrearPost" component={CrearPost}/>
        <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  )
}