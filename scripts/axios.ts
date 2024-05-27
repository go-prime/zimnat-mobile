import { Alert } from "react-native"

export default function handleErr(err, navigator, callback) {
    if(err.response && err.response.status == 403) {
        Alert.alert('Error','You do not have permission to access this resourece, please login to continue.')
        navigator.navigate("Login")
        return
    }
    if(callback) {
        callback(err)
    }
}