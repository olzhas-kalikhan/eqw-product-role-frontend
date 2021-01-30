import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}
export const Map = ({ location, data }) => {

    return (
        <div >
            <h6>To navigate Click on table row  </h6>
            <MapContainer style={{ height: '50vh', width: '100%' }} scrollWheelZoom={true}>
                <ChangeView center={[location.lat, location.lon]} zoom={12} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup showCoverageOnHover={true} >
                    {data.map(({ name, lat, lon }, idx) =>
                        <Marker position={[lat, lon]} key={idx + name}>
                            <Popup>
                                {name}
                            </Popup>
                        </Marker>
                    )}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    )
}