import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet } from 'react-native';


class QuestionbankComponent extends Component {
  render() {
    return (
        <ScrollView style = {styles.scroll} >
        <View  style = {styles.box1} >
        <View  style = {styles.box12} >
         <Text style = {styles.boxfont} >Q.1:</Text>
        <Text  style = {styles.boxfont} >Lorem ipsum lorem ipsum</Text>
        </View>
        <View style = {styles.box12} >
        <Text style = {styles.boxsubfont} >Ans : </Text>
        <Text style = {styles.boxsubfont} >Lorem ipsum lorem ipsum Lorem ipsum </Text>
        </View>
        </View>
         <View style = {styles.box1} >
        <View  style = {styles.box12} >
         <Text style = {styles.boxfont} >Q.2:</Text>
        <Text  style = {styles.boxfont} >Lorem ipsum lorem ipsum</Text>
        </View>
        <View style = {styles.box12} >
        <Text style = {styles.boxsubfont} >Ans : </Text>
        <Text style = {styles.boxsubfont} >Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum</Text>
        </View>
        </View>
         <View style = {styles.box1} >
        <View  style = {styles.box12} >
         <Text style = {styles.boxfont} >Q.3:</Text>
        <Text  style = {styles.boxfont} >Lorem ipsum lorem ipsum</Text>
        </View>
        <View style = {styles.box12} >
        <Text style = {styles.boxsubfont} >Ans : </Text>
        <Text style = {styles.boxsubfont} >Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum</Text>
        </View>
        </View>
         <View style = {styles.box1} >
        <View  style = {styles.box12} >
         <Text style = {styles.boxfont} >Q.4:</Text>
        <Text  style = {styles.boxfont} >Lorem ipsum lorem ipsum</Text>
        </View>
        <View style = {styles.box12} >
        <Text style = {styles.boxsubfont} >Ans : </Text>
        <Text style = {styles.boxsubfont} >Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum</Text>
        </View>
        </View>   
</ScrollView>
       
    );
  }
}
export default QuestionbankComponent;

const styles = StyleSheet.create ({
    box1:{
      marginTop: 5,
      backgroundColor:'#fff',
      width:'100%',
      paddingRight:'10%',
      paddingTop:'2%',
      paddingBottom:'3%',
      borderRadius:5
        },
        scroll:{
            padding: 10,
            backgroundColor:'#ccc'
         },
         box2:{
            marginTop: 10
          },
          boxfont:{
            fontSize: 20,
            margin: 10,
            fontWeight: '900'
          },
          boxsubfont:{
            fontSize: 16,
            textAlign: 'left',
            margin: 5,
            fontWeight: '900'
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        }
 })