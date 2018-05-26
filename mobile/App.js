/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });



import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';
import PinScreen from './Screens/PinScreen';
import OpenAmountScreen from './Screens/OpenAmountScreen';
import CashdropAmmountScreen from './Screens/CashdropAmountScreen';
import categoryScreen from './Screens/CategroyScreen';
import MainScreen from './Screens/MainScreen';
import ReciptScreen from './Screens/ReciptScreen';
import SendReciptScreen from './Screens/SendReciptScreen';

const navigation = StackNavigator({

    LoginScreen: { screen: LoginScreen },
    PinScreen: { screen: PinScreen },
    ReciptScreen: { screen: ReciptScreen },
    SendReciptScreen: { screen: SendReciptScreen },
    MainScreen: { screen: MainScreen },
    categoryScreen: { screen: categoryScreen },
    CashdropAmmountScreen: { screen: CashdropAmmountScreen },
    OpenAmountScreen: { screen: OpenAmountScreen },


});


export default navigation
