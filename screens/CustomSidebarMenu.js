import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Alert,
  BackHandler
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { logout } from '../container/actions/login'
import Icon from 'react-native-vector-icons/Ionicons'
import Logout from './Logout';

const CustomSidebarMenu = (props) => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [user, setUser] = useState('');
  // const logout = () => {
  //   // setLogoutDialog(!logoutDialog);
  //   // props.navigation.goBack();
  //   props.navigation.navigate('Login')

  // }
  const Logout = async () =>{
    await AsyncStorage.removeItem('Phone')
    BackHandler.exitApp()
  } 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../assets/drawer_header.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={() => <Icon name='log-out' size={26} color='#84c708' />}
          onPress={() => {
            // console.log(props.auth.user.id)
            Alert.alert(
              "LogOut",
              "App will be Closed!",
              [

                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK", onPress: () => 
                   
                    {
                    Logout()
                    
                  }
                }

              ]
            );
            // props.logout(props.auth.user.id)
          }

          }
        />
        {/* {props.loginSuccess ?
          <DrawerItem
            label="Logout"
            icon={() => <Icon name='log-out' size={26} color='#84c708' />}
            onPress={() => {
              console.log(props.auth.user.id)
              Alert.alert(
                "LogOut",
                "Do you want to LogOut?",
                [

                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => { props.logout(props.auth.user.id), props.navigation.goBack() } }
                ]
              );
              // props.logout(props.auth.user.id)
            }

            }
          />
          :
          <DrawerItem
            label="Login"
            icon={() => <Icon name='log-in' size={26} color='#84c708' />}
            onPress={() => {
              console.log('click');
              props.navigation.navigate('Login')
            }
            }
          />
        } */}
      </DrawerContentScrollView>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'cover',
    width: '100%',
    height: 130,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


const mapStateToProps = state => {
  const { loginSuccess, auth, loading } = state.login;
  return { loginSuccess, loading, auth };
};
const mapDispatchToProps = {
  logout,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSidebarMenu);
