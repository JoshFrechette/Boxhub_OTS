import React, {useContext } from 'react';
import {
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import { MapContext } from '../MapContext/MapContext';

const MapModal = (origin, destination) => {
    const setOpen = useContext(MapContext);
    // const [dispatch] = useMapContext();

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Grid>
             <Typography>MAP!</Typography>
             <Button
              onClick={() => closeModal()}
             >
                 Close Me
             </Button>
        </Grid>

    )

};

export default MapModal;
