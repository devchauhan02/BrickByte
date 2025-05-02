import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!address || address.trim().length < 10) {
      console.warn("Invalid address:", address); 
      return; 
    }

    const timeout = setTimeout(() => {
      console.log("Geocoding:", address);

      ELG.geocode().text(address).run((err, results) => {
        if (err) {
          console.error("Geocoding error:", err);
          return;
        }

        console.log("Geocoding results:", results);  

        const coords = results?.results?.[0]?.latlng;
        if (coords) {
          console.log("Geocoded position:", coords);  
          setPosition([coords.lat, coords.lng]);
          map.flyTo([coords.lat, coords.lng], 13);  
        } else {
          console.warn("No results for address:", address);  
        }
      });
    }, 500); 

    return () => clearTimeout(timeout); 
  }, [address, map]);  

  return position ? (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  ) : null;
};

export default GeoCoderMarker;
