import { Text, View, TextInput, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import Post from '../components/Post'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
        comment: "",
        post: "",
        comments:[], 
        loading: true
    }
  }
  componentDidMount(){
    const postrecuperado= this.props.route.params.id
        db.collection("comments")
       .where("post", "==", postrecuperado) 
       .onSnapshot((docs) => {
         let comentarios = []
         docs.forEach((doc) => { comentarios.push({ id: doc.id, data: doc.data() }) })
         this.setState({
           comments: comentarios,
           loading: false
         })
       }
       )
  }
  crear(paramcom){
    if(paramcom !== ""){
        db.collection("comments").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        comment: paramcom,
        post: this.props.route.params.id
        
    })
    .then(this.setState({comment: ""}))
    .catch((error)=> console.log(error))
    }
    
  }
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Creá tu comentario</Text>
        <Text style={styles.owner}>{this.props.route.params.owner}</Text>
        <Text style={styles.post}>{this.props.route.params.post}</Text>
        <Text style={styles.likes}> Cantidad de likes: {this.props.route.params.cantidadLikes}</Text>
        {this.state.loading ? <ActivityIndicator size="large" color="pink"/> : <FlatList style={styles.comentarios} data={this.state.comments} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (<Text style={styles.comentario}> {item.data.owner}: {item.data.comment}</Text>)} />}
        <View>
            <TextInput style={styles.campo} keyboardType='default' placeholder='Escribí tu comentario' onChangeText={(text)=>this.setState({comment: text})} value={this.state.comment}/> 
            <Pressable style={styles.boton} onPress={()=>this.crear(this.state.comment)}>
                <Text style={styles.textoboton}>Crear comentario</Text>
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
    padding: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
  },
  titulo: {
    color: "#C2185B",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  post: {
    backgroundColor: "#FFE6F2",     
    borderColor: "#FF8AC2",
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    fontSize:18,
    marginBottom: 15,
  },
  owner: {
    color: "#C2185B",
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    color: "#7A1B47",
    marginBottom: 6,
  },
  likes: {
    color: "#C2185B",
    fontSize: 13,
  },
  comentarios: {
    paddingBottom: 10,
  },
  comentario: {
    backgroundColor: "#FFF7FA",
    borderColor: "#FFB3D2",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  comwner: {
    color: "#C2185B",
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentText: {
    color: "#7A1B47",
    fontSize: 14,
  },
  inputSection: {
    marginTop: 10,
    backgroundColor: "#FFE6F2",
    borderRadius: 12,
    padding: 12,
  },
  campo: {
    borderColor: "#FF8AC2",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  boton: {
    backgroundColor: "#FF8AC2",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  textoboton: {
    color: "white",
    fontWeight: "bold",
  },
})
