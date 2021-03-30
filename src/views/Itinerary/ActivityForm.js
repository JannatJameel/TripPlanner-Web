import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToItinerary } from "store/actions/tripActions";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Core Components
import Button from "components/CustomButtons/Button";
import Accordion from "components/Accordion/Accordion";
import ActivityList from "views/Itinerary/ActivityList";

const useStyles = makeStyles(() => ({
  formInput: {
    // width: "40ch",
    marginTop: 10,
    marginBottom: 10,
  },
}));

const ActivityForm = ({ day }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tripId = JSON.parse(localStorage.getItem("activeTrip")).id;

  const [activity, setActivity] = useState({});
  const [event, setEvent] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    activity.activityId = event.id;
    const newActivity = { tripId, day, activity };
    dispatch(addToItinerary(newActivity));
    handleClose();
    setActivity({});
  };

  return (
    <div>
      <Button color="rose" round onClick={handleClickOpen}>
        Add Activity
      </Button>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Activity to Day 1</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            name="name"
            value={activity.name}
            onChange={handleChange}
            label="Activity"
            type="text"
            autoComplete="off"
            placeholder="add a title to your activity"
            fullWidth
            className={classes.formInput}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            name="startTime"
            value={activity.startTime}
            onChange={handleChange}
            label="Start Time"
            type="time"
            defaultValue={new Date()}
            fullWidth
            className={classes.formInput}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            name="endTime"
            value={activity.endTime}
            onChange={handleChange}
            label="End Time"
            type="time"
            defaultValue={new Date()}
            fullWidth
            className={classes.formInput}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Accordion
            active={0}
            collapses={[
              {
                title: "Select Activity",
                content: <ActivityList setEvent={setEvent} />,
              },
            ]}
          />
          {/* <Button color="warning" simple size="lg" block>
            Select Activity
          </Button> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="rose">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="warning">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActivityForm;
