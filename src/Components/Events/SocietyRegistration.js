import React, { useState } from "react";
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
    SocietyName: "",
    instagramLink: "",
    About: "",
    email: ""
  });
  function handleChange(value) {
    setText({ ...text, body: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen({ ...Open, loading: true, state: true });
    axios({
        method: "post",
        url: "https://campus-circle.herokuapp.com/society-registeration",
        data: {
            name: text.SocietyName,
            insta: text.instagramLink,
            About: text.About,
            Email: text.email
        }

      })
      .then((res) => {
        console.log(res);
        if (res.data.status === false) {
          setOpen({
            state: true,
            error: true,
            loading: false,
          });
        } else {
          setOpen({
            state: true,
            error: false,
            loading: false,
          });
        }
      });
  }

  async function handleClose() {
    if(Open.loading === true)
      return;    
    if (Open.error === false) 
      history.push("/registration/successful");
    else
    history.push("/registration/successful");

    setOpen({
      ...Open,
      state: false 
    });
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
        <Typography variant="heading">New Event (use Society Code : pGlShZF7)</Typography>
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
        {Open.loading ? <CircularProgress color="secondary" /> : <ReqSuccess />}
      </Backdrop>
    </Grid>
  );
}

export default NewEvent;
