import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Components
import Button from "components/CustomButtons/Button";
import ActivityCard from "views/Itinerary/ActivityCard";

const ActivityList = ({ event, setEvent, isMap, setOpen }) => {
  const history = useHistory();
  const { activities } = useSelector((state) => state.tripReducer);

  const handleExplore = () => {
    isMap ? setOpen(false) : history.push("/explore");
  };

  return (
    <div>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard
            activity={activity}
            event={event}
            setEvent={setEvent}
            key={activity.id}
          />
        ))
      ) : (
        <Button
          color="warning"
          simple
          style={{ width: "80ch" }}
          onClick={handleExplore}
        >
          Explore Activities
        </Button>
      )}
    </div>
  );
};

export default ActivityList;
