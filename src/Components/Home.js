import React from 'react'

import {Grid , Typography , Paper, Button } from "@mui/material"

import Logo from "../assets/logo.png"
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    cardheading: {
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 200,
        
    },
    subheading:{
        color: 'white',
        textAlign: 'center',
        fontSize: '0.8rem',
        alignSelf: 'center',
    }
  });
  
function Home() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container direction="column" justify="center" alignItems="center" spacing={10}>
                <Grid item>
                    <Typography variant="heading">
                        Welcome to College Circle
                    </Typography>
                </Grid>
                <Grid item container sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}>
                    <Paper sx={{
                        backgroundColor: "secondary.main",
                        padding: 3,
                        width: "60%",
                    }} elevation={4}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <img src={Logo} alt="Logo" width="100px" height="100px"/>
                            </Grid>
                            <Grid item>
                                <Typography variant="heading" className={classes.cardheading}>
                                    College Circle
                                </Typography>
                            </Grid>
                            <Grid item sx={{
                                textAlign: "center",
                            }}>
                                <Typography variant="heading" className={classes.subheading}>
                                    College Circle is a platform where students can stay updated of everything around Campus.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    Show Events
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        </React.Fragment>
    )
}

export default Home
