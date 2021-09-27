import React from "react";

import { Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    heading: {
        ...theme.typography.heading
    }    
}));

function ComingSoon() {
    const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
          marginLeft: 0,
          
      }}
    >
        <Grid item>
            <Typography variant="h4" className={classes.heading}>
                Coming Soon
            </Typography>
        </Grid>
    </Grid>
  );
}

export default ComingSoon;
