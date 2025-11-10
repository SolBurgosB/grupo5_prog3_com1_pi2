import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import Post from '../components/Post'

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
        comment: "",
        post: "",
        comments:[]
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
           comments: comentarios
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
    .then((res)=>this.props.navigation.navigate("HomePage"))
    .catch((error)=> console.log(error))
    }
    
  }
    render() {
    return (
      <View style={styles.container}>
        <Text>Crea tu comentario</Text>
        <Text>{this.props.route.params.owner}</Text>
        <Text>{this.props.route.params.post}</Text>
        <Text>{this.props.route.params.cantidadLikes}</Text>
        <FlatList data={this.state.comments} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (<Text> {item.data.owner}: {item.data.comment}</Text>)} />
        <View>
            <TextInput keyboardType='default' placeholder='Escribí tu comentario' onChangeText={(text)=>this.setState({comment: text})} value={this.state.comment}/> 
            <Pressable onPress={()=>this.crear(this.state.comment)}>
                <Text>Crear comentario</Text>
            </Pressable>        
        </View>
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