import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <View><Text>home</Text></View>
    )
}
function Setting() {
    return (
        <View><Text>Setting</Text></View>
    )
}
function Products() {
    return (
        <View><Text>Products</Text></View>
    )
}
function Cart() {
    return (
        <View><Text>Cart</Text></View>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: 'red'
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={Setting} />
            <Tab.Screen name="Products" component={Products} />
            <Tab.Screen name="Cart" component={Cart} />
        </Tab.Navigator>
    )
}

export default function Bottomtabnavigator()
{
return(
    
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
)

}