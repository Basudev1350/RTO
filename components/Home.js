import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet, ActivityIndicator,StatusBar,ImageBackground,Picker } from 'react-native';
import {strings} from './language/Localization';
class Home extends Component {
  constructor(){
    super();
    this.state={
      loader:true,
      errorMessage: '',
      location: {}
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loader:false})
    },3000)
  }
  overLang(){
    strings.setLanguage('ben');
    this.setState({});
  }
  engLang(){
    strings.setLanguage('eng');
    this.setState({});
  }
  itLang(){
    strings.setLanguage('it');
    this.setState({});
  }
  render() {
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
          source={require('./img/bg.jpg')}
        >
        <ScrollView  style = {styles.scroll}>
          {
            this.state.loader ?
            <ActivityIndicator size={100} color="green" marginTop={200} /> 
            :<ScrollView>
            <StatusBar backgroundColor = "#008b00" barStyle = "white" hidden = {false}  translucent = {true} />  
             <View style={styles.box}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Questions')}>
            <View style = {styles.box1} >
            <View style = {styles.box12}>
              <Image
              style={{width: 100, height: 100}} 
              source={require('./img/question.jpg')}
              />
            </View>
            <View style = {styles.box2}>
              <Text style = {styles.boxfont}>{strings.banca}</Text>
              <Text style = {styles.boxsubfont}>{strings.bancasubtitle}</Text>
            </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Practice')}>
            <View style = {styles.box1}>
            <View style = {styles.box12}>
            <Image
              style={{width: 100, height: 100}} 
              source={require('./img/practice.jpg')}
            />
            </View>
            <View style = {styles.box2}>
            <Text style = {styles.boxfont}>{strings.pratica}</Text>
            <Text style = {styles.boxsubfont}>{strings.praticasubtitle}</Text>
            </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')}>
            <View style = {styles.box1} >
            <View style = {styles.box12}>
            <Image
            style={{width: 100, height: 100}} 
            source={require('./img/exam.jpg')}
            />
            </View>
            <View style = {styles.box2}>
            <Text style = {styles.boxfont}>{strings.Esame}</Text>
            <Text style = {styles.boxsubfont}>{strings.Esamesubtitle}</Text>
            </View>
            </View>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signal')}>
            <View style = {styles.box1} >
            <View style = {styles.box12}>
              <Image
                style={{width: 100, height: 100}} 
                source={require('./img/signal.jpg')}
              />
            </View>
            <View style = {styles.box2}>
              <Text style = {styles.boxfont}>{strings.Segnali}</Text>
              <Text style = {styles.boxsubfont}>{strings.Segnalisubtitle}</Text>
            </View>
            </View>
            </TouchableOpacity>
            </View>
            <View style = {styles.box123} >
            <TouchableOpacity onPress={() => {this.overLang()}}>
            <View style = {styles.box12}>
            <View style = {styles.box12}>
            <Image
                style={{width: 40, height: 40}} 
                source={require('../assets/googletranslate.png')}
              />
            </View>
            <View style = {styles.box12}>
             
                <Text style = {styles.boxsubfont2}>বাংলা</Text>
            
            </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.engLang()}}>
            <View style = {styles.box12}>
            <View style = {styles.box12}>
            <Image
                style={{width: 40, height: 40}} 
                source={require('../assets/googletranslate.png')}
              />
            </View>
            <View style = {styles.box12}>
                <Text style = {styles.boxsubfont2}>English</Text>
            </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.itLang()}}>
            <View style = {styles.box12}>
            <View style = {styles.box12}>
            <Image
                style={{width: 40, height: 40}} 
                source={require('../assets/googletranslate.png')}
              />
            </View>
            <View style = {styles.box12}>
                <Text style = {styles.boxsubfont2}>Italia</Text>
            </View>
            </View>
            </TouchableOpacity>
            </View>
          </ScrollView>
          }
        </ScrollView>
      </ImageBackground> 
    );
  }
}
export default Home;

const styles = StyleSheet.create ({
  box:{
    padding: 10
  },
    box1:{
      display:'flex',
      flexDirection:'row',
      flex:2,
      marginTop: 10,
      borderRadius:5,
      borderColor:'#96271f',
      borderWidth:0.5,
      shadowColor:'#96271f',
      shadowOpacity:0.3,
      shadowRadius: 0.4,
      height:110,
      backgroundColor:'#fff',
      padding:4,
      alignContent:'center',
      width:'100%'
        },
        box123:{
          display:'flex',
          flexDirection:'row',
          marginTop: 5,
          backgroundColor:'#ff735b',
          paddingTop:10,
          paddingBottom:10,
          justifyContent:'space-around',
          flex: 1,
          marginBottom:0,
          marginTop:'12%',
        },
        scroll:{
            // padding: 10,
            backgroundColor:'transparent',
         },
         box2:{
          display:'flex',
          flexDirection:'column',
          flex:1,
          alignContent:'center'
          },
          boxfont:{
            fontSize: 20,
            color: '#228b22',
            fontWeight:'800',
            margin: 5
          },
          boxsubfont:{
            padding: 4,
            flexWrap: 'wrap',
            flexShrink: 1,
            fontSize: 15,
            color: '#000',
            textAlign: 'left',
          },
          boxsubfont2:{
            padding: 4,
            flexWrap: 'wrap',
            flexShrink: 1,
            fontSize: 18,
            color: '#fff',
            textAlign: 'left',
          },
          box12:{
            display:'flex',
            flexDirection:'row',
        }
 })