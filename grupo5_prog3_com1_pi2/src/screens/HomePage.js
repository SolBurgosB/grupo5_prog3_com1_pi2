import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { db, auth } from "../firebase/config"
import Post from '../components/Post'

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsrecuperados: [],
      loading: true
    }
  }
  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc") //en vez de owner va la fecha de creación como figure en firebase
      .onSnapshot((docs) => {
        let posts = []
        docs.forEach((doc) => { posts.push({ id: doc.id, data: doc.data() }) })
        this.setState({
          postsrecuperados: posts,
          loading: false
        })
      }
      )

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Página principal</Text>
        {this.state.loading ? <ActivityIndicator size="large" color="pink" /> : <FlatList data={this.state.postsrecuperados} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post style={styles.post} data={item.data} id={item.id} navigation={this.props.navigation} />} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F6",
    paddingTop: 12,
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  titulo: {
    color: "#C2185B",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  lista: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  post: {
    backgroundColor: "#FFE6F2",
    borderColor: "#FF8AC2",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    margin: 12,
    width: "45%",
  },
});



