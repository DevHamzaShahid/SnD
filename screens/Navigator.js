import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopBarNavigator from './Products'
export default function Navigator() {
    return (
        <SafeAreaProvider>
            <TopBarNavigator />
        </SafeAreaProvider>

    );

}
