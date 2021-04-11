import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchProfile } from "../../store/actions/userActions";
import Loader from "../../components/Loading/Loader";
import { Box } from "@material-ui/core";
import { Explore, RateReview, Favorite } from "@material-ui/icons";
import { Paper, Tabs, Tab, Typography } from "@material-ui/core/";
import TripHistory from "views/TripHistory";
import ReviewList from "views/Profile/ReviewList";
import Profile from "./Profile";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography align="center">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const PublicProfile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [value, setValue] = useState(0);
  const { profiles } = useSelector((state) => state.userReducer);

  if (!profiles.some((profile) => profile.username === username)) {
    dispatch(fetchProfile(username));
    return <Loader />;
  }

  const profile = profiles.find((profile) => profile.username === username);

  return (
    <>
      <div
        style={{
          display: "Flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Profile profile={profile} />
      </div>
      <div
        style={{
          display: "Flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Paper square>
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab icon={<Explore />} label="TRIPS" />
            <Tab icon={<RateReview />} label="REVIEWS" />
            <Tab icon={<Favorite />} label="FAVORITES" />
          </Tabs>
        </Paper>
      </div>
      <TabPanel value={value} index={0}>
        {profile.trips.length ? (
          <TripHistory _trips={profile.trips} profile={profile} />
        ) : (
          `${profile.username} has not planned trips.`
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {profile.reviews.length ? (
          <ReviewList _reviews={profile.reviews} profile={profile} />
        ) : (
          `${profile.username} has not submitted reviews.`
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Coming soon
      </TabPanel>
    </>
  );
};

export default PublicProfile;
