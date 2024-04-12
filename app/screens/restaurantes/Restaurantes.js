import React, { useState, useEffect, useCallback } from "react";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AgregarRestaurantes from "./AgregarRestaurante";
import ListaRestaurantes from "../../components/restaurantes/ListaRestaurantes";
const db = firebase.firestore(firebaseApp);

export default function Restaurantes() {
    const navegacion = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [restaurantes, setRestaurantes] = useState([]);
    const [totalRes, setTotalRes] = useState(0);
    const [puntero, setPuntero] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUsuario(userInfo);
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            db.collection("restaunrantes").get()
                .then((res) => {
                    setTotalRes(res.size);
                });

            const arrRestaurantes = [];
            db.collection("restaunrantes").orderBy("creado", "desc").limit(10).get()
                .then((res) => {
                    setPuntero(res.docs[res.docs.length - 1]);
                    res.forEach((doc) => {

                        const restaurante = doc.data();

                        restaurante.id = doc.id;

                        arrRestaurantes.push(restaurante);

                    });
                    setRestaurantes(arrRestaurantes);
                });

        }, [])
    );


    return (
        <View style={styles.vista}>
            <ListaRestaurantes restaurantes={restaurantes} />
            {usuario && (
                <Icon
                    reverse
                    type="material_community"
                    name="add"
                    color="#996632"
                    containerStyle={styles.btn}
                    onPress={() => navegacion.navigate("AgregarRestaurante")}
                />
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    vista: {
        flex: 1,
        backgroundColor: "#FFFF",
    },
    btn: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    }
}) 
