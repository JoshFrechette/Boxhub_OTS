import React from "react";
import { Grid, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <>
      <Grid container item xs={12} style={{ marginBottom: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h2">
            <span style={{ color: "#fab32f" }}>BOX</span>HUB
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>Order Tracking System</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
