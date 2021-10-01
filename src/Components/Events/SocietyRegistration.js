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
import Cam from "./Registration-Cam/Cam";
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
  SubmitButton: {
    marginBottom: 40,
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
    YourLinkedIn: "",
    SocietyName: "",
    instagramLink: "",
    About: "",
    email: "",
  });

  const [webcam, setWebcam] = useState({
    image: null,
    state: false,
  });

  function handleChange(value) {
    setText({ ...text, body: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const data= {
      ...text,
      image: webcam.image,
    }

    axios({
      method: 'post',
      url: `${Link}/society-registeration`,
      data: data
    }).then((res) => {
      console.log(res)
      if(res.data.status == 200){
        history.push('/society-registeration/success')
      }else{
        history.push('/society-registeration/error')
      }
    })
  }

  function disableButton(){
    if(webcam.image == null){
      return true;
    }

    for(let key in text){
      if(text[key] == ""){
        return true;
      }
    }
    return false;
  }

  function Photo() {
    return (
      <Stack direction="row" spacing={2}>
        <img src={webcam.image} />
        <Button
          color="secondary"
          sx={{
            width: "100%",
          }}
          onClick={() => {
            setWebcam({
              image: null,
              state: true,
            });
          }}
        >
          Retake
        </Button>
      </Stack>
    );
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
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setWebcam({ ...webcam, state: true })}
        >
          Take Your Photo
        </Button>
      </Box>
    );
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
        <Typography
          variant="heading"
          sx={{
            marginTop: 50,
          }}
        >
          Register Your Society
        </Typography>
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
      {/* <Grid item className={classes.grid}>
        <TextField
          label="Your Email"
          color="secondary"
          variant="standard"
          value={text.YourEmail}
          onChange={(e) => setText({ ...text, YourEmail: e.target.value })}
          fullWidth
        />
      </Grid> */}
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
          label="Society Social Media Profile"
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
          value={text.email}
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
        {webcam.image == null ? (
          webcam.state ? (
            <Cam webcam={webcam} setWebcam={setWebcam} />
          ) : (
            handleChangeText()
          )
        ) : (
          Photo()
        )}
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSubmit}
          className={classes.SubmitButton}
          disabled={disableButton()}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewEvent;
