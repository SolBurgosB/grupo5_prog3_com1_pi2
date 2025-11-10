import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet} from "react-native"
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
      <View style={styles.container}>
        <Text style={styles.owner}>{this.props.data.owner}</Text>
        <Text style={styles.text}>{this.props.data.post}</Text>
        <Text style={styles.likes}>Cantidad de likes: {(this.props.data.likes|| [] ).length  }</Text>
        { (this.props.data.likes|| [] ).includes(auth.currentUser.email) ? <Pressable style={styles.boton} onPress={() => this.deslikear(this.props.id)}><Text style={styles.textoBoton}>No Like</Text></Pressable> : <Pressable style={styles.boton} onPress={() => this.likear(this.props.id)} ><Text style={styles.textoBoton}>Like</Text></Pressable>}
        <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate("CommentsNavigation", {screen: "Comments", params: {id: this.props.id, post: this.props.data.post, owner: this.props.data.owner, cantidadLikes: (this.props.data.likes|| [] ).length }})}>
          <Text style={styles.textoBoton}>Comentar</Text>
        </Pressable>
      </View> //cuando ejecuto el motodo le paso el parámetro que quiero que llegue por props de Home
    )
  }
}

const styles = StyleSheet({
    container: {
        flex: 1,
        width: "100%",
    },
    post: {
        backgroundColor: "#FFE6F2",
        borderColor: "#FF8AC2",       
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        margin: 12
    },
    owner: {
        color: "#C2185B",        
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 6
    },
    text: {
        color: "#7A1B47",
        fontSize: 16,
        marginBottom: 10
    },
    likes: {
        color: "#C2185B",
        fontSize: 13,
        marginBottom: 10
    },
    boton: {
        borderColor: "#C2185B",
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    textoBoton: {
        color: "#C2185B",
        fontWeight: "600"
    }
})