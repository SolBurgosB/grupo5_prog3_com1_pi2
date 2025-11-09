import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native'
import { db, auth } from "../firebase/config"
import Post from '../components/Post'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsrecuperados: []
    }
  }
  componentDidMount() {
    db.collection("posts")
    .orderBy("createdAt", "desc") //en vez de owner va la fecha de creación como figure en firebase
    .onSnapshot((docs) => {
      let posts = []
      docs.forEach((doc) => { posts.push({ id: doc.id, data: doc.data() }) })
      this.setState({
        postsrecuperados: posts
      })
    }
    )

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        <FlatList data={this.state.postsrecuperados} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={this.props.navigation} />} /> 
      </View>
    )
  }
}

const styles= StyleSheet({
  container: {
    flex: 1,
    width: "100%",
    
  }
})


