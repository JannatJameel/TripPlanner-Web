import React from "react";
import { useDispatch } from "react-redux";
import { handleActivity } from "../../store/actions/tripActions";
import { Marker, InfoWindow } from "react-google-maps";
// Components
import ActivityDetails from "./ActivityDetails";
// Styling
import { useToasts } from "react-toast-notifications";
import { Divider } from "@material-ui/core";
import {
  ButtonContainer,
  InfoCard,
  StyledButton,
  StyledHeader,
  StarContainer,
  customIcon,
  selectedIcon,
  StyledInfoPrice,
} from "./styles";
import { Rating } from "@material-ui/lab";

const Markers = ({
  open,
  handleOpen,
  details,
  handleDetails,
  filter,
  activities,
  selectedActivities,
}) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  //Filters
  const filteredActivities = activities.filter(
    (activity) =>
      +activity.price.amount >= filter.price[0] &&
      +activity.price.amount <= filter.price[1] &&
      +activity.rating >= filter.rating &&
      (activity.name.toLowerCase().includes(filter.query.toLowerCase()) ||
        activity.shortDescription
          .toLowerCase()
          .includes(filter.query.toLowerCase()))
  );

  const add = async (activity, remove) => {
    await dispatch(handleActivity(activity));
    handleOpen(activity.id);
    addToast(
      `${activity.name} ${remove ? "removed from" : "added to"} your trip.`,
      {
        appearance: `${remove ? "warning" : "success"}`,
        autoDismiss: true,
        placement: "bottom-right",
      }
    );
  };

  const markers = filteredActivities.map((activity) => {
    const remove = selectedActivities.some(
      (_activity) => activity.id === _activity.id
    );
    return (
      <Marker
        key={activity.id}
        position={{
          lat: +activity.geoCode.latitude,
          lng: +activity.geoCode.longitude,
        }}
        onClick={() => handleOpen(activity.id)}
        icon={remove ? selectedIcon : customIcon}
      >
        {open[activity.id] && (
          <InfoWindow onCloseClick={() => handleOpen(activity.id)}>
            <InfoCard>
              <StyledHeader title={activity.name} />
              <StarContainer>
                <Rating
                  defaultValue={activity.rating}
                  precision={0.25}
                  readOnly
                />
              </StarContainer>
              <StyledInfoPrice variant="body1">
                {`${activity.price.currencyCode} ${activity.price.amount}`}
              </StyledInfoPrice>
              <Divider variant="middle" />
              <ButtonContainer>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetails(activity.id)}
                >
                  View
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color={remove ? "secondary" : "primary"}
                  onClick={() => add(activity, remove)}
                >
                  {remove ? "Remove" : "Add"}
                </StyledButton>
              </ButtonContainer>
              <ActivityDetails
                details={details}
                handleDetails={handleDetails}
                activity={activity}
                handleOpen={handleOpen}
                remove={remove}
              />
            </InfoCard>
          </InfoWindow>
        )}
      </Marker>
    );
  });
  return markers;
};

export default Markers;
