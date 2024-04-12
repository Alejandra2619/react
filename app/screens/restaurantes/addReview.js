import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddReview(propiedades) {
    const { navigation, route } = propiedades;
    const { id, nombre } = route.params;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        navigation.setOptions({ title: nombre });
        console.log(nombre);
    }, []);

    const addRevew = () => {
        if (!rating) {
            toastRef.current.show("No has dado ninguna putuación");
        } else if (!title) {
            toastRef.current.show("El título es oblogatorio");
        } else if (!review) {
            toastRef.current.show("El comentario es obligatorio");
        } else {
            setIsLoading(true);
            const user = firebase.auth().currentUser;
            const datos = {
                idUser: user.uid,
                idRestaurante: id,
                title: title,
                review: review,
                rating: rating,
                createAt: new Date(),
            };
            db.collection("reviews")
                .add(datos)
                .then(() => {
                    updateRestaurante();
                })
                .catch(() => {
                    toastRef.current.show("Error al enviar la review");
                    setIsLoading(false);
                });
        }
    };
    const updateRestaurante = () => {
        const restauranteRef = db.collection("restaunrantes").doc(id);
        restauranteRef.get().then((response) => {
            const restauranteData = response.data();
            const ratingTotal = restauranteData.ratingTotal + rating;
            const votos = restauranteData.votos + 1;
            const ratingResult = ratingTotal / votos;
            restauranteRef
                .update({
                    rating: ratingResult,
                    ratingTotal,
                    votos,
                })
                .then(() => {
                    setIsLoading(false);
                    navigation.goBack();
                });
        });
    };

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pésimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={20}
                    onFinishRating={(value) => {
                        setRating(value);
                    }}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Título"
                    containerStyle={styles.input}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                />
                <Input
                    placeholder="Comentario..."
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    onChange={(e) => setReview(e.nativeEvent.text)}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addRevew}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2",
    },
    formReview: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40,
    },
    input: {
        marginBottom: 10,
    },

    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        width: "95%",
    },
    btn: {
        backgroundColor: "#996632",
    },
});