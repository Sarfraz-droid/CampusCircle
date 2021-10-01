import React, { useState,useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import ReactQuill from "react-quill"; // ES6
import "../../css/style.css";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";

import { makeStyles } from "@mui/styles";

import axios from "axios";

const Dev = process.env.NODE_ENV === "development";
const Link = Dev
  ? "http://localhost:8000"
  : "https://campus-circle.herokuapp.com";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "55vw",
    [theme.breakpoints.down("laptop")]: {
      width: "100vw",
    },
  },
  SubmitePaper: {
    padding: 20,
  },
}));

function NewEvent() {
  const history = useHistory();

  const classes = useStyles();

  const [Open, setOpen] = useState({
    state: false,
    error: false,
    OTP: false,
    loading: true,
  });

  const [text, setText] = useState({
    eventName: "",
    eventDescription: "",
    code: "",
    body: "Body",
  });

  const [OTP, setOTP] = useState({
    access_token: "",
    err: "",
  });

  useEffect(() => {
    console.log(OTP);
  }, [OTP])

  function handleChange(value) {
    setText({ ...text, body: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen({ ...Open, loading: true, state: true });
    axios({
      method: "post",
      url: `${Link}/verify-society`,
      data: {
        code: text.code,
        eventName: text.eventName,
        eventDescription: text.eventDescription,
        Body: text.body,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.status === false) {
        setOpen({
          state: true,
          error: true,
          OTP: false,
          loading: false,
        });
      } else {
        setOTP({
          ...OTP,
          access_token: res.data.accessToken,
        });

        setOpen({
          state: true,
          OTP: true,
          error: false,
          loading: false,
        });
      }
    });
  }

  async function handleClose() {
    if (Open.loading === true || Open.OTP === true) return;
    if (Open.error === false) history.push("/events");

    setOpen({
      ...Open,
      state: false,
    });
  }

  const ReqSuccess = () => {
    return (
      <Paper>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.SubmitePaper}
          spacing={5}
        >
          <Grid item>
            <Typography variant="heading">
              {Open.error ? "Invalid Society Code" : "Successfully Submitted"}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  const OTPAuth = () => {
    const onSubmit = () => {

      axios({
        method: "post",
        url: `${Link}/OTP-auth`,
        data: {
          OTP: OTPtext.trim(),
          auth: OTP.access_token,
          eventName: text.eventName === undefined ? "" : text.eventName,
          eventDescription: text.eventDescription,
          Body: text.body,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.err == 401) {
          setOTP({
            ...OTP,
            err: "Invalid OTP",
          });
        } else if (res.data.err == 403) {
          setOpen({
            state: true,
            error: true,
            OTP: false,
            loading: false,
          });
        } else {
          setOpen({
            state: true,
            error: false,
            OTP: false,
            loading: false,
          });
        }
      });
    };

    const [OTPtext, setOTPtext] = useState('')

    return (
      <Paper>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.SubmitePaper}
          spacing={2}
        >
          <Grid item>
            <Typography variant="heading">Enter OTP</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subheading">{OTP.err}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row">
              <TextField
                  id="otp"
                label="Enter 6 Digit OTP"
                variant="standard"
                color="secondary"
                value={OTPtext}
                onChange={(e) => 
                  setOTPtext(e.target.value)
                }
              />
              <Button
                color="secondary"
                onClick={() => onSubmit()}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="heading">
          New Event (use Society Code : pGlShZF7)
        </Typography>
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Event Name"
          variant="standard"
          color="secondary"
          value={text.eventName}
          onChange={(e) => setText({ ...text, eventName: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Event Description(Max 100 Characters)"
          variant="standard"
          color="secondary"
          value={text.eventDescription}
          onChange={(e) =>
            setText({ ...text, eventDescription: e.target.value })
          }
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Society Code"
          variant="standard"
          color="secondary"
          value={text.code}
          onChange={(e) => setText({ ...text, code: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <ReactQuill value={text.body} onChange={handleChange} />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Open.state}
        onClick={() => handleClose()}
      >
        {Open.loading ? (
          <CircularProgress color="secondary" />
        ) : Open.OTP === true? (
          <OTPAuth />
        ) : (
          <ReqSuccess />
        )}
      </Backdrop>
    </Grid>
  );
}

export default NewEvent;
