import { AppRegistry } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import App from './App';
import LoginScreen from './Screens/LoginScreen';
import PinScreen from './Screens/PinScreen';

const navigation = StackNavigator({

    PinScreen: { screen: PinScreen},
    LoginScreen: { screen: LoginScreen },


});


AppRegistry.registerComponent('Pytm', () => navigation);
