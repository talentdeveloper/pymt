import { AppRegistry } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import App from './App';
import LoginScreen from './Screens/LoginScreen';
import PinScreen from './Screens/PinScreen';
import OpenAmountScreen from './Screens/OpenAmountScreen';
import CashdropAmmountScreen from './Screens/CashdropAmountScreen';
import categoryScreen from './Screens/CategroyScreen';
import MainScreen from './Screens/MainScreen';

const navigation = StackNavigator({
    MainScreen:{screen:MainScreen},
    categoryScreen: { screen: categoryScreen},
    CashdropAmmountScreen: { screen: CashdropAmmountScreen},
    OpenAmountScreen: { screen: OpenAmountScreen},
    PinScreen: { screen: PinScreen},
    LoginScreen: { screen: LoginScreen },


});


AppRegistry.registerComponent('Pytm', () => navigation);