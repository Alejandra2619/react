import React, {useRef} from "react";
import Toast from 'react-native-easy-toast';
import {View, Text, Image, StyleSheet} from "react-native";
import FormRegistro from "../../components/perfil/FormRegistro";

export default function Registrar() {
    const toastRef=useRef();
    return (
        <View>
            <Image
            source={require('../../../assets/img/usuario.png')}
            resizeMethod="auto"
            style={style.imagen}
            />
            <View style={style.formulario}>
                <FormRegistro toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    );
}

const style = StyleSheet.create({
    imagen:{
        height:100,
        width:100,
        alignSelf: 'center',
        marginBottom:30,
        marginTop:20,
    },
    formulario:{
        marginTop:10,
        marginLeft:40,
        marginRight:40,
    },
})