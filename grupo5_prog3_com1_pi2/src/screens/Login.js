import React, { Component } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            erroremail: "",
            errorpass: "",
            errorfirebase:"",
            emailLogin: "",
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.navigation.navigate("TabNavigation")
            }
        })
    }

    onSubmit(email, password, emailLogin) {
        console.log("Ingresando usuario: ", { email, password });
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => { this.props.navigation.navigate("TabNavigation", { screen: "HomePage" }) })
            .catch((error) => {
                    console.log(error)
                    if (error.code == "auth/internal-error") {
                        this.setState({errorfirebase: "No existe una cuenta con este mail o la contraseña es incorrecta"})
                    }
                })
        if (!email.includes("@")) {
            this.setState({ erroremail: "Email mal formateado" })
        }
        if (password.length <= 5) {
            this.setState({ errorpass: "La password debe tener una longitud mínima de 6 caracteres" })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <Pressable onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>Ir a Register</Text>
                </Pressable>

                <Pressable>
                    <TextInput placeholder='Email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                    <Text>{this.state.erroremail}</Text>
                    <TextInput placeholder='Password' onChangeText={text => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} />
                    <Text>{this.state.errorpass}</Text>
                    <Text>{this.state.errorfirebase}</Text>
                    <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                        <Text>Ingresar</Text>
                    </Pressable>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",

    }
})