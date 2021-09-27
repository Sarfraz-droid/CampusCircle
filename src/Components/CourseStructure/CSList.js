import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { Link } from "@mui/material";

import { useParams } from "react-router";

import { makeStyles } from "@mui/styles";

async function getData(id) {
  const response = await fetch(`/json/${id}.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    ...theme.typography.heading,
        paddingBottom: 20,
      [theme.breakpoints.down("laptop")]: {
        textAlign: "center",
        fontSize: "1.2rem"
      },
      borderBottom: "1px solid #e0e0e0",
  },
  Subheading: {
    color: theme.palette.secondary.dark,
    fontFamily: "Montserrat",
    fontWeight: 600,
  },
  Card: {
    marginBottom: 5,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.005)",
    },
    [theme.breakpoints.down("laptop")] : {
      textAlign: "center"
    }
  },
  list: {
    width: "70%",
    [theme.breakpoints.down('laptop')] : {
        width: "100%"
    }
  },
  listitem: {
    fontFamily: "Montserrat",
  },
  grid: {
    padding: theme.breakpoints.down('laptop') ? 10 : 'auto',
    
  }
}));

function CSList() {

  const [heading, setHeading] = useState({
    "CSE" : "Computer Science Engineering",
    "ECE" : "Electronics and Communication Engineering",
    "EE" : "Electrical Engineering",
    "MECH" : "Mechanical Engineering",
    "CIVIL" : "Civil Engineering",
  })

  const [Info, setInfo] = useState([]);
  var { id } = useParams();
  useEffect(async () => {
    if (id !== undefined) 
      setInfo(await getData(id));
  }, [id]);

  useEffect(() => {
    console.log("Info");
    console.log(Info);
  }, [Info]);

  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2} 
      
      className={classes.grid}>
      <Grid item>
        <Typography variant="h1" className={classes.heading}>
          {heading[id]}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" className={classes.Subheading}>
          Course Structure
        </Typography>
      </Grid>
      <Grid item>
        <List disablePadding className={classes.list}>
          {Info.map((item, index) => {
            return (
              <Link href={item.link}>
                <Paper className={classes.Card} elevation={0}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <Typography
                          sx={{
                            fontFamily: "Montserrat",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Paper>
              </Link>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}

export default CSList;
