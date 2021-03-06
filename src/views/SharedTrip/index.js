import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchTrip } from "store/actions/tripActions";
import { handleDirections } from "store/actions/tripActions";
import moment from "moment";
//Components
import Loader from "components/Loading/Loader";
import DayItem from "../TripSummary/DayItem";
import Scrollbar from "./Scrollbar";
// Stylilng
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";

import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
const useStyles = makeStyles(styles);

const SharedTrip = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tripSlug } = useParams();
  const trip = useSelector((state) => state.tripReducer.shardeTrip);
  const tripDirections = useSelector((state) => state.tripReducer.directions);
  const [directions, setDirections] = useState(tripDirections ?? {});

  useEffect(() => {
    dispatch(fetchTrip(tripSlug));
  }, [dispatch]);

  useEffect(() => {
    dispatch(handleDirections(directions));
  }, [directions]);

  if (!trip.destination) return <Loader />;
  const tripDays = trip.days.sort((a, b) => a.day - b.day);

  const daysList = tripDays.map((day) => (
    <DayItem
      day={day}
      key={day.id}
      destination={trip.destination}
      directions={directions}
      setDirections={setDirections}
      share={true}
    />
  ));

  return (
    <Scrollbar>
      <div>
        <Box className={classes.box}>
          <h2>
            {trip.destination.city}, {trip.destination.country}
          </h2>
        </Box>
        <Box className={classes.box}>
          <h3>
            {moment(trip.startDate).format("LL")} -{" "}
            {moment(trip.endDate).format("LL")}
          </h3>
        </Box>
      </div>
      <Container>{daysList}</Container>
    </Scrollbar>
  );
};

export default SharedTrip;
