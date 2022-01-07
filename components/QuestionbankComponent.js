import React, { Component } from 'react';
import { ScrollView,Text, View,StyleSheet } from 'react-native';
import axios from 'axios';

class QuestionbankComponent extends Component {
  
  state = {
    questions: []
   }
   componentDidMount() {
    axios.get(`http://588c-2405-201-8012-1026-cc62-eb07-fc9e-2064.ngrok.io/api/get-question-and-asnwer/test`)
   .then(res => {
      const questions = res.data;
      this.setState({ questions });
     })
   }
  render() {
    return (
        <ScrollView style = {styles.scroll} >
        {this.state.questions.map((data, key) => {
         return (
           <View style = {styles.box1}>
          <View  style = {styles.box12} >
             <Text style = {styles.boxfont} >{data.id} :</Text>
             <Text  style = {styles.boxfont} >{data.question}</Text>
          </View>
          <View style = {styles.box12} >
        <Text style = {styles.boxsubfont} >Ans :</Text>
        <Text style = {styles.boxsubfont} >{data.getcorrectansid.answer}</Text>
        </View>
          </View>
         );
      })}
        
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