import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGeolocation = () => {
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.multiGet(['location-last-fetch', 'location']).then(res => {
      const resMap = {};
      res.forEach(item => {
        resMap[item[0]] = item[1];
      });
      const timestamp = resMap['location-last-fetch'];
      const storedLocation = resMap.location;
      const lastFetch = timestamp
        ? parseInt(new Date(timestamp).getTime())
        : new Date().getTime();
      const timeDiff = new Date().getTime() - lastFetch;
      if (timeDiff < 1000 * 60 * 5) {
        setLocation(JSON.parse(storedLocation));
        return;
      }
      Geolocation.getCurrentPosition(position => {
        if (position) {
          setLocation(position.coords);
          AsyncStorage.setItem('location', JSON.stringify(position.coords));
          AsyncStorage.setItem('location-last-fetch', new Date().toISOString());
        }
      });
    });
  }, []);

  return location;
};


export default useGeolocation;