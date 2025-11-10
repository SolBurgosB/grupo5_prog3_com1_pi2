import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth } from "../firebase/config"
import firebase from 'firebase'

export default class CrearPost extends Component {
  constructor(props){
    super(props)
    this.state={
        post: "",
        error:"",
    }
  }
  crear(parampost){
    if(parampost == ""){
      this.setState({error: "Escribí tu post"})
    }
    else{
        db
        .collection("posts").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        post: parampost,
        likes:[]
    })
    .then((res)=>{
      
      this.props.navigation.navigate("CommentsNavigation", { screen: "HomePage"})})
    .catch((error)=> console.log(error))
    }
    
  }
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Creá tu post</Text>
        <View>
            <TextInput style={styles.campo} keyboardType='default' placeholder='Escribí tu Post' onChangeText={(text)=>this.setState({post: text})} value={this.state.post}/> 
            <Text style={styles.error}>{this.state.error}</Text>
            <Pressable style={styles.boton} onPress={()=>this.crear(this.state.post)}>
                <Text style={styles.textoboton}>Crear post</Text>
            </Pressable>        
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F6",   
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    color: "#C2185B",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  campo: {
    backgroundColor: "white",
    borderColor: "#FF8AC2",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#FF8AC2",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  textoboton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#D32F2F",
    fontSize: 12,
    marginBottom: 6,
  },
})