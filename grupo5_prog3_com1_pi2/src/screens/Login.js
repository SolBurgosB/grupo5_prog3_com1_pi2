import React, { Component } from 'react';
import { View, Text, Pressable, TextInput } from "react-native";
import { auth } from "../firebase/config";
import firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            erroremail: "",
            errorpass: "",
            emailLoguin: "",
            noexiste: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => this.setState({ emailLoguin: user.email }))
    }

    onSubmit(email, password, emailLoguin) {
        console.log("Ingresando usuario: ", { email, password });
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => { this.props.navigation.navigate("HomeMenu") })
            .catch((error) => console.log("Hubo un error"))
        if (!email.includes("@")) {
            this.setState({ erroremail: "Email mal formateado" })
        }
        if (password.length <= 5) {
            this.setState({ errorpass: "La password debe tener una longitud mínima de 6 caracteres" })
        }
        if (emailLoguin !== email) {
            const user = auth.currentUser;
            this.setState({ noexiste: "Credenciales incorrectas" })
        }
    }

    render() {
        return (
            <View>
                <Text>Screen de Login</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>Ir a Register</Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text>Ir a página principal</Text>
                </Pressable>

                <Pressable>
                    <TextInput placeholder='Email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                    <Text>{this.state.erroremail}</Text>
                    <TextInput placeholder='Password' onChangeText={text => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} />
                    <Text>{this.state.errorpass}</Text>
                    <Text>{this.state.noexiste}</Text>
                    <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                        <Text>Ingresar</Text>
                    </Pressable>
                </Pressable>
            </View>
        )
    }
}