import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import useStyles from "./OrderCardStyles";

const OrderCard = ({ order }) => {
  const [picURLValid, setPicURLValid] = useState(false);

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

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (checkURL(photo)) setPicURLValid(true);
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
            <Typography>Delivery Map</Typography>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default OrderCard;
