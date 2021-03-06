import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
} from "@material-ui/core";
// imported components
import Header from "./Components/Header/header";
import OrderCard from "./Components/OrderCard/OrderCard";
import MapModal from "./Components/MapModal/MapModal";
// imported data
import orders from "./Components/Utils/orders.json";
// imported utils
import sortedOrders from './Components/Utils/orderSort';
// import context
import { MapContext } from './Components/MapContext/MapContext';


function App() {
  // const [state, dispatch] = useMapContext();
  const { open } = useContext(MapContext);
  const [stateOpen, setStateOpen] = open;
  const boxOrders = orders.orders;
  const [statusFilter, setStatusFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState("");


  // If there any filter changes, update the cards being rendered
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let filteredOrderArray = boxOrders;
      console.log(statusFilter);
      if (statusFilter) {
        filteredOrderArray = filteredOrderArray.filter(
          (order) => order.status === statusFilter
        );
      }
      if (sizeFilter) {
        filteredOrderArray = filteredOrderArray.filter(
          (order) => order.size === sizeFilter
        );
      }
      if (conditionFilter) {
        filteredOrderArray = filteredOrderArray.filter(
          (order) => order.condition === conditionFilter
        );
      }
      if (typeFilter) {
        filteredOrderArray = filteredOrderArray.filter(
          (order) => order.type === typeFilter
        );
      }
      setFilteredOrders(sortedOrders(filteredOrderArray));
    }
    return () => {
      mounted = false;
    };
  }, [boxOrders, statusFilter, conditionFilter, typeFilter, sizeFilter]);


// Handle the changing values from the filter UI
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSizeFilter(event.target.value);
  };

  const handleConditionChange = (event) => {
    setConditionFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container xs={12}>
        <Header />
        <Grid container item xs={12} style={{ backgroundColor: '#fafafa', padding: 10 } }>
          <Typography variant="h4">Filter Orders</Typography>
          <Grid
            item
            container
            display="flex"
            xs={12}
            style={{ padding: 20, marginBottom: 20 }}
          >
            <Grid item xs={6} md={3} style={{ marginTop: 5 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  aria-label="status"
                  name="status1"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <FormControlLabel
                    value="delivered"
                    control={<Radio />}
                    label="Delivered"
                  />
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="in-progress"
                    control={<Radio />}
                    label="In-Progress"
                  />
                  <FormControlLabel value="" control={<Radio />} label="None" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} style={{ marginTop: 5 }}>
              {/* <Typography>Size</Typography> */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup
                  aria-label="size"
                  name="size1"
                  value={sizeFilter}
                  onChange={handleSizeChange}
                >
                  <FormControlLabel
                    value="20ft"
                    control={<Radio />}
                    label="20ft"
                  />
                  <FormControlLabel
                    value="40ft"
                    control={<Radio />}
                    label="40ft"
                  />
                  <FormControlLabel
                    value="45ft"
                    control={<Radio />}
                    label="45ft"
                  />
                  <FormControlLabel value="" control={<Radio />} label="None" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} style={{ marginTop: 5 }}>
              {/* <Typography>Condition</Typography> */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Condition</FormLabel>
                <RadioGroup
                  aria-label="condition"
                  name="condition1"
                  value={conditionFilter}
                  onChange={handleConditionChange}
                >
                  <FormControlLabel
                    value="wind-wattertight"
                    control={<Radio />}
                    label="Wind-Watertight"
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    value="cargo-worthy"
                    control={<Radio />}
                    label="Cargo-Worthy"
                  />
                  <FormControlLabel value="" control={<Radio />} label="None" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} style={{ marginTop: 5 }}>
              {/* <Typography>Type</Typography> */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="type"
                  name="type1"
                  value={typeFilter}
                  onChange={handleTypeChange}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard"
                  />
                  <FormControlLabel
                    value="high-cube"
                    control={<Radio />}
                    label="High-Cube"
                  />
                  <FormControlLabel value="" control={<Radio />} label="None" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} display='flex' style={{ marginTop: 20, padding: 20 }} justifyContent='space-around'>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              return <OrderCard order={order} />;
            })
          ) : (
            <Grid>
              <Typography>No Matches Found</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={stateOpen}
      >
            <MapModal
              // origin={value.origin}
              // destination={value.destination}
            />
      </Dialog>
    </div>
  );
}

export default App;
