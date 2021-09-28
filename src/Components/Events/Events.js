import React from "react";
import { Grid, Typography, TextField, Stack, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    text:{
        width:"50%"
    },
    heading:{
        [theme.breakpoints.down("laptop")]:
        {
            fontSize: "1rem",
            textAlign: "center",
            padding: 5
        }
        
    },
    headinggrid:{
        marginTop: 20,
        [theme.breakpoints.down("laptop")]:
        {
            textAlign: "center"
        }
    },
    Stack:{
        padding: 50,

        backgroundColor: theme.palette.secondary.main,
    },
    NewsletterText:{
        color: theme.palette.primary.main,
    }
  }));
  
function Events(props) {
    const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" spacing={5}>
      <Grid item className={classes.headinggrid}>
        <Typography variant="heading" className={classes.heading}>
          Societies can fill this form to get registered with CampusCircle
        </Typography>
      </Grid>
      <Grid item>
        <Button color="secondary">Add a New Event (Currently Inactive)</Button>
      </Grid>
      <Grid
        item
        sx={{
          flexGrow: 1,
        }}
      ></Grid>
      <Grid
        item
        sx={{
          width: "100%",
        }}
      >
        <Stack alignItems="center" justifyContent="center" spacing={0} className={classes.Stack}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
                <Grid item>
                    <Typography variant="heading" className={classes.NewsletterText}>
                        Stay Updated!
                    </Typography>
                </Grid>
                <Grid item container alignItems="center" justifyContent="center">
                    
                    <TextField label="Email" color="primary"
                    fullWidth
                    InputProps={{endAdornment: <Button variant="contained">Submit</Button>}}
                    />

                </Grid>
            </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Events;
