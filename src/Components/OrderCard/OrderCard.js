import React, { useState, useEffect, useContext } from "react";
import { 
  Grid, 
  Typography, 
  Paper,
  Button,
 } from "@material-ui/core";
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

  // console.log(photo, " : photo");

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  // console.log("url check: ",checkURL(photo))

  const handleOpenMapModal = () => {
    setStateOpen(true);
    setStateOrigin(origin_address);
    setStateDestination(shipping_address);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // if (checkURL(photo)) setPicURLValid(true);
      setPicURLValid(checkURL(photo));
    }
    return () => {
      mounted = false;
    };
  }, [photo, order]);

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
          <Typography>ID: {id}</Typography>
          <Grid item xs={12}>
            {picURLValid ? (
              <img
                alt={`container-${type}`}
                className={classes.boxImage}
                src={photo}
              />
            ) : (
              <SubImage />
            )}

            <Typography>Customer: {customer}</Typography>
            <Typography>Status: {status}</Typography>
            <Typography>SKU: {sku}</Typography>
            <Typography>Condition: {condition}</Typography>
            <Typography>Size: {size}</Typography>
            <Typography>Created: {created}</Typography>
            <Button
              onClick={() => handleOpenMapModal()}
            >Delivery Map
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default OrderCard;
