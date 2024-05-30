import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function handleErr(err, navigator, callback) {
    if(err.response && err.response.status == 403) {
        console.log(err.response.data)
        Alert.alert('Error','You do not have permission to access this resource, please login to continue.')
        AsyncStorage.setItem('user', '');
        AsyncStorage.setItem('expiry', '');
        navigator.navigate("Login")
        return
    }
    if(callback) {
        callback(err)
    }
}