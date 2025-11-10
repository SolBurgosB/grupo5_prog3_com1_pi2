import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { auth, db } from "../firebase/config"


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            errormail: "",
            errorpass: "",
            errorfirebase: ""
        }
    }
    submit(username, email, password) {
        if (username.length > 3 && email.includes("@") && password.length > 5) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection("users").add({
                        owner: auth.currentUser.email,
                        email: email,
                        username: username,
                        createdAt: Date.now()
                    })
                        .then(() => this.props.navigation.navigate("Login"))
                        .catch((error) => console.log("Error guardando en Firestore:"))
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code == "auth/email-already-in-use") {
                        this.setState({errorfirebase: "El mail ya está en uso"})
                    }
                })
        }
        else {
            if (!email.includes("@")) {
                this.setState({ errormail: "El mail está mal" })
            }
            if (password.length <= 5) {
                this.setState({ errorpass: "La constraseña es corta" })
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.app}>¡Bienvenidos!</Text>
                <Text style={styles.titulo}>Creá tu cuenta</Text>
                
                <View>
                    <TextInput style={styles.campo} keyboardType='default' placeholder='Username' onChangeText={(text) => this.setState({ username: text })} value={this.state.username} />
                    <TextInput style={styles.campo} keyboardType='email-address' placeholder='Email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
                    <Text style={styles.error}>{this.state.errormail}</Text>
                    <TextInput style={styles.campo}keyboardType='default' placeholder='Password' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
                    <Text style={styles.error}>{this.state.errorpass}</Text>
                    <Text style={styles.error}>{this.state.errorfirebase}</Text>
                    <Pressable style={styles.registrarseboton}onPress={() => this.submit(this.state.username, this.state.email, this.state.password)}>
                        <Text style={styles.registrarsetexto}>Registrarme</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.loginboton} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.login}>Ya tengo cuenta </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF0F6",
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    app: {
      textAlign: "center",
      color: "#C2185B",
      fontSize: 26,
      fontWeight: "800",
      marginBottom: 4,
    },
    titulo: {
      textAlign: "center",
      color: "#C2185B",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 4,
    },
    campo: {
      backgroundColor: "white",
      borderColor: "#FF8AC2",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    registrarseboton: {
      backgroundColor: "#FF8AC2",
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 6,
      width: "100%"
    },
    registrarsetexto: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    loginboton: { alignItems: "center", marginTop: 10, width: "100%" },
    login: {
      color: "#C2185B",
      fontSize: 14,
    },
    error: {
      color: "#D32F2F",
      fontSize: 12,
      marginBottom: 6,
    },
  })  
