import React, { useState, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import Toast from "react-native-easy-toast";
import { isEmpty } from "lodash";

const db = firebase.firestore(firebaseApp);
export default function Comentarios() {
  const toastRef = useRef();
  const [datos, setDatos] = useState(valoresDefault);

  const onSubmit = () => {
    console.log(datos);
    if (isEmpty(datos.comentario)) {
      toastRef.current.show("No puedes dejar campos vacíos");
      return;
    } else {
      db.collection("comentarios")
        .add({
          comentario: datos.comentario,
          creado: new Date(),
          creadoPor: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
        })
        .then(() => {
          toastRef.current.show("Comentario Registrado");
          console.log(comentarioData);
        })
        .catch(() => {
          toastRef.current.show("No se pudo registrar el comentario");
        });

    }

  };

  function valoresDefault() {
    return {
      comentario: "",
    };
  }

  const onChange = (e) => {
    setDatos({ ...datos, comentario: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>

      <Text style={styles.titulo}>Comentarios</Text>
      <Input
        placeholder="Comentario"
        containerStyle={styles.textArea}
        multiline={true}
        onChange={(e) => onChange(e, "comentario")}
      />
      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => onSubmit()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#996632",
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
});