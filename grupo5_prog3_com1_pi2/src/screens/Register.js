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
            errorname: "",
            errormail: "",
            errorpass: ""
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
                        .catch((error) => console.log("Error guardando en Firestore:", error.message))
                })
                .catch((error) => console.log("Error creando usuario:", error.message))
        }
        else {
            if (username.length <= 3) {
                this.setState({ errorname: "El nombre es corto" })
            }
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
                <Text>Register</Text>
                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Ya tengo cuenta </Text>
                </Pressable>
                <View>
                    <TextInput keyboardType='default' placeholder='Username' onChangeText={(text) => this.setState({ username: text })} value={this.state.username} />
                    <Text>{this.state.errorname}</Text>
                    <TextInput keyboardType='email-address' placeholder='Email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
                    <Text>{this.state.errormail}</Text>
                    <TextInput keyboardType='default' placeholder='Password' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
                    <Text>{this.state.errorpass}</Text>
                    <Pressable onPress={() => this.submit(this.state.username, this.state.email, this.state.password)}>
                        <Text>Registrarme</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet({
    container: {
        flex: 1,
        width: "100%",
    },
})
