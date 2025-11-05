import React, { Component } from 'react'
import { Text, View, Pressable } from "react-native"
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
  }
  likear(docId) {
    db
      .collection("posts") //me fijo en los archivos de firebase, tmb del snapSHot (esta en home)
      .doc(docId) //lega por props de Home
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => this.setState({ liked: true }))
  } //para sacar un follower hago el método contrario
  deslikear(docId) {
    db
      .collection("posts") //me fijo en los archivos de firebase, tmb del snapSHot (esta en home)
      .doc(docId) //lega por props de Home
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => this.setState({ liked: false }))
  }
  render() {
    return (
      <View>
        <Text>{this.props.data.owner}</Text>
        <Text>{this.props.data.post}</Text> 
        {this.state.liked? <Pressable onPress={() => this.deslikear(this.props.id)}><Text>No Like</Text></Pressable>: <Pressable onPress={() => this.likear(this.props.id)}><Text>Like</Text></Pressable>}
      </View> //cuando ejecuto el motodo le paso el parámetro que quiero que llegue por props de Home
    )
  }
}