import React, { useContext } from 'react';
import {
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import { MapContext } from '../MapContext/MapContext';

const MapModal = () => {
    const { open, origin, destination } = useContext(MapContext);
    const [stateOpen, setStateOpen] = open;
    const [stateOrigin, setStateOrigin] = origin;
    const [stateDestination, setStateDestination] = destination;

    const closeModal = (e) => {
        e.preventDefault();
        setStateOpen(false);
    };

    return (
        <Grid>
             <Typography>MAP!</Typography>
             <Typography>{stateOrigin}</Typography>
             <Typography>{stateDestination}</Typography>

             <Button
              onClick={(e) => closeModal(e)}
             >
                 Close Me
             </Button>
        </Grid>

    );

};

export default MapModal;
