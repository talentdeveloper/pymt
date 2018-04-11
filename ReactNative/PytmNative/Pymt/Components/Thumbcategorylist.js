import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    Alert

} from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      

    },

    Card: {
        padding: 20,
        marginRight: 15,
        backgroundColor: '#78aef9',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        width: '30%',
        height: 100,
        marginBottom: 10

    },

});

export default function Thumbcategorylist() {
    return (
        <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
            <View style={styles.container}>
                {categorylist()}
               
            </View>
            <View style={styles.container}>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >A</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >B</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >C</Text>
                </TouchableHighlight>
              
            </View>
            <View style={styles.container}>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >A</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >B</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >C</Text>
                </TouchableHighlight>
               
            </View>
            <View style={styles.container}>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >A</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >B</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.Card}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >C</Text>
                </TouchableHighlight>
               
            </View>
        </ScrollView>
    );
}


function categorylist() {
    try {
        var api1 = 'http://localhost:3000/api/category';
        fetch(api1)
            .then((response) => response.json())
            .then((responseJson) => {
                alert(JSON.stringify(responseJson));
                var catelist = [];
                responseJson.data.map((cate) => {
                    catelist.push(
                        
                        <TouchableHighlight style={styles.Card}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }} >cate.CategoryName</Text>
                        </TouchableHighlight>
                      
                    );
                });
                // for (w in this.state.wifiList) {

                // }
                return catelist;

            })
            .catch((e) => {
  alert(e);
            });
    } catch (e) {
        alert(e);
        return false;
    }
  
}
