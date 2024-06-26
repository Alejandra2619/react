import firebase from "firebase/compat/app";

export function reautenticar(password) {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );
    return user.reauthenticateWithCredential(credentials);
}