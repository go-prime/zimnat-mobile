import constants from "./constants";

const getAbsoluteURL = (relativeURL: string) => {
    if(typeof(relativeURL) != "string") {
        return ""
    }
    if(relativeURL.indexOf("http") == 0) {
        return relativeURL
    }
    return `${constants.server_url}${relativeURL}`
}

export {getAbsoluteURL}