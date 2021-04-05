import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
//Components
import Map from "./Map";
import Loader from "components/Loading/Loader";
//Styling
import { Tabs, Tab, Paper, Typography } from "@material-ui/core";
import DayTimeline from "./DayTimeline";
import { StyledContainer, StyledMapSection } from "./styles";

const Routes = () => {
  const [shown, setShown] = useState(0);
  const { itinerary, trip } = useSelector((state) => state.tripReducer);
  const { days } = itinerary;

  if (days == undefined) return <Loader />;

  const location = trip.destination;

  const dayTabs = days.map((day) => (
    <Tab label={`Day ${day.day}`} disabled={!day.activities.length} />
  ));

  if (days[shown].activities.length === 0)
    return (
      <p>start planning your trip by adding activities in the itinerary</p>
    );

  const sortedActivities = days[shown].activities.sort(
    (a, b) =>
      moment.duration(a.dayActivity.startTime) -
      moment.duration(b.dayActivity.startTime)
  );

  return (
    <div>
      <Typography variant="h3">
        Your {days.length} Days in {location.city}
      </Typography>

      <StyledContainer>
        <StyledMapSection>
          <Paper>
            <Tabs
              value={shown}
              onChange={(event, day) => setShown(day)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {dayTabs}
            </Tabs>
          </Paper>

          <Map
            isMarkerShown
            lat={location.latitude}
            lng={location.longitude}
            activities={sortedActivities}
            shown={shown}
          />
        </StyledMapSection>
        <DayTimeline activities={sortedActivities} />
      </StyledContainer>
    </div>
  );
};

export default Routes;
