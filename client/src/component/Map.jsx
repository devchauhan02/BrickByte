import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeoCoderMarker from './GeoCoderMarker';

const Map = ({ address, city, country }) => {
  const fullAddress = `${address}, ${city}, ${country}`;

  return (
    <MapContainer
      center={[20.5937, 78.9629]} 
      zoom={5}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={fullAddress} />
    </MapContainer>
  );
};

export default Map;
