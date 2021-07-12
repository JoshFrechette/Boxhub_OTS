import React, { useState, useEffect, useContext } from "react";
import { 
  Grid, 
  Typography, 
  Paper,
  Button,
 } from "@material-ui/core";
 import RoomIcon from '@material-ui/icons/Room';
import useStyles from "./OrderCardStyles";

import { MapContext } from '../MapContext/MapContext';

const OrderCard = ({ order }) => {
  const [picURLValid, setPicURLValid] = useState(false);
  const { open, origin, destination } = useContext(MapContext);
  const [stateOpen, setStateOpen] = open;
  const [stateOrigin, setStateOrigin] = origin;
  const [stateDestination, setStateDestination] = destination;

  const {
    id,
    created,
    status,
    customer,
    sku,
    photo,
    condition,
    size,
    type,
    origin_address,
    shipping_address,
  } = order;

// A regex checker for validating image urls

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  const handleOpenMapModal = () => {
    setStateOpen(true);
    setStateOrigin(origin_address);
    setStateDestination(shipping_address);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setPicURLValid(checkURL(photo));
    }
    return () => {
      mounted = false;
    };
  }, [photo, order]);


// Image alternate if image url does not pass checker
  const SubImage = () => {
    return (
      <>
        <Grid className={classes.subBoxImage}>
          <Typography className={classes.subBoxImageText}>
            Image Not Available
          </Typography>
        </Grid>
      </>
    );
  };

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className={classes.cardContainer}
        key={id}
      >
        <Paper elevation={2} className={classes.card}>
          <Grid xs={12} style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Typography>ID: {id}</Typography>
          </Grid>
          <Grid container item xs={12}>
            {picURLValid ? (
              <img
                alt={`container-${type}`}
                className={classes.boxImage}
                src={photo}
              />
            ) : (
              <SubImage />
            )}
            <Grid item xs={6} style={{ backgroundColor: '#fab32f', padding: 2 }}>
              <Typography variant='body2'>Condition: {condition}</Typography>
              <Typography variant='body2'>Type: {type}</Typography>
              <Typography variant='body2'>Size: {size}</Typography>
            </Grid>
            <Grid item xs={6} style={{ padding: 2 }}>
              <Typography variant='body2'> Customer: {customer}</Typography>
            <Typography variant='body2'>Status: {status}</Typography>
            <Typography variant='body2'> SKU: {sku}</Typography>
            <Typography variant='body2'>Created: {created}</Typography>
              </Grid>
            <Grid container item display='flex' xs={12} justifyContent='center' style={{ marginTop: 10, padding: 10 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={() => handleOpenMapModal()}
              >
                Delivery Map
                  <RoomIcon />
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default OrderCard;
