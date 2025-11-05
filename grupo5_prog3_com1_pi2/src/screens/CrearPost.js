import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from "../firebase/config"
import firebase from 'firebase'

export default class CrearPost extends Component {
  constructor(props){
    super(props)
    this.state={
        post: ""
    }
  }
  crear(parampost){
    if(parampost !== ""){
        db
        .collection("posts").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        post: parampost
    })
    .then((res)=>this.props.navigation.navigate("CommentsNavigation", { screen: "HomePage"}))
    .catch((error)=> console.log(error))
    }
    
  }
    render() {
    return (
      <View>
        <Text>Crea tu post</Text>
        <View>
            <TextInput keyboardType='default' placeholder='Post' onChangeText={(text)=>this.setState({post: text})} value={this.state.post}/> 
            <Pressable onPress={()=>this.crear(this.state.post)}>
                <Text>Crear post</Text>
            </Pressable>        
        </View>
      </View>
    )
  }
}