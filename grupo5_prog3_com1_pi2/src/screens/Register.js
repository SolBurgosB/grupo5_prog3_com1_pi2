import React, { Component } from 'react'
import { View, Pressable, Text, TextInput } from "react-native"
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            erroremail: "",
            errorpass:""
        }
    }

    onSubmit(email, username, password) {
        console.log("Creando usuario: ", { email, username, password });
        if (username.length > 3 && email.includes("@") && password.length > 5) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => { this.props.navigation.navigate("Login") })
                .catch((error) => console.log("Hubo un error"))
            if (!email.includes("@")) {
                this.setState({ erroremail: "Email mal formateado" })
            }
            if (password.length <= 5) {
                this.setState({ errorpass: "La password debe tener una longitud mínima de 6 caracteres" })
            }
        }
    }

    render() {
        return (
            <View>
                <Text>Screen de Register</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>Ir a Login</Text>
                </Pressable>
                <TextInput placeholder='Email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                <Text>{this.state.erroremail}</Text>
                <TextInput placeholder='Name' onChangeText={text => this.setState({ username: text })} value={this.state.username} />
                <TextInput placeholder='Password' onChangeText={text => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} />
                <Text>{this.state.errorpass}</Text>
                <Pressable onPress={() => this.onSubmit(this.state.email, this.state.username, this.state.password)}>
                    <Text>Registrarme</Text>
                </Pressable>
            </View>
        )
    }
}