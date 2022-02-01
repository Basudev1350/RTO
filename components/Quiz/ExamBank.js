import React, { Component} from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Speech from 'expo-speech';
// import LocalizedStrings from 'react-native-localization';

// import React, { useState } from "react";
// import {Speech} from 'expo';
// import Tts from 'react-native-tts';
class ExamBank extends Component {
  state = { index: 0,
    questions:  [],
    noOfQuestion: 0,
    writeAnswer: 0,
    wrongAnswer: 0,
    scorePercentage:0,
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
      scorePercentage:0,
      explain:"",
      explainModalVisible: false,
      translatorModalVisible: false,
      answeredOption: 0,
      correctOption:  0
    };
    // this.lang = [
    //   { shortName: 'hi', longName: 'Hindi' },
    //   { shortName: 'en', longName: 'English' },
    //   { shortName: 'fr', longName: 'French' },
    //   { shortName: 'sp', longName: 'Spanish' },
    // ];
  };
  // All_Language_Strings = new LocalizedStrings({
  //   "hi": {
  //     text_1: "हैलो दोस्तों.",
  //     text_2: "हमारी वैबसाइट पर आपका स्वागत है.",
  //   },
  //   "en": {
  //     text_1: "Hello Guys.",
  //     text_2: "Welcome to our Website.",
  //   },
  //   "fr": {
  //     text_1: "Bonjour les gars.",
  //     text_2: "Bienvenue sur notre site.",
  //   },
  //   "sp": {
  //     text_1: "Hola chicos.",
  //     text_2: "Bienvenido a nuestro sitio web.",
  //   }
  // });
  // navigate_To_Next_Activity(item) {
 
  //   All_Language_Strings.setLanguage(item);
 
  //   this.props.navigation.navigate('QuizComponent', { Language_Code: item });
 
  // }
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
    const { chapterId ,totalQ} = this.props.route.params;
    var scorePercentage = (this.state.writeAnswer / totalQ)*100 ;
    this.setState({writeAnswer: writeAnswer,wrongAnswer: wrongAnswer,explain: explain,correctOption :answerId,scorePercentage :scorePercentage});
  };
  componentDidMount() {
    const { chapterId ,totalQ} = this.props.route.params;
    console.log(chapterId);
    this.state.noOfQuestion = totalQ;
    axios.get(`https://rto-patente.herokuapp.com/api/get-question-and-asnwer/test/`+chapterId)
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
    const { chapterId ,totalQ} = this.props.route.params;
      return (
        <ScrollView style = {styles.scroll}>
          {this.state.questions.slice(this.state.index, this.state.index+1).map((data,index) => {
          console.log(totalQ - 1)
          if(this.state.index == (totalQ - 1))
          {
            if(this.state.scorePercentage > 40)
            {
              return(
                <ScrollView style = {styles.scroll2}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestionbankComponent')}>
                    <View style = {styles.resultbox1} >
                    <Text style= {styles.congo} > Congratulations !!! </Text>
                    <Image source={{uri:'https://freepngimg.com/thumb/winner/9-2-winner-png-clipart.png'}}
                      style={styles.win} />
                      <Text style={styles.score}> You Win The Quiz </Text>
                      <Text style={styles.correctScore}>Correct answer :{this.state.writeAnswer}</Text>
                      <Text style={styles.wrongScore}>Wrong Answer   :{this.state.wrongAnswer}</Text>
                      <Text style={styles.score}>Your Score     :{this.state.scorePercentage}%</Text>
                      <View style = {styles.box12}>
                        <TouchableOpacity style = {styles.box3} onPress={() => this.props.navigation.navigate('Home')}>
                          <Text style = {styles.boxbutton}> Home </Text> 
                        </TouchableOpacity>
                      </View>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
              )
            }else{
              return(
                <ScrollView style = {styles.scroll2}>
                  <TouchableOpacity>
                    <View style = {styles.resultbox1} >
                    <Text style= {styles.oops} > Oops !!! </Text>
                      <Image source={{uri: 'https://www.vhv.rs/dpng/d/524-5243967_oops-sign-transparent-background-clipart-png-download-traffic.png'}}
                        style={styles.win} />
                      <Text style={styles.score}> You Lose The Quiz </Text>
                      <Text style={styles.correctScore}>Correct answer :{this.state.writeAnswer}</Text>
                      <Text style={styles.wrongScore}>Wrong Answer   :{this.state.wrongAnswer}</Text>
                      <Text style={styles.score}>Your Score {this.state.scorePercentage}%</Text>
                      <View style = {styles.box12}>
                        <TouchableOpacity style = {styles.box3} onPress={() => this.props.navigation.navigate('Home')}>
                          <Text style = {styles.boxbutton}> Home </Text> 
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              )
            }
          }else{
            return (
              <View style = {styles.box2}>
                <View style = {styles.box4}>
                  <View style = {styles.box5}>
                    <Text key={index} style = {styles.boxfont}>Q{this.state.index + 1} {data.question}</Text>
                    <TouchableOpacity onPress={() => speak(data.question)}>
                    <Icon name="volume-up" size={30} />
                    </TouchableOpacity>
                  </View>
                  <View style = {styles.box5}>
                    <Image source={{uri: data.getcorrectansid.filePath}}
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
          }
        })}

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
          {this.state.index == (totalQ -1) ? <View></View> : 
          <View style = {styles.box12}> 
              <Pressable style = {styles.box3} onPress={this.onPress} >
              <Text style = {styles.boxbutton}>Next</Text>  
              </Pressable> 
          </View>} 

        </ScrollView>
      );
    }
  }
export default ExamBank;

const styles = StyleSheet.create ({
        scroll:{
            backgroundColor:'#ccc'
         },
         box3:{
           borderRadius:5,
           width:'30%',
           height:'90%',
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
            fontSize: 16,
            fontWeight:'800',
            margin: 10
          },
          boxfontcolor:{
            fontSize: 16,
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
        margin: 10,
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
      },
      resultbox1:{
        marginTop: 10,
        borderRadius:5,
        height:550,
        backgroundColor:'#fff',
        padding:20,
        width:'100%'
      },
      oops:{
        fontSize:40,
        textAlign:'center',
        color:'red'
      },
      win:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
      },
      score:{
        textAlign:'center',
        fontSize:22,
        marginTop:5
      },
      scroll2:{
        padding: 10
      },
      buttonText:{
          color:'#fff',
          fontSize:18
      },
      congo:{
        fontSize:30,
        textAlign:'center',
        color:'green'
       },
      correctScore:{
        fontSize:20,
        textAlign: 'center',
        color:'green'
      },
      wrongScore:{
        fontSize:18,
        textAlign: 'center',
        color:'red'
      }
 })