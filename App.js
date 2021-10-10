/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from './screens/Home'
import { navigationRef, isReadyRef } from './RootNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomSidebarMenu from './screens/CustomSidebarMenu';
import MyAccount from './screens/MyAccount';
import Products from './screens/Products';
import AddCart from './screens/AddCart';
import Login from './screens/Login';
import Bottomtabnavigator from './Navigators/Bottomtabnavigator';
import SignUp from './screens/SignUp';
import HowToOrder from './screens/HowToOrder';
import ReturnPolicy from './screens/ReturnPolicy';
import ContactUs from './screens/ContactUs';
// import HomeCon from './screens/HomeCon';
import FAQs from './screens/FAQs';
import AddressInformation from './screens/AddressInformation';
//import Salad from './screens/Salad';
import Fruits from './screens/Fruits';
// import SplashScreen from 'react-native-splash-screen';
import Cart from './screens/Cart';
import { Provider } from 'react-redux';
import { store } from './container/stores/Store';
import Test from './screens/test';
import MyOrder from './screens/MyOrder';
import ForgetPassword from './screens/ForgetPassword';
import AsyncStorage from '@react-native-community/async-storage';
import OrderSummary from './screens/OrderSummary';
import OrderDetails from './screens/OrderDetails';
import Offers from './screens/Offers';
import Bundles from './screens/Bundles';
import Logout from './screens/Logout';
import AllProducts from './screens/AllProducts';
import GetReview from './screens/getReview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      Phone_Number: '',
      load: false

    }
  }
  checkUser = async () => {
    // var user = await AsyncStorage.getItem('userData');
    // this.setState({ data: user })
    // console.log(user)
    var Phone_num = await AsyncStorage.getItem('Phone');
    this.setState({ Phone_Number: Phone_num })
    // await AsyncStorage.removeItem('Phone')
    console.log(Phone_num);
    if (Phone_num != null) {
      this.setState({ load: true })
    }
    else {
      this.setState({ load: false })
    }
  }
  componentDidMount() {
    // SplashScreen.hide();
    
    this.checkUser();
  }
  myDrawer = () => {
    return (
      <Drawer.Navigator initialRouteName='Home'
        drawerContentOptions={{
          activeTintColor: '#000',
          activeBackgroundColor: '#deffb8',
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props}
        />
        }
      >
        <Drawer.Screen name="Home" component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name='home' size={26} color='#84c708' />
            )
          }}
        />

        <Drawer.Screen name="My Orders" component={MyOrder}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name='list-circle' size={26} color='#84c708' />
            )
          }}
        />

        <Drawer.Screen name="Contact Us" component={ContactUs}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name='logo-whatsapp' size={26} color='#84c708' />
            )
          }}
        />

        {/* <Drawer.Screen name="Logout" component={()=>{ Alert.alert(
                "Logout",
                "App will close",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => BackHandler.exitApp() }
                ]
              )}}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name='log-out' size={26} color='#84c708' />
            )
          }}
        /> */}

      </Drawer.Navigator>
    );
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }} >
            {/* {this.state.load ?
              <Stack.Screen name="Drawer" component={this.myDrawer} />

              :
              <Stack.Screen name="AddressInformation" component={AddressInformation} />

            } */}
            {/* {!this.state.load? */}
            <Stack.Screen name="AddressInformation" component={AddressInformation} />
            <Stack.Screen name="Drawer" component={this.myDrawer} />
            <Stack.Screen name="Fruits" component={Fruits} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="AddCart" component={AddCart} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="OrderSummary" component={OrderSummary} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Offers" component={Offers} />
            <Stack.Screen name="Bundles" component={Bundles} />
            <Stack.Screen name="Bottomtabnavigator" component={Bottomtabnavigator} />
            <Stack.Screen name="AllProducts" component={AllProducts} />
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="GetReview" component={GetReview} />


          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// export function CustomDrawerContent(props) {

//   const [user, setUser] = useState('');
//   SignOut = async () => {
//     await AsyncStorage.removeItem('userData');
//    // await AsyncStorage.removeItem('userId');
//    props.navigation.closeDrawer();

//   }
//   const GetData = async () => {
//     setUser(await AsyncStorage.getItem('userData'))
//   }
//   useEffect(() => {
//     GetData();
//   });
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       {user ? <DrawerItem label="Signout" onPress={() => SignOut()} /> : null}
//     </DrawerContentScrollView>
//   );
// }