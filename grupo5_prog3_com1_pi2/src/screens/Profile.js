import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { db, auth } from "../firebase/config"
import Post from '../components/Post'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsrecuperados: [],
      users: [],
      loading: true
    }
  }
  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = []
        docs.forEach((doc) => { posts.push({ id: doc.id, data: doc.data() }) })
        this.setState({
          postsrecuperados: posts,
          loading: false
        })
      }
      )
       db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let usuarios = []
        docs.forEach((doc) => { usuarios.push({ id: doc.id, data: doc.data() }) })
        this.setState({
          users: usuarios
        })
        console.log(usuarios)
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
      <View style={styles.container}>
        {this.state.users.length > 0 ? <Text>{this.state.users[0].data.username}</Text> : <Text> </Text> }
        <Text>{auth.currentUser.email}</Text>
        {this.state.loading ? <ActivityIndicator size="large" color="pink"/> :<FlatList data={this.state.postsrecuperados} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post data={item.data} id={item.id} />} />}
        <Pressable onPress={() => this.logout()}>
          <Text>Cerrar Sesión</Text>
        </Pressable>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F6",  
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 70,           
  },
})