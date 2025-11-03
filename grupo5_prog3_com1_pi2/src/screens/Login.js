import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            error: "",
        }
    }
    submit(email, password) {
        if (email.includes("@") && password.length > 5) {
            auth.signInWithEmailAndPassword(email, password)
                .then((user) => this.props.navigation.navigate("HomeMenu"))
                .catch((error) => {
                    this.setState({ error: error.message })
                    console.log("Error de Firebase:", error.message)
                })
        }
    }
    render() {
        return (
            <View>
                <Text>Login</Text>
                <Pressable onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>No tengo cuenta</Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')}>
                    <Text>Entrar en la app</Text>
                </Pressable>
                <View>
                    <TextInput keyboardType='email-address' placeholder='email' onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
                    <TextInput keyboardType='default' placeholder='password' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
                    <Text>{this.state.error}</Text>
                    <Pressable onPress={() => this.submit(this.state.email, this.state.password)}>
                        <Text>Login</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}