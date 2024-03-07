import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { map, size, isEmpty, filter } from "lodash";
import { useNavigation } from "@react-navigation/native";

const db = firebase.firestore(firebaseApp);

export default function FormComentario({ toast }) {
    const { toastRef } = React.createRef();
    const [datos, setDatos] = useState(valoresDefault);

    const onChange = (e, type) => {
        setDatos({ ...datos, [type]: e.nativeEvent.text });
    };

    const onSubmit = async () => {
        if (isEmpty(datos.descripcionComentario)) {
            toastRef.current.show("No puedes dejar el campo de descripción vacío");
        } else {
            try {
                const fechaCreacion = new Date();
                const usuario = firebase.auth().currentUser;

                if (!usuario) {
                    toastRef.current.show("Usuario no autenticado. Inicia sesión para comentar.");
                    return;
                }

                await db.collection("comentarios").add({
                    fechaCreacion,
                    usuario: usuario.uid,
                    descripcionComentario: datos.descripcionComentario,
                });

                toastRef.current.show("Comentario registrado correctamente");
                setDatos(valoresDefault());
            } catch (error) {
                console.error("Error al registrar el comentario:", error);
                toastRef.current.show("No se pudo registrar el comentario");
            }
        }
    };

    

    const valoresDefault = () => {
        return {
            fechaCreacion: "",
            direccion: "",
            descripcionComentario: "",
        };
    };

    return (
        <View style={styles.formContainer}>
            
            <Input
                placeholder="Descripción del comentario"
                containerStyle={styles.textArea}
                multiline={true}
                onChange={(e) => onChange(e, "descripcionComentario")}
                value={datos.descripcionComentario}
            />

            
            <Button
                title="Registrar Comentario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
    },
    btn: {
        backgroundColor: "#996632",
    },
});


    