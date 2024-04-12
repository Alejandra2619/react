import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default function InfoUsuario(propiedades) {
  const {
    userInfo: { uid, displayName, email },
    toastRef,
    setCargando,
  } = propiedades;

  const userInfo = firebase.auth().currentUser;
  const photoURL = userInfo.photoURL;

  const cambiarAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      toastRef.current.show("Debes permitir el acceso a la galeria", 4000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      console.log("Resultado completo de ImagePicker: ", result);  // Imprimir resultado completo de ImagePicker

      if (result.canceled) {
        toastRef.current.show("Has cerrado la selección de imágenes");
      } else {
        const imageUri = result.assets[0].uri;
        console.log("URI de la imagen: ", imageUri);  // Imprimir URI de la imagen
        subirImagen(imageUri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch(error => {
            console.log(error)
            toastRef.current.show("Error al actualizar el avatar.");
          });
      }
    }
  };

  const subirImagen = async (uri) => {
    setCargando(true);
    toastRef.current.show("Realizando cambios ...");
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("Blob de la imagen: ", blob);
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        firebase.auth().currentUser.reload();
        setCargando(false);
      })
      .catch(() => {
        toastRef.current.show("Error al actualizar el avatar.");
      });

  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        onPress={() => cambiarAvatar()}
        style={styles.userInfoAvatar}
        source={
          photoURL ? { uri: photoURL } : { uri: '../../../assets/img/avatar-default.jpeg' }
        }
      >
        <Avatar.Accessory size={24} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
    width: 70,
    height: 70,
    marginRight: 10,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});