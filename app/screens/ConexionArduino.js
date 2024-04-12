import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ConexionArduino() {
    const [encendido, setCambiar] = useState();
    const [textoBoton, setTexto] = useState("Recuperado Informacion");

    return (
        <View>
            <Button
                title={textoBoton}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => setCambiar(encendido ? 1 : 0)}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 20,
        width: "100%",
    },

    btn: {
        backgroundColor: "0A6ED3",
    }
})
