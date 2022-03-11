import React, { Component } from 'react';
import { ScrollView,TouchableOpacity,Image,Text, View,StyleSheet, ActivityIndicator,StatusBar } from 'react-native';
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
    <ScrollView  style = {styles.scroll}>
         {
           this.state.loader ?
            <ActivityIndicator size={100} color="green" marginTop={200} /> 
           :<ScrollView>
            <StatusBar backgroundColor = "#73df55" barStyle = "dark-content" hidden = {false}  translucent = {true} />  
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Questions')}>
           <View style = {styles.box1} >
           <View style = {styles.box12}>
             <Image
            style={{width: 50, height: 50}} 
            source={require('./img/study.png')}
           />
           <Text style = {styles.boxfont}>Banca delle domande</Text>
           </View>
           <View style = {styles.box2}>
           <Text style = {styles.boxsubfont}>Elenco di domande e risposte e significato dei segnali stradali</Text>
           </View>
           </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Practice')}>
           <View style = {styles.box1}>
           <View style = {styles.box12}>
           <Image
            style={{width: 50, height: 50}} 
            source={require('./img/testicon.png')}
           />
           <Text style = {styles.boxfont}>Pratica</Text>
           </View>
           <View style = {styles.box2}>
           <Text style = {styles.boxsubfont}>Metti alla prova le tue conoscenze senza preoccuparti del tempo</Text>
           </View>
           </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')}>
           <View style = {styles.box1} >
           <View style = {styles.box12}>
           <Image
            style={{width: 50, height: 50}} 
            source={require('./img/study.png')}
           />
           <Text style = {styles.boxfont}>Esame</Text>
           </View>
           <View style = {styles.box2}>
           <Text style = {styles.boxsubfont}>Il test legato al tempo e alle domande è esattamente lo stesso del test RTO effettivo</Text>
           </View>
           </View>    
         </TouchableOpacity>
          </ScrollView>
         }
          </ScrollView>   
    );
  }
}
export default Home;

const styles = StyleSheet.create ({
    box1:{
      marginTop: 10,
      borderRadius:5,
      height:150,
      backgroundColor:'#fff',
      padding:20,
      width:'100%'
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
            color: '#000',
            fontWeight:'800',
            margin: 10
          },
          boxsubfont:{
            fontSize: 15,
            color: '#000',
            textAlign: 'left',
            marginTop: 5
          },
          box12:{
            display:'flex',
            flexDirection:'row'
        }
 })