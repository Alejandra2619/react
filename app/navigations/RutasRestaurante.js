import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Restaurantes from "../screens/restaurantes/Restaurantes";
import AgregarRestaurante from '../screens/restaurantes/AgregarRestaurante';
import Restaurante from '../screens/restaurantes/Restaurante';
import AddReview from "../screens/restaurantes/addReview";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Restaurantes" component={Restaurantes} options={{ tittle: "Bienvenido a Restaurantes" }} />
            <Stack.Screen name="AgregarRestaurante" component={AgregarRestaurante} options={{ tittle: "Agrega Restaurante" }} />
            <Stack.Screen name="Restaurante" component={Restaurante} options={{ tittle: "Restaurante" }} />
            <Stack.Screen name="Agregar comentario" component={AddReview} />
        </Stack.Navigator>
    );
}