import React from 'react'
import {Text, Modal, Alert, View, Dimensions, Pressable, Share, StyleSheet} from 'react-native'
import WebView from 'react-native-webview'
import { Heading } from './text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapLocation, faShare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Row } from './layout'
import { shadow } from '../styles/inputs'
import { text } from '../styles/text'
import Geolocation from 'react-native-geolocation-service';
import constants from '../constants'
import axios from 'axios'


interface coordinate {
    latitude: Number,
    longitude: Number
}


const MapPopUp = ({markerOnPress, toggleVisible, origin, visible, fences, markers, onSetMarker}) => {
    const {width, height} = Dimensions.get('window')
    const styles = {
        margin: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        height: height - 40,
        elevation: 5,
        padding: 12
    }
    const messageHandler = msg => {
        if(onSetMarker) {
            console.log(msg)
            onSetMarker(JSON.parse(msg.nativeEvent.data))
        }
    }

    const errorHandler = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
        }

    const HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>
    </head>
        <body>
            <style>
                #map { height: ${height - 80}px; }
            </style>
            
            <div id="map"></div>

            <script>
                var map = L.map('map').setView([${origin ? `${origin.latitude}, ${origin.longitude}` : `51.505, -0.09`}], 13);

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                ${markers ? markers.map(m => `L.marker([${m.latitude}, ${m.longitude}]).addTo(map);`).join("\n") : null}

                ${fences ? fences.map(f => `L.circle([${f.latitude}, ${f.longitude}], {
                    color: 'blue',
                    fillColor: '#007bff',
                    fillOpacity: 0.5,
                    radius: ${f.radius || 500}
                    }).addTo(map);
                `).join("\n") : null}

                function createMarker(e) {
                    map.eachLayer((layer) => {
                        if(layer['_latlng']!=undefined)
                            layer.remove();
                    });
                    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        latitude: e.latlng.lat,
                        longitude: e.latlng.lng
                    }))
                }

                ${markerOnPress ? `map.on('click', createMarker);` : null}

            </script>
        </body>
    </html>`

    return (
        <Modal transparent visible={visible}>
            <View style={styles}>
                <Row styles={{alignItems: 'center', justifyContent: 'space-between'}}>
                    <Heading>Location</Heading>
                    <Pressable onPress={() => toggleVisible()}>
                        <FontAwesomeIcon icon={faTimesCircle} color={'crimson'} size={32} />
                    </Pressable>
                </Row>
                <WebView 
                    onMessage={messageHandler}
                    onError={errorHandler}
                    source={{html: HTML}}
                    javaScriptEnabled
                    originWhitelist={["*"]}
                    style={{flex: 1}} 
                />
            </View>
        </Modal>
    )
}

const MapButton = ({onSelectLocation, initialLocation, readOnly}) => {
    const [visible, setVisible] = React.useState(false)
    const [marker, setMarker] = React.useState(null)
    const [location, setLocation] = React.useState("")

    const handleMarkerPlacement = data => {
        setMarker(data)
        if(onSelectLocation) {
            onSelectLocation(data)
        }
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `https://www.google.com/maps/search/?api=1&query=${marker.latitude}%2C${marker.longitude}`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
    };

    React.useEffect(() => {
        if(initialLocation && !marker) {
            setMarker(initialLocation)
            return 
        }

        if(!initialLocation && !marker) {
            Geolocation.getCurrentPosition(position => {
                if(!(position && position.coords))
                    return;
                setMarker({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude
                })
            })
        }
    }, [])

    React.useEffect(() => {
        if(!marker) { return }
        axios.get(`${constants.server_url}/api/method/billing_engine.billing_engine.api.get_location_string`, {
            params: {coordinates: `${marker.latitude},${marker.longitude}`}
        }).then(res => {
            setLocation(`${res.data.message.city}, ${res.data.message.country}`)
        }).catch(err => {
            setLocation(`Lat: ${`${marker.latitude}`.slice(0, 6)} Lng: ${`${marker.longitude}`.slice(0, 6)}`)
        })
    }, [marker])

    React.useEffect(() => {
        if(initialLocation && !marker) {
            setMarker(initialLocation)
            return 
        }

        if (
                initialLocation 
                && marker 
                && JSON.stringify(initialLocation) != JSON.stringify(marker)
            ) 
        {
            setMarker(initialLocation)
        }
    }, [initialLocation])

    return (
        <>
        <View style={styles.button}>
        <Row styles={{alignItems: 'center', justifyContent: 'space-between'}}>
        <Pressable  onPress={() => setVisible(true)}>
            <Row styles={{gap: 12, alignItems: 'center'}}>
                <FontAwesomeIcon icon={faMapLocation} size={32} color={"#007bff"} />
                {!marker && !readOnly && <Text>Select Location</Text>}
                {!marker && readOnly && <Text>No Location set</Text>}
                {marker && (
                    <View>
                        <Text style={styles.buttonText}>{readOnly ? "" : "Selected"} Location:</Text>
                        <Text style={styles.buttonText}>{location}</Text>
                    </View>
                )}
            </Row>
        </Pressable>
        {marker && readOnly && <Pressable onPress={onShare}>
                    <FontAwesomeIcon color={"#aaa"} icon={faShare} size={32} />
                </Pressable>}
        </Row>
        </View>
        
        <MapPopUp 
            visible={visible}
            markerOnPress={readOnly != undefined ? readOnly : true}
            toggleVisible={() => setVisible(false)}
            origin={marker}
            markers={marker ? [marker] : []}
            onSetMarker={handleMarkerPlacement}/>
        </>
    )

}

const styles = StyleSheet.create({
    button: {
        margin: 24,
        padding: 16,
        elevation: 5,
        ...shadow,
        borderRadius: 12
    },
    buttonText: {
        ...text,
        fontSize: 16
    }
})

export default MapPopUp
export {MapButton}