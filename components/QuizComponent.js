import React, { Component} from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Speech from 'expo-speech';
import LocalizedStrings from 'react-native-localization';

// import React, { useState } from "react";
// import {Speech} from 'expo';
// import Tts from 'react-native-tts';
class QuizComponent extends Component {
  state = { index: 0,
    questions:  [],
    noOfQuestion: 0,
    writeAnswer: 0,
    wrongAnswer: 0,
    explain:"",
    explainModalVisible: false,
    translatorModalVisible: false,
    answeredOption: 0,
    correctOption:  0
  };
  constructor(props) {
    super(props);
    this.state = { index: 0,
      questions:  [],
      noOfQuestion: 0,
      writeAnswer: 0,
      wrongAnswer: 0,
      explain:"",
      explainModalVisible: false,
      translatorModalVisible: false,
      answeredOption: 0,
      correctOption:  0
    };
    this.lang = [
      { shortName: 'hi', longName: 'Hindi' },
      { shortName: 'en', longName: 'English' },
      { shortName: 'fr', longName: 'French' },
      { shortName: 'sp', longName: 'Spanish' },
    ];
  };
  All_Language_Strings = new LocalizedStrings({
    "hi": {
      text_1: "हैलो दोस्तों.",
      text_2: "हमारी वैबसाइट पर आपका स्वागत है.",
    },
    "en": {
      text_1: "Hello Guys.",
      text_2: "Welcome to our Website.",
    },
    "fr": {
      text_1: "Bonjour les gars.",
      text_2: "Bienvenue sur notre site.",
    },
    "sp": {
      text_1: "Hola chicos.",
      text_2: "Bienvenido a nuestro sitio web.",
    }
  });
  navigate_To_Next_Activity(item) {
 
    All_Language_Strings.setLanguage(item);
 
    this.props.navigation.navigate('QuizComponent', { Language_Code: item });
 
  }
  // readOut = () => {
  //   Tts.getInitStatus().then(() => {
  //     // ...
  //   }, (err) => {
  //     if (err.code === 'no_engine') {
  //       Tts.requestInstallEngine();
  //     }
  //   });
  // };
  onPress = () => {
    let i = this.state.index < this.state.questions.length ? this.state.index += 1 : 0;
    this.setState({ index: i ,answeredOption: 0,correctOption: 0});
  };
  setExplainModalVisible = (visible) => {
    this.setState({ explainModalVisible: visible });
  };
  setTranslatorModalVisible = (visible) => {
    this.setState({ translatorModalVisible: visible });
  };
  checkAnswer = (answerId,questionId,explain,answeredOption) =>{
    var explain = explain;
    var correctOption = this.state.correctOption;
    var getAnsweredOption = this.state.answeredOption;
    var writeAnswer = this.state.writeAnswer;
    var wrongAnswer = this.state.wrongAnswer;
    if(getAnsweredOption === 0)
    {
      this.state.answeredOption = answeredOption;
      if(answerId === questionId){
        correctOption = answerId;
        writeAnswer = this.state.writeAnswer + 1;
      }else{
        correctOption = answerId;
        explain = explain;
        wrongAnswer = this.state.wrongAnswer + 1;
      }
    }
    this.setState({writeAnswer: writeAnswer,wrongAnswer: wrongAnswer,explain: explain,correctOption :answerId});
  };
  componentDidMount() {
    axios.get(`https://rto-patente.herokuapp.com/api/get-question-and-asnwer/test`)
   .then(res => {
      const questions = res.data;
      this.setState({ questions:questions});
     })
  };
  
   render() {
    const speak = (data) => {
      const thingToSay = data;
      Speech.speak(thingToSay);
    };
    const { explainModalVisible } = this.state.explainModalVisible;
    const {translatorModalVisible} = this.state.translatorModalVisible;
      return (
        <ScrollView style = {styles.scroll}>
          {this.state.questions.slice(this.state.index, this.state.index+1).map((data,index) => {
          return (
            <View style = {styles.box2}>
              <View style = {styles.box4}>
                <View style = {styles.box5}>
                  <Text style = {styles.boxfont}>{data.question}</Text>
                  <TouchableOpacity onPress={() => speak(data.question)}>
                  <Icon name="volume-up" size={30} />
                  </TouchableOpacity>
                </View>
                <View style = {styles.box5}>
                  <Image source={{uri: 'https://icon2.cleanpng.com/20180129/cve/kisspng-traffic-light-road-transport-vehicle-icon-traffic-light-5a6edd7da83ee4.9381976715172151016891.jpg'}}
                  style={{width: 100,height:100}} />
                  <TouchableOpacity style = {styles.languagebutton} onPress={() => this.setTranslatorModalVisible(true)} >
                  <Icon name="language" size={30} color={'#fff'}/>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style = {this.state.correctOption === data.getchoice1stid.id ? styles.boxCorrect:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice1stid.id,data.getcorrectansid.explanation,1)}>
                <Text style = {styles.boxsubfont}>a ) {data.getchoice1stid.answer}</Text>  
              </TouchableOpacity>
              <TouchableOpacity style = {this.state.correctOption === data.getchoice2ndid.id ? styles.boxCorrect:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice2ndid.id,data.getcorrectansid.explanation,2)}>
                <Text style = {styles.boxsubfont}>b ) {data.getchoice2ndid.answer}</Text>  
              </TouchableOpacity >
              <TouchableOpacity style = {this.state.correctOption === data.getchoice3rdid.id ? styles.boxCorrect:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice3rdid.id,data.getcorrectansid.explanation,3)}>
                <Text style = {styles.boxsubfont}>c)  {data.getchoice3rdid.answer}</Text>  
              </TouchableOpacity>
              <TouchableOpacity style = {this.state.correctOption === data.getchoice4thid.id ? styles.boxCorrect:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice4thid.id,data.getcorrectansid.explanation,4)}>
                <Text style = {styles.boxsubfont}>d ) {data.getchoice4thid.answer}</Text>  
              </TouchableOpacity>
              {/* <View style= {styles.box2}>
                <Text style = {styles.boxsubfont}>{this.state.explain}</Text>
              </View> */}
            </View>
          );
        })}

          {/** Expanation modal */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.explainModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setExplainModalVisible(!this.state.explainModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{this.state.explain === '' ? 'Please Select an Answer' : this.state.explain}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setExplainModalVisible(!this.state.explainModalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Explanation</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          {/** End of Expanation modal */}

          {/** Translator modal */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.translatorModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setTranslatorModalVisible(!this.state.translatorModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{this.state.explain === '' ? 'Please Select an Answer' : this.state.explain}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setTranslatorModalVisible(!this.state.translatorModalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Translator</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          {/** End of Translator modal */}

          

          <View style = {styles.box12}>
            <View style = {styles.show}>
            <View style = {styles.right}>
            <Text style = {styles.boxfontcolor}><Icon name="check" size={25} color="#fff" />
            : {this.state.writeAnswer}</Text>
            </View>  
            <View style = {styles.wrong}>
            <Text style = {styles.boxfontcolor}><Icon name="close" size={25} color="#fff"/>
              : {this.state.wrongAnswer}</Text>
            </View>
            </View> 
            <TouchableOpacity 
        onPress={() => this.setExplainModalVisible(true)}>
            <Image source={{uri: 'https://image.flaticon.com/icons/png/512/224/224641.png'}}
            style={{width: 50, height: 50}}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.box3} onPress={this.onPress} >
            <Text style = {styles.boxbutton}>Next</Text>  
            </TouchableOpacity>
          </View>

        </ScrollView>
      );
    }
  }
export default QuizComponent;

const styles = StyleSheet.create ({
        scroll:{
            backgroundColor:'#ccc'
         },
         box3:{
           borderRadius:10,
           width:'40%',
           backgroundColor:'#008080'
         },
         languagebutton:{
          backgroundColor:'#008080',
          borderRadius:30,
          padding:10,
          height:50,
          width:50,
          // shadowOffset:{
          //   width:30,
          //   height:30
          // },
          // shadowOpacity:5,
          // shadowRadius:25,
          // shadowColor:'blue'
         },
         box2:{
            marginTop: 20,
            padding:10
          },
          box1:{
            borderTopColor:'#000',
            borderTopWidth:1,
            backgroundColor:'#fff',
            paddingRight:'10%',
            paddingTop:'2%',
         },
         boxCorrect:{
          borderTopColor:'#000',
          borderTopWidth:1,
          backgroundColor:'#008000',
          paddingRight:'10%',
          paddingTop:'2%',

          // borderTopColor:'#000',
          // borderTopWidth:1,
          // backgroundColor:'#008000',
          // paddingRight:'10%',
          // paddingTop:'2%',
          // borderWidth: 5,
          // borderColor: '#008000',
         },
         box4:{
          backgroundColor:'#fff',
          paddingRight:'10%',
          paddingTop:'2%'
         },
         boxfont:{
            fontSize: 20,
            fontWeight:'800',
            margin: 10
          },
          boxfontcolor:{
            fontSize: 20,
            fontWeight:'800',
            color:'#fff',
            margin: 10
          },
          boxsubfont:{
            fontSize: 18,
            fontWeight:'800',
            margin: 10
          },
          box5:{
            flexDirection:'row',
            justifyContent:'space-between',
          },
          box12:{
            backgroundColor:'#fff',
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            paddingTop:'5%',
            paddingBottom:'5%'
        },
        right:{
          backgroundColor:"#008080",
          borderTopStartRadius:10,
          borderBottomStartRadius:10
        },
        wrong:{
          backgroundColor:"#d12828",
          borderTopEndRadius:10,
          borderBottomEndRadius:10
        },
        show:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center'
      },
      boxbutton:{
      fontSize:18,
      color:'rgb(241, 226, 226)',
      fontWeight:'800',
      textAlign:'center',
      margin:10,
      color:'#fff'
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize:18,
        marginBottom: 15,
        fontWeight: "bold",
        textAlign: "left"
      }
 })