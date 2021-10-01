import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import "../../css/style.css";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";


import {
  Box,
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
import Cam from "./Registration-Cam/Cam"
import axios from "axios";

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
    loading: true,
  });

  const [text, setText] = useState({
    Yourname: "",
    YourEmail: "",
    YourLinkedIn: "",
    SocietyName: "",
    instagramLink: "",
    About: "",
    email: "",
  });

  const [webcam, setWebcam] = useState({
    image: null,
    state: false,
  })

  function handleChange(value) {
    setText({ ...text, body: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function Photo() {
    return (
      <Stack direction="row" spacing={2}>
        <img src={webcam.image} />
        <Button color="secondary" sx={{
          width: "100%",

        }} onClick={() => {
          setWebcam({ ...webcam, image: null })
        }}>
          Retake
        </Button>
      </Stack>
    )
  }

  function handleChangeText(e) {
    return (
      <Box
      sx={{
        width: "100%",
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button color="secondary" onClick={() => setWebcam({...webcam,state: true})}>
        Take Your Photo
      </Button>
    </Box>
    )
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="heading">Register Your Society</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Your Information</Typography>
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          label="Your Name"
          color="secondary"
          variant="standard"
          value={text.Yourname}
          onChange={(e) => setText({ ...text, Yourname: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          label="Your Email"
          color="secondary"
          variant="standard"
          value={text.YourEmail}
          onChange={(e) => setText({ ...text, YourEmail: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          label="Your LinkedIn Profile"
          variant="standard"
          color="secondary"
          value={text.YourLinkedIn}
          onChange={(e) => setText({ ...text, YourLinkedIn: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Society Information</Typography>
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Society Name"
          variant="standard"
          color="secondary"
          value={text.SocietyName}
          onChange={(e) => setText({ ...text, SocietyName: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Society Instagram Link"
          variant="standard"
          color="secondary"
          value={text.instagramLink}
          onChange={(e) => setText({ ...text, instagramLink: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Society Email Account"
          variant="standard"
          color="secondary"
          value={text.instagramLink}
          onChange={(e) => setText({ ...text, email: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="What is this Society About?"
          variant="standard"
          color="secondary"
          value={text.About}
          onChange={(e) => setText({ ...text, About: e.target.value })}
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        {webcam.image==null ? webcam.state ? <Cam webcam={webcam} setWebcam={setWebcam}/> : handleChangeText() : Photo() }
        {/* <Webcam
          audio={false}
          height={400}
          screenshotFormat="image/jpeg"
          width={400}
        /> */}
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewEvent;
