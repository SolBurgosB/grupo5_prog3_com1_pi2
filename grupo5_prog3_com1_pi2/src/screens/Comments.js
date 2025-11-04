import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
        comments: ""
    }
  }
  crear(paramcom){
    if(paramcom !== ""){
        db.collection("comments").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        comment: paramcom
    })
    .then((res)=>this.props.navigation.navigate("HomePage"))
    .catch((error)=> console.log(error))
    }
    
  }
    render() {
    return (
      <View>
        <Text>Crea tu comentario</Text>
        <View>
            <TextInput keyboardType='default' placeholder='Comment' onChangeText={(text)=>this.setState({comment: text})} value={this.state.comment}/> 
            <Pressable onPress={()=>this.crear(this.state.comment)}>
                <Text>Crear comentario</Text>
            </Pressable>        
        </View>
      </View>
    )
  }
}
