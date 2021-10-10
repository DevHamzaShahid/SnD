import React from 'react';
import {View} from 'react-native';
import Shimmer from 'react-native-shimmer';

export default function Loading(){
    return(
        <Shimmer opacity={0.5}>
            <View style={{height:'100%', backgroundColor:'#d9ffe3'}}>
            </View>
        </Shimmer>
        );
}
