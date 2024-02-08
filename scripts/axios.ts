
export default function handleErr(err, navigator, callback) {
    if(err.response && err.response.status == 403) {
        navigator.navigate("Login")
        return
    }
    if(callback) {
        callback(err)
    }
}