import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Title(props) {
    console.log('props ', props);
    return (
        <View style={{ backgroundColor: '#84c708', width: '100%', height: 70 }}>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 20, justifyContent: 'flex-start' }}>

                    <Icon name={props.drawer ? 'menu' : 'keyboard-backspace'} size={28} color='#fff' onPress={() => props.onPress ? props.onPress() : null} />
                </View>
                <Text style={{ color: '#fff', fontSize: 20 }}>{props.title}</Text>
                <TouchableOpacity onPress={() => { props.navigation ? props.navigation.navigate('Cart') : null }}
                    style={{ padding: 20, justifyContent: 'flex-end' }}>
                    <View style={styles.tabContainer}>
                        {(props.badge && props.badge > 0) &&
                            <View style={styles.tabBadge}>
                                <Text style={styles.tabBadgeText}>
                                    {props.badge}
                                </Text>
                            </View>
                        }
                        <Icon name="cart" size={28} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        width: 30,
        height: 24,
        position: 'relative',
    },
    tabBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 16,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
    },
    tabBadgeText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
    },
});