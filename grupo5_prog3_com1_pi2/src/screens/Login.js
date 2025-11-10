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
            errorfirebase: "",
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
                    this.setState({ errorfirebase: "No existe una cuenta con este mail o la contraseña es incorrecta" })
                }
            })
        if (!email.includes("@")) {
            this.setState({ erroremail: "Email mal formateado" })
        }
        if (email.length == 0) {
            this.setState({ erroremail: "Este campo es obligatorio" })
        }
        if (password.length == 0) {
            this.setState({ errorpass: "Este campo es obligatorio" })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Ingresá a tu cuenta</Text>
                <Pressable>
                    <TextInput style={styles.campo} placeholder='Email' onChangeText={text => this.setState({ email: text })} value={this.state.email} />
                    <Text style={styles.error}>{this.state.erroremail}</Text>
                    <TextInput style={styles.campo} placeholder='Contraseña' onChangeText={text => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} />
                    <Text style={styles.error}>{this.state.errorpass}</Text>
                    <Text style={styles.error}>{this.state.errorfirebase}</Text>
                    <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                        <Text style={styles.textoBoton}>Ingresar</Text>
                    </Pressable>
                </Pressable>
                <Pressable style={styles.registerBoton} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.register}>No tengo cuenta</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF0F6",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#C2185B",
        marginBottom: 25,
    },
    campo: {
        width: "100%",
        backgroundColor: "white",
        borderColor: "#FF8AC2",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: "#FF8AC2",
        borderRadius: 10,
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    textoBoton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    registerBoton: {
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    register: {
        color: "#C2185B",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    error: {
        color: "#D32F2F",
        fontSize: 12,
        marginBottom: 6,
    },
});
