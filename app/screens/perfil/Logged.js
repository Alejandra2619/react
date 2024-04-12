import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Toast from "react-native-easy-toast";
import firebase from "firebase/compat/app";
import InfoUsuario from "../../components/perfil/InfoUsuario";
import OpcionesCuenta from "../../components/perfil/OpcionesCuenta";
export default function Logged() {
  const [userInfo, setUserInfo] = useState(null);
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);
  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUsuario
          userInfo={userInfo}
          toastRef={toastRef}
          setCargando={setCargando}
        />
      )}
      <OpcionesCuenta
        userInfo={userInfo}
        toastRef={toastRef}
        setRealoadUserInfo={setRealoadUserInfo}
      />
      <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
});
