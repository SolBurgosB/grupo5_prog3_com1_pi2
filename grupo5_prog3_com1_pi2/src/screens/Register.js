import React, { Component } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import firebase from "firebase"
import { auth } from '../firebase/config'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            errorusename: "",
            errormail: "",
            errorpass: ""
        }
    }
    submit(username, email, password) {
        console.log("Creando usuarios con los valores", { username, email, password })
        if (
            username.length > 3 &&
            email.includes("@") &&
            password.length > 5
        ) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    this.props.navigation.navigate("TabNavigator")
                })
                .catch((error) => console.log("Error en la creación del usuario", error))

            this.props.navigation.navigate("HomeMenu")
        }
        else {
            if (username.length <= 3) { this.setState({ errorusername: "El usuario debe tener más de tres caracteres" }) }
            if (!email.includes("@")) { this.setState({ errormail: "El mail debe incluir @" }) }
            if (password.length <= 5) { this.setState({ errorpass: "La contraseña debe tener más de 5 caracteres" }) }
        }
    }
    render() {
        return (
            <View>
                <Text>Pantalla Register</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Username'
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Email'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='Password'
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Pressable onPress={() => this.submit(this.state.username, this.state.email, this.state.password)}>
                        <Text>Enviar Registro</Text>
                    </Pressable>
                    <Text>{this.state.error}</Text>
                </View>
                <Pressable onPress={() => this.props.navigation.navigate("Login")}>
                    <Text>Ir a Pantalla Login</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "red"
    }
})