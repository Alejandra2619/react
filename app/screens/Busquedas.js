import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { FireSQL } from "firesql";

const db = firebase.firestore(firebaseApp);
const fireSQL = new FireSQL(db, { includeId: "id" });
export default function Busquedas(propiedades) {
    const { navigation } = propiedades;
    const [search, setSearch] = useState("");
    const [restaurantes, setRestaurantes] = useState([]);

    useEffect(() => {

        if (search) {
            fireSQL
                .query(`SELECT * FROM restaunrantes WHERE nombre LIKE '${search}%'`)
                .then((response) => {
                    setRestaurantes(response);
                });
        }

    }, [search]);

    return (
        <View>

            <SearchBar
                placeholder="Busca una restaurante..."
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />

            {restaurantes.length === 0 ? (
                <NoFound />
            ) : (
                <FlatList
                    data={restaurantes}
                    renderItem={(restaurante) => (
                        <Restaurante restaurante={restaurante} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
}

function NoFound() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../../assets/img/sin-resultados.png")}
                resizeMode="cover"
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

function Restaurante(propiedades) {
    const { restaurante, navigation } = propiedades;
    const { id, nombre, imagenes } = restaurante.item;
    return (
        <ListItem onPress={() => navigation.navigate("Restaurante", { id, nombre })}>
            <Avatar source={
                imagenes[0] ? { uri: imagenes[0] } :
                    require('../../assets/img/no-encontrada.png')
            } />
            <ListItem.Content>
                <ListItem.Title>{nombre}</ListItem.Title>
            </ListItem.Content>
            <Icon type="material-community" name="chevron-right" />
        </ListItem>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,
    },
});