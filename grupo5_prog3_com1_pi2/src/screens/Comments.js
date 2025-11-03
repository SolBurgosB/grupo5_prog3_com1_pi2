import React, { Component } from 'react'
import {Text, View, Pressable} from "react-native"
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class Tweet extends Component {
  constructor(props){
        super(props)
        this.state={
            following: false
        }
    }
    agregarFollow(docId){
        db
        .collection("tweets") //me fijo en los archivos de firebase, tmb del snapSHot (esta en home)
        .doc(docId) //lega por props de Home
        .update({
            followers: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>this.state({following:true}))
    } //para sacar un follower hago el método contrario
    sacarFollow(docId){
        db
        .collection("tweets") //me fijo en los archivos de firebase, tmb del snapSHot (esta en home)
        .doc(docId) //lega por props de Home
        .update({
            followers: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>this.state({following:false}))
    }
    render() {
    return (
      <View>
        <Text>{this.props.data.tweet}</Text>
        {this.state.following? <Pressable onPress={()=>this.agregarFollow(this.props.id)}><Text>Agregar a favoritos</Text></Pressable> :  <Pressable onPress={()=>this.sacarFollow(this.props.id)}><Text>Sacar de favoritos</Text></Pressable>}
        
      </View> //cuando ejecuto el motodo le paso el parámetro que quiero que llegue por props de Home
    )
  }
}
