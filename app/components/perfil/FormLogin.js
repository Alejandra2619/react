import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import firebase from 'firebase/compat/app';
import { StyleSheet, View, Text } from "react-native";
import {Input, Icon, Button } from "react-native-elements";
import {validarEmail} from "../../utils/validaciones";
import { isEmpty} from "lodash";


export default function FormLogin(toast){
    const navigation = useNavigation();
    const {toastRef} = toast;
    const [mostrar3, setMostrar3]=useState(false);
    const [datos, setDatos]=useState(valoresDefault);
    const onSubmit= () => {
        if(isEmpty(datos.email) || isEmpty(datos.password)||
        isEmpty(datos.password)) {
            toastRef.current.show("No puedes dejar campos vacios");
        }
        else if(!validarEmail(datos.email)) {
            toastRef.current.show("Estructura del email incorrecta");
        }
        else{
            firebase.auth().signInWithEmailAndPassword(datos.email,datos.password)
            .then(respuesta=>{
                navigation.navigate("Cuentas");
            })
            .catch(err=>{
                toastRef.current.show("No es posible iniciar sesion, verifica tus datos");
            });
        }
    };
    const onChange = (e, type)=>{
        setDatos({...datos, [type]:e.nativeEvent.text});
    }
    return(
    <View style={StyleSheet.formContainer}>
        <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
            <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
            />
        }
        />
        <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={mostrar3?false:true}
        rightIcon={
            <Icon
            type="material-community-icon"
            name={mostrar3?"visibility":"visibility-off"}
            iconStyle={styles.icono}
            onPress={()=>setMostrar3(!mostrar3)}
            />
        }

        />
        <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={()=> onSubmit()}
        />
    </View>
)}

function valoresDefault(){
    return{
        email:"",
        password:"",
    };
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
    },
    inputForm:{
        width:"100%",
        marginTop:20,
    },
    btnContainer:{
        marginTop:20,
        width:"100%",
    },
    btn:{
        backgroundColor:"#996632",
    },
    icono:{
        color:"#c1c1c1"
    }
})