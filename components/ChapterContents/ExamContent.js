import React, { Component } from 'react';
import { Alert, ScrollView,TouchableOpacity,Text,Pressable, View,StyleSheet,Image,Modal,ActivityIndicator ,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class ExamContent extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      cardNo:'',
      cardNo2:'',
      translated:'',
      translated2:'',
    }
  }
  state = {
    chapters: [],
    noOfChapters: 0,
    modalVisible: false
   }
   setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    const { chapterId } = this.props.route.params;
    axios.get(`https://rto-patente.herokuapp.com/api/get-all-chapte-content/`+chapterId)
    .then(res => {
      if(res != null)
      {
        const chapters     = res.data;
        const noOfChapters = res.length;
        this.setState({ chapters, noOfChapters,loader:false});
      }
    }).catch(error => {
      Alert.alert("OOps ! Server issue");
      this.props.navigation.navigate('Home');
    });
  }
  englang(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated :response2.data , cardNo : index}));
         
        });
   
  }
  englang2(data,index){
    axios.get('https://rto-patente.herokuapp.com/api/show-token')
        .then(response =>{
          axios.post('https://rto-patente.herokuapp.com/api/translate-data-english', 
          {
            _token:response.data,
            data:data })
          .then(response2 => this.setState({ translated2 :response2.data , cardNo2 : index}));
         
        });
   
  }
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
  render() {
    const { modalVisible } = this.state;
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
      <ScrollView>
        {this.state.chapters.map((data, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('ExamBank',{chapterId:data.id , totalQ:data.noOfQuestions})}>
              <View style = {styles.box1} >
                <View style = {styles.box12}>
                  <Image source={require('../img/manual.jpg')}
                  style={{width: 80, height: 80}} />
                  <Text style = {styles.boxfont}>{data.chapterTitle}</Text>
                  {/* <Pressable onPress={() => this.props.navigation.navigate('PracticeBank',{chapterId:data.id , totalQ:data.noOfQuestions})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable> */}
                </View>
                <Text style = {styles.boxsubfont}> {this.state.cardNo == index ? this.state.translated : null } </Text>
                <View style={styles.centeredView}>
                <Modal
                   animationType="slide"
                   transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {
                   Alert.alert("Modal has been closed.");
                   this.setModalVisible(!modalVisible);
                 }}
                >
               <View style={styles.centeredView}>
               <View style={styles.modalView}>
               <Text style={styles.modalText}>{data.chapterTitle}</Text>
               <Pressable
                 style={[styles.button, styles.buttonClose]}
                 onPress={() => this.setModalVisible(!modalVisible)}
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
                </View>
                <View  style = {styles.box13} >
                <View  style = {styles.box16} >
                  <Text  style = {styles.boxsubfont} numberOfLines={4}>{data.chapterSubTitle}</Text>
                  <Text style = {styles.boxsubfont}> {this.state.cardNo2 == index ? this.state.translated2 : null } </Text>
                  </View>
                  <View >
                  <Pressable onPress={() => this.props.navigation.navigate('ExamBank',{chapterId:data.id , totalQ:data.noOfQuestions})}>
                    <Text style = {styles.boxfontcolor}><Icon name="angle-right" size={25} color="#4F7942"/></Text>
                  </Pressable>
                  </View>
                </View>
                <View  style = {styles.box12} >
                  <View  style = {styles.box14} >
                    <Text  style = {styles.boxbutton} >{data.noOfQuestions} Questions</Text>
                  </View>
                  <TouchableOpacity style = {styles.box14} onPress ={()=>this.englang(data.chapterTitle,index)} onPressIn={()=>this.englang2(data.chapterSubTitle,index)}>  
                    <Text style = {styles.boxbutton}>English</Text>  
                  </TouchableOpacity> 
                  <TouchableOpacity style = {styles.box14} onPress ={()=>this.benlang(data.chapterTitle,index)} onPressIn={()=>this.benlang2(data.chapterSubTitle,index)} >  
                    <Text style = {styles.boxbutton}>Bengali</Text>  
                  </TouchableOpacity> 
                </View>
              </View>
            </TouchableOpacity>
          );
        })}  
      </ScrollView>
      }
      </ScrollView>
      </ImageBackground>
    );
  }
}
export default ExamContent;

const styles = StyleSheet.create ({
  box1:{
    marginTop: 10,
    borderRadius:5,
  //   height:100,
    backgroundColor:'#fff',
    padding:15,
    width:'100%',
    borderColor:'#96271f',
    borderWidth:0.5,
    shadowColor:'#96271f',
    shadowOpacity:0.3,
    shadowRadius: 0.4,
      },
      scroll:{
          padding: 10,
          backgroundColor:'transparent'
          
       },
        boxfont:{
          flex: 1, 
          flexWrap: 'wrap',
          fontSize: 16,
          color: '#000',
          fontWeight:'800',
          margin: 10
        },
        boxsubfont:{
          fontSize: 16,
          textAlign: 'left',
          margin: 5,
          fontWeight: '600'
        },
        boxsmallfont:{
          fontSize: 12,
          textAlign: 'left',
          margin: 5,
          fontWeight: '900'
        },
        boxfontcolor:{
          fontSize: 16,
          fontWeight:'900',
          textAlign: 'right',
        },
        box12:{
          display:'flex',
          flexDirection:'row'
        },
        box13:{
          display:'flex',
          justifyContent:'space-between',
          flexDirection:'row'
        },
        box14:{
          borderRadius:100,
          padding:10,
          backgroundColor:'#4F7942',
          borderColor:'#4F7942',
          borderWidth:0.9,
          shadowColor:'#96271f',
          shadowOpacity:0.3,
          shadowRadius: 0.4
        },
        box16:{
          display:'flex',
          justifyContent:'flex-start',
          flexDirection:'row'
        },
        boxbutton:{
          fontSize:18,
          fontWeight:'800',
          textAlign:'center',
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
          marginBottom: 15,
          textAlign: "center"
        }
})