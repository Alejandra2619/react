import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Button, Rating } from "react-native-elements";
import { map } from "lodash";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore(firebaseApp);

function Review(propiedades) {
    const { id, nombre, title, review, rating, createAt } = propiedades.review;

    // Convertimos la fecha Timestamp de firebase a una fecha de JavaScript
    // Con una precisión de milisegundos.
    const createReview = new Date(createAt.seconds * 1000);

    const eliminar = () => {
        propiedades.eliminarReview(id);
    };

    return (
        <View style={styles.viewReview}>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDate}>
                    {/*Extraemos de la fecha los valores por separado */}
                    {createReview.getDate()}/{createReview.getMonth() + 1}/
                    {createReview.getFullYear()} - {createReview.getHours()}:
                    {createReview.getMinutes() < 10 ? "0" : ""}
                    {createReview.getMinutes()}
                </Text>
                <Icon
                    raised
                    name="trash"
                    type="font-awesome"
                    onPress={eliminar}
                />
            </View>
        </View>
    );
}

export default function Reviews(propiedades) {
    const { navigation, id, nombre } = propiedades;

    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            user ? setUserLogged(true) : setUserLogged(false);
        });

        const unsubscribe = db.collection("reviews")
            .where("idRestaurante", "==", id)
            .onSnapshot((snapshot) => {
                const resultReview = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultReview.push(data);
                });
                setReviews(resultReview);
            });

        return () => unsubscribe();
    }, [id]);

    const eliminarReview = (id) => {
        db.collection("reviews")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Comentario eliminado");
            })
            .catch((error) => {
                console.log("Error al eliminar el comentario" + error);
            });
    };

    const agregarReview = (nuevoReview) => {
        setReviews([...reviews, nuevoReview]);
    };

    return (
        <View>
            {userLogged ? (
                <Button
                    title="Escribe una opinión"
                    buttonStyle={styles.btnAddReview}
                    titleStyle={styles.btnTitleAddReview}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#0A6ED3",
                    }}
                    onPress={() =>
                        navigation.navigate("Agregar comentario", {
                            id: id,
                            nombre: nombre,
                            agregarReview: agregarReview
                        })
                    }
                />
            ) : (
                <View>
                    <Text
                        style={{ textAlign: "center", color: "#0A6ED3", padding: 20 }}
                        onPress={() => navigation.navigate("login")}
                    >
                        Para escribir un comentario es necesario estar logueado{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            pulsa AQUÍ para iniciar sesión
                        </Text>
                    </Text>
                </View>
            )}
            {map(reviews, (review, index) => (
                <Review key={index} review={review} eliminarReview={eliminarReview} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color: "#0A6ED3"
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#0A6ED3",
        borderBottomWidth: 1,
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start",
    },
    reviewTitle: {
        fontWeight: "bold",
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5,
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0,
    },
});