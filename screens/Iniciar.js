import React, { Component } from "react";
import { Text, Button, StyleSheet, View } from "react-native";

export default function Iniciar({ navigation }) {
    return (
        <View>
            <Text>Inicio</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginBottom: 10
    },
    text: {
        fontSize: 20
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1
    }
});