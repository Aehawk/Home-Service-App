import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';

const Stack = createStackNavigator();
export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home-screen' component={HomeScreen} />
            <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} />
            <Stack.Screen name='business-details' component={BusinessDetailsScreen} />
        </Stack.Navigator>
    )
}