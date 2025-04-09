import React, { Component } from "react";
import { Text, Button, StyleSheet, View } from "react-native";

export default function Home({ navigation }) {
    return (
        <View>
            <Text>Home Page</Text>
            <Button title="Go to Iniciar" onPress={() => navigation.navigate('Iniciar')} />
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