import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { makeStyles } from "@mui/styles";

import { doc, setDoc } from "firebase/firestore";
import firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    [theme.breakpoints.down("laptop")]: {
      fontSize: "1rem",
      textAlign: "center",
      padding: 5,
    },
  },
  headinggrid: {
    marginTop: 20,
    [theme.breakpoints.down("laptop")]: {
      textAlign: "center",
    },
  },
  Stack: {
    padding: 50,

    backgroundColor: theme.palette.secondary.main,
  },
  NewsletterText: {
    color: theme.palette.primary.main,
  },
  text: {},
  stayUpdatedForm: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
  },
  stayUpdatedbutton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      border: "1px solid white",
      boxShadow: "none",
    },
  },
  subtitledText: {
    color: theme.palette.primary.main,
    fontSize: "0.8rem",
  },
  Events: {
    padding: 20,
  },
  EventName: {
    width: "100%",
  },
  card: {
    padding: 10,
  },
  eventDescription: {
    padding: 10,
    fontWeight: 600,
    opacity: 0.5,
  },
  EventBtn: {
    marginTop: 40,
    boxShadow: "none",
  },
}));

function Events(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Event, setEvent] = useState([]);

  const db = firebase.firestore();

  useEffect(() => {
    const eventdata = [];
    db.collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          eventdata.push(doc.data());
        });
        console.log(eventdata);
        setEvent(eventdata);
      });
  }, []);

  const onSubmit = async () => {
    await setEmail((email) => {
      return email.toLowerCase();
    });
    await setDoc(doc(db, "emails", email.toLowerCase()), {
      name: name.toString(),
      email: email.toLowerCase(),
    });
  };

  function PaperCard(info) {
    return (
      <Paper variant="outlined" className={classes.card}>
        <Grid container spacing={2}>
          <Grid
            item
            sx={{
              flexGrow: 1,
            }}
          >
            <Stack direction="column">
              <Typography variant="heading">{info.eventName}</Typography>
              <Typography
                variant="eventDescription"
                className={classes.eventDescription}
              >
                {info.eventDescription.slice(0, 100)}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              color="secondary"
              variant="contained"
              className={classes.EventBtn}
              onClick={() => history.push(`/events/${info.id}`)}

            >
              Know More
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" spacing={5}>
      <Grid item className={classes.headinggrid}>
        <Typography variant="heading" className={classes.heading}>
          Societies can fill <a href="#">here</a> this form to
          get registered with CampusCircle
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
        }}
        container
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.Events}
          spacing={2}
        >
          {Event.map((event) => {
            return <Grid item sx={{
              width: "100%",
            }}>{PaperCard(event)}</Grid>;
          })}
        </Grid>
      </Grid>
      <Grid item>
        <Button color="secondary" variant="contained" onClick={() => history.push("/new-events")}>
          Add a New Event
        </Button>
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={0}
          className={classes.Stack}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Typography variant="heading" className={classes.NewsletterText}>
                Stay Updated!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="heading" className={classes.subtitledText}>
                Fill the form below to stay notified about upcoming events
              </Typography>
            </Grid>
            <Grid item>
              <Grid item>
                <Stack
                  spacing={2}
                  className={classes.stayUpdatedForm}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Stack spacing={2} direction={props.isTabletOrMobile ? "column" : "row"}>
                    <TextField
                      className={classes.text}
                      color="secondary"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      className={classes.text}
                      color="secondary"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Stack>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.stayUpdatedbutton}
                    elevation={0}
                    onClick={onSubmit}
                  >
                    Stay Updated
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Events;
