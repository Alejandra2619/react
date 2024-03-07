import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cuentas from "../screens/perfil/Cuentas";
import Login from '../screens/perfil/Login';
import Registrar from '../screens/perfil/Registrar';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cuentas" component={Cuentas} options={{tittle:"Mi cuenta"}} />
            <Stack.Screen name="Login" component={Login} options={{tittle:"Iniciar sesión"}} />
            <Stack.Screen name="Registrar" component={Registrar} options={{tittle:"Registrate"}} />
        </Stack.Navigator>
    );
}