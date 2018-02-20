import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';


import { AppRegistry, StyleSheet, TextInput, View, Image, TouchableHighlight, Text } from 'react-native';
import {  Button } from 'native-base';

export default class Homescreen extends Component {

    static navigationOptions = {

        header: null,
    };
    constructor(props) {
        super(props)
        this.state = { useremail: '', userpassword: '' };
       
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.SectionStyle}>
                    <Image source={require('./../Images/ic_person.png')} style={styles.ImageStyle} />
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Email Address"
                        underlineColorAndroid="transparent"
                        onChangeText={(useremail) => this.setState({ useremail })}
                    />

                </View>
                <View style={styles.SectionStyle}>
                    <Image source={require('./../Images/ic_person.png')} style={styles.ImageStyle} />
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={(userpassword) => this.setState({ userpassword })}
                    />

                </View>

                <Button block
                    onPress={() => { }}
                    color="#187FD7"
                    style={{ margin: 10 }}
                >
                    <Text style={{ color: '#fff' }} >Login</Text>
                </Button>
                <View style={{ width: '100%' }}>

                    <Button transparent
                        onPress={() => { }}
                        style={{ position: 'absolute', left: '7%' }}
                    >
                        <Text style={{ color: '#000' }} >Back</Text>
                    </Button>
                    <Button transparent
                        onPress={() => { }}
                        style={{ position: 'absolute', right: '7%' }}
                    >
                        <Text style={{ color: '#000' }} >Sign up</Text>
                    </Button>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    inputsContainer: {
        flex: 1
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        height: 45,
        borderRadius: 0,
        margin: 10

    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },

});