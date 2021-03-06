import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleFavourite } from "store/actions/authActions";
// Components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import Button from "components/CustomButtons/Button";
// Styling
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";
import { Box } from "@material-ui/core";
import { Place, Favorite } from "@material-ui/icons";

import styles from "assets/jss/material-dashboard-pro-react/views/sectionCards";
const useStyles = makeStyles(styles);

const FavouriteCard = ({ activity, isPublic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleFavourites = () => {
    dispatch(handleFavourite(activity, true));
    addToast(`${activity.name} removed from your favorites.`, {
      appearance: "warning",
      autoDismiss: true,
    });
  };

  return (
    <GridItem xs={12} sm={12} md={4}>
      <Card background style={{ backgroundImage: `url(${activity.image})` }}>
        <CardBody background>
          <Link to={`/activities/${activity.slug}`}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={8}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <h6 className={classes.cardCategoryWhite}>
                    <Place fontSize="small" />
                  </h6>
                  <h6 className={classes.cardCategoryWhite}>
                    {activity.destination.city}, {activity.destination.country}
                  </h6>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={10} md={8}>
                <h4 className={classes.cardTitleWhite}>{activity.name}</h4>
              </GridItem>
            </GridContainer>
          </Link>
          {!isPublic && (
            <Button
              justIcon
              round
              color="white"
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                marginRight: "10px",
                marginBottom: "15px",
              }}
              onClick={handleFavourites}
            >
              <Favorite style={{ color: "#e91e63" }} />
            </Button>
          )}
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default FavouriteCard;
