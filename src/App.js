import React, { useEffect, useRef } from "react";
import aIcon from './assets/A-icon.svg';
import bIcon from "./assets/B-icon.svg";
import customIcon from "./assets/customMarker.png";

function Map() {
  console.log("line7");
  const prevMarkersRef = useRef([]);
  useEffect(() => {
    console.log("line7");

    const locations = [{lat: 20.5937, lng: 78.9629}, {lat: 22.5726, lng: 88.3639}, {lat: 22.5754, lng: 88.4798}]
    
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
  
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {lat: 20.5937, lng: 78.9629},
      zoom: 7
    });

    directionsRenderer.setMap(map);
    directionsRenderer.setOptions({ suppressMarkers: true });
    // clearMarkers(prevMarkersRef.current);
  
    locations && locations.map((loc, index) => {
      const m = createMarker({ lat: loc.lat, lng: loc.lng }, map, index);
      prevMarkersRef.current.push(m);
    })
  
    const origin = locations && new window.google.maps.LatLng(locations[0].lat, locations[0].lng);
    const destination = locations && new window.google.maps.LatLng(locations[1].lat, locations[1].lng);

    // const destination = locations && new window.google.maps.LatLng(locations[1].lat, locations[1].lng);
      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      };  
      directionsService.route(request, function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } 
        else { 
        }
      })
  },
  // here we using for when change locations map update
  //  [propslocations]
   );

  function createMarker(position, map, index) {
    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: {url: (index===0)?aIcon:(index===1)?bIcon:customIcon, scaledSize: new window.google.maps.Size(43,43)}
    });
  }

  // function createMarkerForSupplier(position, map) {
  //   return new window.google.maps.Marker({
  //     position: position,
  //     map: map,
  //     icon: {url: customIcon, scaledSize: new window.google.maps.Size(43,43)}
  //   });
  // }

  // function clearMarkers(markers) {
  //   for (let m of markers) {
  //     m.setMap(null);
  //   }
  // }

  return (
    console.log("line75"),
    <div>
      <div id="map" style={{height:"454px"}}></div>
    </div>  
  );
}

export default Map;
