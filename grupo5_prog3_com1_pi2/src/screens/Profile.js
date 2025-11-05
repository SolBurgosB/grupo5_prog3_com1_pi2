import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native'
import { db, auth } from "../firebase/config"
import Post from '../components/Post'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsrecuperados: []
    }
  }
  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .orderBy("owner", "desc")
      .onSnapshot((docs) => {
        let posts = []
        docs.forEach((doc) => { posts.push({ id: doc.id, data: doc.data() }) })
        this.setState({
          postsrecuperados: posts
        })
      }
      )
      console.log(auth.currentUser.email);
      
  }
  logout() {
  auth
    .signOut()
    .then(() => {
      this.props.navigation.navigate("Login")
    })
    .catch((error) => {
      console.log(error)
    });
}


  render() {
    return (
      <View>
        <Text>{auth.currentUser.username}</Text>
        <Text>{auth.currentUser.email}</Text>
        <FlatList data={this.state.postsrecuperados} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post data={item.data} id={item.id} />} />
        <Pressable onPress={() => this.logout()}>
          <Text>Cerrar Sesión</Text>
        </Pressable>
      </View>
    )
  }
}
