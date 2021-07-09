import React, { useContext } from 'react';
import {
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import { MapContext } from '../MapContext/MapContext';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Geocode from "react-geocode";

const MapModal = () => {
    const { open, origin, destination } = useContext(MapContext);
    const [stateOpen, setStateOpen] = open;
    const [stateOrigin, setStateOrigin] = origin;
    const [stateDestination, setStateDestination] = destination;

    Geocode.setApiKey("AIzaSyCPN0kq4muE4BNkZ6GuqJP1O_L5iXPldsw&");

    Geocode.fromAddress(stateOrigin).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );

      Geocode.fromAddress(stateDestination).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );

    //   console.log(mapOrigin,  mapDestination)

    const closeModal = (e) => {
        e.preventDefault();
        setStateOpen(false);
    };

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
                <GoogleMap
                    defaultZoom={12}
                    // defaultCenter={{ lat: -34.397, lng: 150.644 }}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                >

                    {/*Marker*/}
                    <Marker
                        // google={this.props.google}
                        name={'Dolores park'}
                        draggable={true}
                        // onDragEnd={this.onMarkerDragEnd}
                        // position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                    />
                    {/* <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                        </div>
                    </InfoWindow> */}
                    <Marker />
                </GoogleMap>
            )
        )
    );


    return (
        <Grid container item xs={12} lg={12} style={{ height: 400, width: 500 }}>
            <Grid id='map' item style={{ height: '100vh', width: '100%' }}>
            <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPN0kq4muE4BNkZ6GuqJP1O_L5iXPldsw&libraries=places"
                    // googleMapURL="https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCPN0kq4muE4BNkZ6GuqJP1O_L5iXPldsw&libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: `80%`, width: '100%' }} />
                    }
                    mapElement={
                        <div style={{ height: `100%`, width: '100%' }} />
                    }
                />
                           <Button
              onClick={(e) => closeModal(e)}
             >
                 Close Me
             </Button>
            </Grid>
        </Grid>
    );

};

export default MapModal;
