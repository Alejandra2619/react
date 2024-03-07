import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Restaurantes from "../screens/restaurantes/Restaurantes";
import AgregarRestaurante from '../screens/restaurantes/AgregarRestaurante';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Restaurantes" component={Restaurantes} options={{tittle:"Bienvenido a Restaurantes"}} />
            <Stack.Screen name="AgregarRestaurante" component={AgregarRestaurante} options={{tittle:"Agrega Restaurante"}} />
        </Stack.Navigator>
    );
}