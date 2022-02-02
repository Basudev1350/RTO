import React, { Component } from 'react'  
import {  
    View,StyleSheet,Text,ActivityIndicator
} from 'react-native'  
import {WebView} from 'react-native-webview'  
  
export default class Chapter extends Component {  
    constructor(){
        super();
        this.state={
          loader:true
        }
      }
      componentDidMount(){
        setTimeout(()=>{
          this.setState({loader:false})
        },3000)
      }
    render() {  
        return (  
            <View style = {styles.container}>
            {
            this.state.loader ?
            <ActivityIndicator size={100} color="green" marginTop={200} /> :
            <View style = {styles.container}>  
            <Text style = {styles.font}>Lorem Ipsum Lorem Ipsum</Text>
            <Text style = {styles.subfont}>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</Text>
                <WebView  
                    source = {{ uri:'https://reactnative.dev/' }}  
                    marginTop={20}
                />  
            </View> 
             }
             </View>    
        )  
    }  
}  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    }  ,
    font:{
        textAlign:'center',
        fontSize:25,
        marginTop:10
    },
    subfont:{
        textAlign:'center',
        fontSize:15,
        marginTop:10
    }
})  
