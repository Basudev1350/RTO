import React, { Component} from 'react';
import { ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet, Image,Modal,ActivityIndicator,Flatlist,Alert,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Speech from 'expo-speech';
import { RadioButton } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';


class ExamBank extends Component  {
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
    correctOption:  0,
    toggle:true,
    modalVisible: true
   
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
      correctOption:  0,
      active: 0,
      loader:true,
      pressed:false,
      checked:true,
      modalVisible: false,
      cardNo:'',
      translated:'',
      cardNo2:'',
      translated2:'',
      cardNo3:'',
      translated3:''
    };
    
  };
  // saveUserDetails =() =>{
  //   let check = this.state.checked;
  //   AsyncStorage.setItem('check',check);
  //   this.setState({"check": check});
  //   };
    // displayuserDetail = async ()=>{
    //   try{
    //   let check = await AsyncStorage.getItem('username');
    //   alert(check);
    //   }
    //   catch(error){
    //   alert(error)
    //   }
    //   }
 setModalVisible = (visible) => {
   this.setState({ modalVisible: visible });
  }
  onNext = () => {
    let i = this.state.index < this.state.questions.length ? this.state.index += 1 : 0;
    this.setState({ index: i ,answeredOption: 0,correctOption: 0});
  };
  onPrevious = () => {
    let i = this.state.index < this.state.questions.length ? this.state.index -=1:1                                           ;
    this.setState({ index: i ,answeredOption: 0,correctOption: 0});
  };
  // setExplainModalVisible = (visible) => {
  //   this.setState({ explainModalVisible: visible });
  // };
  // setTranslatorModalVisible = (visible) => {
  //   this.setState({ translatorModalVisible: visible });
  // };
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
    this.setState({writeAnswer: writeAnswer,wrongAnswer: wrongAnswer,explain: explain,correctOption :answerId,scorePercentage :Math.round(scorePercentage)});
  };
  benlang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  benlang2(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
  benlang3(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-bengali', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated3 :response2.data , cardNo3 : index}));
         
        });
   
  }
  renderResult(){
    const { chapterId ,totalQ} = this.props.route.params;
    console.log(this.state.index+1);
    if(this.state.index+1 == (totalQ+1))
    {
      if(this.state.scorePercentage > 40)
      {
        return(
          <View>
            <View style = {styles.resultbox1} >
            <Text style= {styles.congo} > Congratulazioni!!! </Text>
            <Image source={require('../img/winner.jpg')}
              style={styles.win} />
               <View style={styles.scoreboard}>
                <Text style={styles.score}> Vinci il quiz </Text>
                <Text style={styles.correctScore}>corretta :{this.state.writeAnswer}</Text>
                <Text style={styles.wrongScore}>sbagliata  :{this.state.wrongAnswer}</Text>
                <Text style={styles.score}>{Math.round(this.state.scorePercentage)}%</Text>
              </View>
              <View style = {styles.box12}>
                <TouchableOpacity style = {styles.box3} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text style = {styles.boxbutton}> Casa </Text> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }else{
        return(
          <View>
            <View style = {styles.resultbox1} >
            <Text style= {styles.oops} > Lavorare Duramente! </Text>
              <Image source={require('../img/looser.jpg')}
                style={styles.win} />
              <View style={styles.scoreboard}>
                <Text style={styles.score}> Vinci il quiz </Text>
                <Text style={styles.correctScore}>corretta :{this.state.writeAnswer}</Text>
                <Text style={styles.wrongScore}>sbagliata  :{this.state.wrongAnswer}</Text>
                <Text style={styles.score}>{Math.round(this.state.scorePercentage)}%</Text>
              </View>
              <View style = {styles.box12}>
                <TouchableOpacity style = {styles.box3} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text style = {styles.boxbutton}> Casa </Text> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
    }
  };
  componentDidMount() {
    const { chapterId ,totalQ} = this.props.route.params;
    console.log(chapterId);
    this.state.noOfQuestion = totalQ;
    // axios.get(`https://lmpatente.srkptechnologies.com/api/get-question-and-asnwer/test/`+chapterId)
    //   .then(res => {
    //     const questions = res.data;
    //     this.setState({ questions:questions});
    //   })
    axios.get(`https://lmpatente.srkptechnologies.com/api/get-question-and-asnwer/test/`+chapterId)
    .then(res => {
      if(res != null)
      {
        const questions = res.data;
        this.setState({ questions:questions});
      }
    }).catch(error => {
      if(error != null)
      {
        const questions = error.response.data;
        this.setState({ questions:questions});
      }
      else{
      Alert.alert("OOps ! Server iss");
      this.props.navigation.navigate('Home');
      }
    });
      setTimeout(()=>{
        this.setState({loader:false})
      },3000)
  };
  // onPresscolor(){
  //   const newstate = !this.state.toggle;
  //   this.setState({toggle:newstate})
  // }
  // onPresscolor1(){
  //   const newstate = !this.state.toggle;
  //   this.setState({toggle:newstate})
  // }
   render() {
    const speak = (data) => {
      const thingToSay = data;
      Speech.speak(thingToSay);
    };
    const { checked } = this.state;
    // const {toggle} = this.state;
    // const buttonBg = toggle ? "blue" : "white";
  
    // const { explainModalVisible } = this.state.explainModalVisible;
    // const {translatorModalVisible} = this.state.translatorModalVisible;
    const { modalVisible } = this.state;
    const { chapterId ,totalQ} = this.props.route.params;
      return (
        <ImageBackground
        style={{
          flex:1,
          height: '100%',
          padding:0,
          width: '100%',
          backgroundSize: 'cover',
          justifyContent:'center',
          zIndex: -1,
        }}
        source={require('../img/bg.jpg')}
        >
        <ScrollView  style = {styles.scroll}>
          {
          this.state.loader ?
          <ActivityIndicator size={100} color="green" marginTop={200} /> :
          <ScrollView style = {styles.scroll}>
           {/** Result Show */}
          <View style = {styles.scroll2}>
           {this.renderResult()}
          </View>
          {/** End Result Show */} 
          {this.state.questions.slice(this.state.index, this.state.index+1).map((data,index) => {
          console.log(totalQ)
          if(this.state.index+1 == (totalQ+1))
          {
            return null;
          }else{
            return (
              <View key={index} style = {styles.box2}>
                <View style = {styles.box4}>
                  <View style={styles.numberbox}>
                    <Text style = {styles.numberq}>{this.state.index + 1}</Text>
                  </View>
                  <View style = {styles.box53}>
                    <Image  source={require('../img/qsymbol.jpg')} style={{width: 30 , height: 30}}></Image>
                    <Text style = {styles.boxfont}>{data.question}</Text>
                  </View>
                  <View style={styles.box123}>
                  <TouchableOpacity onPress={() => speak(data.question)}>
                    <Icon name="volume-up" size={30} style = {{ marginStart: 2 }} />
                  </TouchableOpacity>
                  <View style={styles.centeredView}>
                 <Modal
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  this.setModalVisible(!this.state.modalVisible);
                  }}
                  >
                 <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                <Text style = {styles.modalText}> {this.state.cardNo == index ? this.state.translated : '' } </Text>
                <Text style = {styles.modalText}> a) {this.state.cardNo2 == index ? this.state.translated2 : '' } </Text>
                <Text style = {styles.modalText}> b) {this.state.cardNo3 == index ? this.state.translated3 : '' } </Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible) } 
                 >
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
              </View>
              </View>
             </Modal>
             <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible) || this.benlang(data.question,index) ||
                this.benlang2(data.getchoice1stid.answer,index) || this.benlang3(data.getchoice2ndid.answer,index) }>
              <Image
                style={{width: 40, height: 40}} 
                source={require('../img/googletranslate.png')}
              />
             </TouchableOpacity>
            </View>
            </View>
                  {data.getcorrectansid.filePath == '' ? <Text></Text>: 
                  <Text></Text>}
                  <View style = {styles.box53}>
                    {data.getcorrectansid.filePath == '' ? <Text></Text>:<Image source={{uri: data.getcorrectansid.filePath}}
                    style={{width: 100,height:100}} />}
                    {/* <TouchableOpacity style = {styles.languagebutton} onPress={() => this.setTranslatorModalVisible(true)} >
                    <Icon name="language" size={30} color={'#fff'}/>
                    </TouchableOpacity> */}
                  </View>
                </View>
                {/* style = {this.state.correctOption === data.getchoice1stid.id ? styles.box1:styles.box1} */}
                {/* <TouchableOpacity  style = {{backgroundColor:buttonBg}} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice1stid.id,data.getcorrectansid.explanation,1)} onPressOut={()=>this.onPresscolor()}>
                  <Text style = {styles.boxsubfont}>a ) {data.getchoice1stid.answer}</Text>  
                </TouchableOpacity> */}
                {/* style = {{backgroundColor:buttonBg}} */}
                {/* <TouchableOpacity style = {{backgroundColor:buttonBg}} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice2ndid.id,data.getcorrectansid.explanation,2)} onPressIn={()=>this.onPresscolor1()}>
                  <Text style = {styles.boxsubfont}>b ) {data.getchoice2ndid.answer}</Text>  
                </TouchableOpacity >
                {data.getchoice3rdid == null ? <Text></Text>:<TouchableOpacity style = {this.state.correctOption === data.getchoice3rdid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice3rdid.id,data.getcorrectansid.explanation,3)}>
                  <Text style = {styles.boxsubfont}>c)  {data.getchoice3rdid.answer}</Text>  
                </TouchableOpacity>}
                {data.getchoice4thid == null ? <Text></Text>:<TouchableOpacity style = {this.state.correctOption === data.getchoice4thid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice4thid.id,data.getcorrectansid.explanation,4)}>
                  <Text style = {styles.boxsubfont}>d ) {data.getchoice4thid.answer}</Text>  
                </TouchableOpacity>} */}
                <View style={styles.boxyy}>

                <RadioButton.Group>
                <RadioButton.Item label={data.getchoice1stid.answer}   
                 value={data.getchoice1stid.answer}
                 style = {styles.box534}
                 status={data.getchoice1stid.id === checked ? 'checked' : 'unchecked'}
                 onPress={() => { this.setState({ checked: data.getchoice1stid.id});  
                 this.checkAnswer(data.getcorrectansid.id,data.getchoice1stid.id,1);
                //  this.saveUserDetails
                  }}
                 />
                 <RadioButton.Item label={data.getchoice2ndid.answer}
                 value = {data.getchoice2ndid.answer}
                 style = {styles.box534}
                 status={data.getchoice2ndid.id === checked? 'checked'  : 'unchecked'}
                 onPress={() => { this.setState({ checked: data.getchoice2ndid.id });
                 this.checkAnswer(data.getcorrectansid.id,data.getchoice2ndid.id,2);
                //  this.saveUserDetails
                 }}
                />
                {data.getchoice3rdid == null ? null:
                   <RadioButton.Item label={data.getchoice3rdid.answer}
                   style = {styles.box534}
                   value = {data.getchoice3rdid.answer}
                   status={data.getchoice3rdid.id === checked ? 'checked'  : 'unchecked'}
                   onPress={() => { this.setState({ checked: data.getchoice3rdid.id });
                   this.checkAnswer(data.getcorrectansid.id,data.getchoice3rdid.id,3);
                  //  this.saveUserDetails
                  }}
                 />
                 }
                 {data.getchoice4thid == null ? null:
                   <RadioButton.Item label={data.getchoice4thid.answer}
                   style = {styles.box534}
                   value = {data.getchoice4thid.answer}
                   status={data.getchoice4thid.id === checked ? 'checked'  : 'unchecked'}
                   onPress={() => { this.setState({ checked: data.getchoice4thid.id });
                   this.checkAnswer(data.getcorrectansid.id,data.getchoice4thid.id,4);
                  //  this.saveUserDetails
                  }}
                 />
                 }
                 </RadioButton.Group>
                </View>
                
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
              {/* <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}> 
                  {this.state.explain === '' ? 'Please Select an Answer' : this.state.explain}
                
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setTranslatorModalVisible(!this.state.translatorModalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Translator</Text>
                  </Pressable>
                </View>
              </View> */}

              <View style={styles.centeredView}>
              <View style={styles.modalView}>
              {this.state.questions.slice(this.state.index, this.state.index+1).map((data,index) => {
                console.log(totalQ)
                if(this.state.index+1 == (totalQ+1))
                {
                  return null;
                }else{
                return (
                <View key={index}>
                   <View style={styles.box123}>
                  <TouchableOpacity onPress={() => speak(data.question)}>
                    <Icon name="volume-up" size={30} style = {{ marginStart: 2 }} />
                  </TouchableOpacity>
                  <View style={styles.centeredView}>
                 <Modal
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  this.setModalVisible(!this.state.modalVisible);
                  }}
                  >
                 <View style={styles.centeredView2}>
                <View style={styles.modalView}>
                <Text style = {styles.modalText}> {this.state.cardNo == index ? this.state.translated : '' } </Text>
                <Text style = {styles.modalText}> a) {this.state.cardNo2 == index ? this.state.translated2 : '' } </Text>
                <Text style = {styles.modalText}> b) {this.state.cardNo3 == index ? this.state.translated3 : '' } </Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible) } 
                 >
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
              </View>
              </View>
             </Modal>
             <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible) || this.benlang(data.question,index) ||
                this.benlang2(data.getchoice1stid.answer,index) || this.benlang3(data.getchoice2ndid.answer,index) }>
              <Image
                style={{width: 40, height: 40}} 
                source={require('../img/googletranslate.png')}
              />
             </TouchableOpacity>
            </View>
            </View>
                  <View  style = {styles.box12} >
                    <Text  style = {styles.boxfont} >{this.state.index + 1}) {data.question}</Text>
                  </View>
                  <View >
                  <View style = {this.state.correctOption === data.getchoice1stid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice1stid.id,data.getcorrectansid.explanation,1)}>
                  <Text style = {styles.boxsubfont}>a ) {data.getchoice1stid.answer}</Text>  
                  </View>
                <View style = {this.state.correctOption === data.getchoice2ndid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice2ndid.id,data.getcorrectansid.explanation,2)}>
                  <Text style = {styles.boxsubfont}>b ) {data.getchoice2ndid.answer}</Text>  
                </View >
                {data.getchoice3rdid == null ? <Text></Text>:<View style = {this.state.correctOption === data.getchoice3rdid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice3rdid.id,data.getcorrectansid.explanation,3)}>
                  <Text style = {styles.boxsubfont}>c)  {data.getchoice3rdid.answer}</Text>  
                </View>}
                {data.getchoice4thid == null ? <Text></Text>:<View style = {this.state.correctOption === data.getchoice4thid.id ? styles.box1:styles.box1} onPress={() => this.checkAnswer(data.getcorrectansid.id,data.getchoice4thid.id,data.getcorrectansid.explanation,4)}>
                  <Text style = {styles.boxsubfont}>d ) {data.getchoice4thid.answer}</Text>  
                </View>}
                  </View>
                 
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setTranslatorModalVisible(!this.state.translatorModalVisible)}
                  >
                     <Text style={styles.textStyle}>Nascondi traduttore</Text>
                  </Pressable>
                   </View>
                 );}
               })}
              </View>
              </View>
            </Modal>
          </View>
          {/** End of Translator modal */}
          <View style={styles.footerBox}>
          {this.state.index-1 == (totalQ-1) ? <View></View> : 
              <Pressable style = {styles.box31} onPress={this.onPrevious} disabled={!this.state.index} >
              <View style = {styles.box5}>
               <Icon name="chevron-left" size={14} color="#fff" style={styles.icon1} />
               <Text style = {styles.boxbutton}>Precedente</Text> 
               </View>
              </Pressable> 
         } 
          {this.state.index+1 == (totalQ+1) ? <View></View> : 
              <Pressable style = {styles.box31} onPress={this.onNext}  >
               <View style = {styles.box5}>
               <Text style = {styles.boxbutton}>Prossima</Text> 
               <Icon name="chevron-right" size={14} color="#fff" style={styles.icon2} />
               </View>
              </Pressable> 
         } 
          </View>
          {/* <View style={styles.centeredView}>
        <Modal
        
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
          </View> */}
          </ScrollView>
        }
        </ScrollView>
        </ImageBackground>
      );
    }
  }
export default ExamBank;

const styles = StyleSheet.create ({
        scroll:{
            backgroundColor:'transparent'
         },
         box3:{
           borderRadius:5,
           width:'30%',
           height:'90%',
           backgroundColor:'#008080',
           borderColor:'#96271f',
          borderWidth:0.5,
          shadowColor:'#96271f',
          shadowOpacity:0.3,
          shadowRadius: 0.4,
         },
         box31:{
          borderRadius:5,
          width:'40%',
          height: 50,
          backgroundColor:'#008080',
          padding:0,
          borderColor:'#96271f',
          borderWidth:0.5,
          shadowColor:'#96271f',
          shadowOpacity:0.3,
          shadowRadius: 0.4,
        },
         languagebutton:{
          backgroundColor:'#008080',
          borderRadius:30,
          padding:10,
          height:50,
          width:50,
         },
         box2:{
          backgroundColor:'#fff',
          borderRadius:5,
          margin:4,
          padding:4,
          borderColor:'#96271f',
          borderWidth:0.5,
          shadowColor:'#96271f',
          shadowOpacity:0.3,
          shadowRadius: 0.4,
          },
          box1:{
            borderTopColor:'#000',
            borderTopWidth:1,
            backgroundColor:'#fff',
            paddingRight:'10%',
            paddingTop:'2%',
         },
         boxyy:{
          backgroundColor:'#fff',
         },
         boxCorrect:{
          borderTopColor:'#000',
          borderTopWidth:1,
          backgroundColor:'#008000',
          paddingRight:'10%',
          paddingTop:'2%'
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
            justifyContent:'space-evenly',
          },
          box53:{
            flex: 1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:5
          },
          box534:{
            borderTopColor:'#000',
            borderTopWidth:1,
            backgroundColor:'#fff',
          },
          box543:{
           marginTop:8
          },
          box12:{
            backgroundColor:'#fff',
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            paddingTop:'5%',
            paddingBottom:'5%'
        },
        box123:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-around',
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
        margin: 12,
        color:'#fff'
      },
      icon1:{
        marginTop:16,
        marginLeft:8
      },
      icon2:{
        marginTop:16,
        marginRight:8
      },
      centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      },
      centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
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
        height:'auto',
        backgroundColor:'#fff',
        padding:20,
        width:'100%',
        borderColor:'#96271f',
        borderWidth:0.5,
        shadowColor:'#96271f',
        shadowOpacity:0.3,
        shadowRadius: 0.4,
        alignContent:'center',
        alignItems:'center'
      },
      oops:{
        fontSize:20,
        textAlign:'center',
        color:'red',
        fontWeight:'800'
      },
      win:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
      },
      score:{
        textAlign:'center',
        fontSize:18,
        marginTop:5,
        fontWeight:'900'
      },
      scroll2:{
        padding: 10
      },
      buttonText:{
          color:'#fff',
          fontSize:18
      },
      congo:{
        fontSize:20,
        textAlign:'center',
        color:'green',
        fontWeight:'800'
       },
      correctScore:{
        fontSize:18,
        textAlign: 'center',
        color:'green',
        fontWeight:'800'
      },
      wrongScore:{
        fontSize:18,
        textAlign: 'center',
        color:'red',
        fontWeight:'800'
      },
      footerBox:{
        borderBottomColor:'#96271f',
        borderTopColor:'#008000',
        borderWidth:0.5,
        shadowColor:'#008000',
        shadowOpacity:0.3,
        shadowRadius: 0.4,
        backgroundColor:'#fff',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:'5%',
        paddingBottom:'5%',
        position: 'relative',
        bottom: 0
      },
      numberq:{
        textAlign:'center',
        fontSize:20,
        color: '#fff',
        fontWeight:'800'
      },
      numberbox:{
        alignContent:'flex-end',
        borderRadius:80,
        padding:8,
        width:40,
        backgroundColor: "#96271f",
      },
      scoreboard:{
        marginTop: 5,
        borderRadius:5,
        height:'auto',
        backgroundColor:'#fff',
        padding:4,
        width:'60%',
        borderColor:'#96271f',
        borderWidth:0.5,
        shadowColor:'#96271f',
        shadowOpacity:0.3,
        shadowRadius: 0.4,
      }
 })