import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet, ActivityIndicator,StatusBar,ImageBackground } from 'react-native';
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
            <StatusBar backgroundColor = "#228B22" barStyle = "dark-content" hidden = {false}  translucent = {true} />  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Questions')}>
            <View style = {styles.box1} >
            <View style = {styles.box12}>
              <Image
              style={{width: 100, height: 100}} 
              source={require('./img/question.jpg')}
              />
            </View>
            <View style = {styles.box2}>
              <Text style = {styles.boxfont}>Banca delle domande</Text>
              <Text style = {styles.boxsubfont}>Elenco di domande e risposte e significato dei segnali stradali</Text>
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
            <Text style = {styles.boxfont}>Pratica</Text>
            <Text style = {styles.boxsubfont}>Metti alla prova le tue conoscenze senza preoccuparti del tempo</Text>
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
            <Text style = {styles.boxfont}>Esame</Text>
            <Text style = {styles.boxsubfont}>Il test legato al tempo e alle domande è esattamente lo stesso del test RTO effettivo</Text>
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
              <Text style = {styles.boxfont}>Segnali stradali</Text>
              <Text style = {styles.boxsubfont}>Elenco dei 
              significati dei segnali stradali</Text>
            </View>
            </View>
          </TouchableOpacity>
          </ScrollView>
          }
        </ScrollView>
      </ImageBackground> 
    );
  }
}
export default Home;

const styles = StyleSheet.create ({
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
        scroll:{
            padding: 10,
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
            // flex: 5, 
            flexWrap: 'wrap',
            // margin: 10,
            flexShrink: 1,
            fontSize: 15,
            color: '#000',
            textAlign: 'left',
            // marginTop: 5
          },
          box12:{
            display:'flex',
            flexDirection:'row',
        }
 })