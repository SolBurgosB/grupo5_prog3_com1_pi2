import React, { Component } from 'react'
import { Text, View, Pressable } from "react-native"
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
  constructor(props) {
    super(props)
  }
  likear(docId) {
    db
      .collection("posts") 
      .doc(docId) 
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
  } 
  deslikear(docId) {
    db
      .collection("posts") 
      .doc(docId) 
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
  }

  render() {
    return (
      <View>
        <Text>{this.props.data.owner}</Text>
        <Text>{this.props.data.post}</Text>
        <Text>Cantidad de likes: {(this.props.data.likes|| [] ).length  }</Text>
        { (this.props.data.likes|| [] ).includes(auth.currentUser.email) ? <Pressable onPress={() => this.deslikear(this.props.id)}><Text>No Like</Text></Pressable> : <Pressable onPress={() => this.likear(this.props.id)} ><Text>Like</Text></Pressable>}
        <Pressable onPress={() => this.props.navigation.navigate("CommentsNavigation", {screen: "Comments", params: {id: this.props.id, post: this.props.data.post, owner: this.props.data.owner, cantidadLikes: (this.props.data.likes|| [] ).length }})}>
          <Text>Comentar</Text>
        </Pressable>
      </View> //cuando ejecuto el motodo le paso el parámetro que quiero que llegue por props de Home
    )
  }
}