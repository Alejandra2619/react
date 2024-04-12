import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CarouselImagenes from "../../components/CarouselImagenes";
import { Rating, ListItem, Icon } from "react-native-elements";
import Reviews from "../../components/restaurantes/Reviews";
import { useFocusEffect } from "@react-navigation/native";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurante(propiedades) {
    const { navigation, route } = propiedades;
    const { id, nombre } = route.params;
    const [restaurante, setRestaurante] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        navigation.setOptions({ title: nombre });
    }, []);

    useEffect(() => {
        db.collection("restaunrantes")
            .doc(id)
            .get()
            .then((resp) => {
                const datos = resp.data();
                datos.id = resp.id;
                setRestaurante(datos);
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            db.collection("reviews")
                .where("idRestaurante", "==", id)
                .onSnapshot((snapshot) => {
                    const arrReviews = [];
                    let totalRating = 0;
                    snapshot.forEach((doc) => {
                        const review = doc.data();
                        review.id = doc.id;
                        arrReviews.push(review);
                        totalRating += review.rating;
                    });
                    setReviews(arrReviews);
                    const averageRating =
                        arrReviews.length > 0 ? totalRating / arrReviews.length : 0;
                    setRating(averageRating);
                });
        }, [id])
    );

    return (
        <View style={styles.body}>
            {restaurante ? (
                <ScrollView>
                    <CarouselImagenes
                        arrayImages={restaurante.imagenes}
                        height={250}
                        width={screenWidth}
                    />
                    <Informacion
                        nombre={restaurante.nombre}
                        direccion={restaurante.direccion}
                        descripcion={restaurante.descripcion}
                        rating={rating}
                    />
                    <Reviews
                        navigation={navigation}
                        id={restaurante.id}
                        nombre={restaurante.nombre}
                        reviews={reviews}
                    />
                </ScrollView>
            ) : (
                <View style={styles.restaurantees}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Cargando Restaurante</Text>
                </View>
            )}
        </View>
    );
}

function Informacion({ nombre, direccion, descripcion, rating }) {
    const listaItems = [
        {
            text: direccion,
            iconName: "google-maps",
            iconType: "material-community",
            action: null,
        },
        {
            text: "443 1893456",
            iconName: "phone",
            iconType: "material-community",
            action: null,
        },
        {
            text: "mail@gmail.com",
            iconName: "at",
            iconType: "material-community",
            action: null,
        },
    ];

    return (
        <View style={styles.viewRestaurante}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.nombre}>{nombre}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <View>
                {listaItems.map((item, index) => (
                    <ListItem key={index} containerStyle={styles.listaInfo}>
                        <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
    },
    restaurantees: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    viewRestaurante: {
        padding: 15,
    },
    nombre: {
        fontSize: 20,
        fontWeight: "bold",
    },
    descripcion: {
        marginTop: 5,
        color: "grey",
    },
    rating: {
        position: "absolute",
        right: 0,
    },
    listaInfo: {
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
    },
});
