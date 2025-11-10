import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, ActivityIndicator, Image } from 'react-native'
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
        <Text style={styles.titulo}>Mi perfil</Text>
        {this.state.users.length > 0 ? <Text style={styles.usuario}>{this.state.users[0].data.username}</Text> : <Text> </Text>}
        <Text style={styles.mail}>{auth.currentUser.email}</Text>

        {this.state.loading ?
          (<ActivityIndicator size="large" color="pink" />)
          :
          (this.state.postsrecuperados.length > 0 ?
            (<FlatList style={styles.lista} data={this.state.postsrecuperados} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (<Post style={styles.post} data={item.data} id={item.id} navigation={this.props.navigation} />)} />)
            :
            (<Text style={styles.mail}>No hay ningún post</Text>,
            <Image source={require("../../assets/caratristee.jpg")} resizeMode="center" style={styles.imagen} />
            )
          )
        }
        <Pressable style={styles.boton} onPress={() => this.logout()}>
          <Text style={styles.textoboton}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F6",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  titulo: {
    color: "#C2185B",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  usuario: {
    color: "#C2185B",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },

  mail: {
    color: "#7A1B47",
    fontSize: 14,
    marginBottom: 4,
  },

  imagen: {
    width: 150,      
  height: 150,   
  marginTop: 20,
  marginBottom: 10,
  alignSelf: "center",
  },

  boton: {
    backgroundColor: "#FF8AC2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 20,
    alignSelf: "center"
  },
  textoboton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
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
  lista:{
    width: "100%",
  }
})