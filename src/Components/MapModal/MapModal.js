import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { MapContext } from "../MapContext/MapContext";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  DirectionsRenderer,
} from "react-google-maps";
import Geocode from "react-geocode";

// Get hidden Key value
import dotenv from "dotenv";
dotenv.config();



const MapModal = () => {
  const { open, origin, destination } = useContext(MapContext);
  const [stateOpen, setStateOpen] = open;
  const [stateOrigin, setStateOrigin] = origin;
  const [stateDestination, setStateDestination] = destination;
  const [trimmedOrigin, setTrimmedOrigin] = useState('');
  const [trimmedDestination, setTrimmedDestination] = useState('');
  const [originLongLat, setOriginLongLat] = useState({
    coords: {
      long: "",
      lat: "",
    },
  });
  const [destinationLongLat, setDestinationLongLat] = useState({
    coords: {
      long: "",
      lat: "",
    },
  });
  const apiKey = process.env.REACT_APP_APIKEY;

  Geocode.setApiKey(apiKey)

  const mapURL =
    "https://maps.googleapis.com/maps/api/js?key=" 
    +
    apiKey 
    +
    "&libraries=places";

    // const directionURL = "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key="+ apiKey + "&callback=initMap";

  const directionURL =
  "https://maps.googleapis.com/maps/api/directions/json?origin=" + 
  trimmedOrigin +
  "&destination=" +
  trimmedDestination +
  "&key=" +
  apiKey;

  function checkAddress(address) {
    const regex = new RegExp('\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.')
    if (regex.test(address)) return address;
    else return false;
  }

  function trimAddress(address){
    let addr = address.split(",");
    let result = [];
    for (let i = 0; i < addr.length;i++){
        addr[i] = addr[i].trim();
        if(i < addr.length - 2){
            result.push(addr[i]);
        }
    }
    return result.join(", ");
    
} 

  useEffect(() => {
    console.log(stateDestination, stateOrigin);
    let mounted = true;
    if (mounted) {
        setTrimmedDestination(trimAddress(stateDestination));
        setTrimmedOrigin(trimAddress(stateOrigin));



      Geocode.fromAddress(trimmedDestination).then(
        (response) => {
          console.log("res", response)
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setOriginLongLat(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );

      Geocode.fromAddress(trimmedDestination).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setDestinationLongLat(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    console.log(originLongLat, destinationLongLat)
    return () => {
      mounted = false;
    };
  }, [open]);

  const closeModal = (e) => {
    e.preventDefault();
    setStateOpen(false);
  };

  // const request = () => {
  //   const DirectionsService = new google.maps.DirectionsService();

  //   DirectionsService.route({
  //     origin: new google.maps.LatLng(41.8507300, -87.6512600),
  //     destination: new google.maps.LatLng(41.8525800, -87.6514100),
  //     // travelMode: google.maps.TravelMode.DRIVING,
  //   }, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.setState({
  //         directions: result,
  //       });
  //     } else {
  //       console.error(`error fetching directions ${result}`);
  //     }
  //   });
  // }


  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 43.6532 , lng: -79.3832 }}
        // defaultCenter={{ trimmedOrigin }}
      >
        {/*Directions*/}
          <DirectionsRenderer 
            directions={{origin: trimmedOrigin, destination: trimmedDestination }} 
          />
      </GoogleMap>
    ))
  );

  return (
    <Grid container item xs={12} style={{ minHeight: 400, minWidth: 700 }}>
      <Grid id="map" item style={{ height: "100vh", width: "100%" }}>
        <AsyncMap
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%`, width: "100%" }} />}

        />
        <Grid item xs={12} style={{ padding: 5, marginTop: 10 }}>
          <Typography variant="body2">
            <b>Shipping Origin: </b>
            {stateOrigin}
          </Typography>
          <Typography variant="body2">
            <b>Shipping Destination: </b>
            {stateDestination}
          </Typography>
        </Grid>
        <Grid container item display="flex" xs={12} justifyContent="center">
          <Button variant="contained" onClick={(e) => closeModal(e)}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MapModal;
