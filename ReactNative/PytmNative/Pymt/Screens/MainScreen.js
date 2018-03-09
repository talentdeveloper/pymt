import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './SideMenu/MenuScreen';
import  Categorylst  from './../Components/CategoryList';
import ThumbCategorylst from './../Components/Thumbcategorylist';
import Itemcategorylist from './../Components/Itempricelist';
import Itemtotal from './../Components/ItemTotal';
const image = require('./Images/airplane.png');
import { Container, Header, Content, Footer, FooterTab, Button, Left, Icon, Body, Title, Right, Input, Item } from 'native-base';
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Basic extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  RenderPage() {
    switch (this.state.selectedItem)
    {
      case 'home':
      {
                return (
            <Categorylst />
          );
      }
      case 'transaction':
        {
          return (<ThumbCategorylst></ThumbCategorylst>);
        }
      case 'cash':
        {
          return (<Itemcategorylist></Itemcategorylist>);
        }
      case 'tips':
        {
          return (<Itemtotal></Itemtotal>);
        }
      case 'endofday':
        {
          return (<View><Text>ebd of days</Text></View>);
        }
      case 'peripherals':
        {
          return (<View><Text>Peripherals</Text></View>);
        }
      case 'account':
        {
          return (<View><Text>account</Text></View>);
        }
      case 'signout':
        {
          break;
        }
    }
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { navigate } = this.props.navigation;
    return (

      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Pymt</Title>
          </Body>
          <Right />
        </Header>
        <Header searchBar rounded>
          <Item>
            <Input placeholder="Search" />
            <Icon name="ios-search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <View style={styles.container}>
          {this.RenderPage()}
        </View>
        <Footer>
          <FooterTab>
            <Button transparent>
              <Icon name='ios-cube-outline' />
            </Button>
            <Button transparent>
              <Icon name='ios-apps-outline' />
            </Button>
            <Button transparent>
              <Icon name='ios-camera-outline' />
            </Button>
            <Button transparent onPress={() => { navigate("ReciptScreen")}} >
              <Icon name='ios-cart-outline' />
            </Button>
          </FooterTab>
        </Footer>
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
          <Text>Menu</Text>
        </TouchableOpacity>
      </SideMenu>
    );
  }
}