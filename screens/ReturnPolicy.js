import React, { Component } from 'react';
import {View,Text} from 'react-native';
import Title from '../components/Title';
import { WebView } from 'react-native-webview';

class ReturnPolicy extends Component {
    render() {
        return (
            <View style={{flex:1}}>
            <Title
                    title={'Return Policy'}
                    // navigation={this.props.navigation}
                    // badge={this.props.totalItems + ''}
                    onPress={() => this.props.navigation.goBack()}
                />
            <WebView
              source={{
                uri: 'https://github.com/facebook/react-native'
              }}
              style={{ marginTop: 12 }}
            />
            </View>
        );
    }
}
export default ReturnPolicy;