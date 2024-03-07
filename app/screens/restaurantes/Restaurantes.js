import React,{ useState, useEffect } from "react";
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {View, Text, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {useNavigation} from "@react-navigation/native"
import AgregarRestaurantes from "./AgregarRestaurante";
const db =firebase.firestore(firebaseApp);

export default function Restaurantes() {
    const navegacion= useNavigation();
    const [usuario, setUsuario]=useState(null);
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((userInfo)=>{
         setUsuario(userInfo);
        });
    }, []);
    return(
    <View style={styles.vista}>
        <Text>Restaurantes!!</Text>
        { usuario &&(
        <Icon
         reverse
         type="material_community"
         name="add"
         color="#996632"
         containerStyle={styles.btn}
         onPress={() =>navegacion.navigate("AgregarRestaurante")}
        />
        )}
        </View>
        
        );
    }

    const styles = StyleSheet.create({
        vista:{
            flex:1,
            backgroundColor:"#FFFF",
        },
        btn:{
            position:"absolute",
            bottom:10,
            right:10,
        //Para IOS mostrará una sombra para el botón
            shadowColor:"black",
            shadowOffset:{width:2, height:2},
          shadowOpacity:0.5,
         }
        }) 
