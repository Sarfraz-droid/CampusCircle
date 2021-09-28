import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import ReactQuill from "react-quill"; // ES6
import "../../css/style.css";
import { Grid, Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "55vw",
    [theme.breakpoints.down("laptop")]: {
      width: "100vw",
    },
  },

}));

function NewEvent() {
  const classes = useStyles();
  const [text, setText] = useState({
    text: "Enter Event Info",
  });
  function handleChange(value) {
    setText({
      text: value,
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
        <Typography variant="heading">New Event</Typography>
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Event Name"
          variant="standard"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <TextField
          id="standard-basic"
          label="Society Code"
          variant="standard"
          color="secondary"
          fullWidth
        />
      </Grid>
      <Grid item className={classes.grid}>
        <ReactQuill value={text.text} onChange={handleChange} />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewEvent;
