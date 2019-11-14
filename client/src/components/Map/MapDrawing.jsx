import React from "react";
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api'

export function MapDrawing(props) {
  return (
    <LoadScriptNext
      id="script-loader"
      googleMapsApiKey="AIzaSyAux2Z0r-_UEZYPxzOT5ebnzFnEuT578vE"
    >
      <GoogleMap
        id='theater-map'
        mapContainerStyle={{
          height: "400px",
          width: "800px"
        }}
        zoom={12}
        center={props.position}
      >
        <Marker
          title={'Theater'}
          position={props.position}
        />
      </GoogleMap>
    </LoadScriptNext>
  );
}


