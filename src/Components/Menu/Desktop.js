import React from 'react'
import {Link, useHistory} from 'react-router-dom'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";


import Logo from "../../assets/logo.png"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  heading: {
    fontFamily: "Montserrat",
    fontWeight: 100,
    
  }
});



function Desktop() {
  const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const History = useHistory();

    return (
        <Box
        sx={{
          width: 300,
          height: "100vh",
          backgroundColor: "secondary.main",
          margin: 0,
          position: "fixed",
        }}
        elevation={1}
      >
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem sx={{
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img src={Logo} />
            </ListItem>
            <ListItem sx={{
              justifyContent: 'center',
              marginBottom: 5,
              
            }}>
              <Typography variant="h6" color="primary" className={classes.heading}>
                Campus Circle
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                elevation={0}
                sx={{
                  padding: 0,
                  width: "100%",
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText'
                }}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>Course Structure</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <nav>
                    <List>
                    
                      <ListItemButton onClick={() => {
                          History.push('/course/CSE')
                      }}>
                        <ListItemText primary="CSE" />
                      </ListItemButton>
                      <ListItemButton onClick={() => {
                          History.push('/course/ECE')
                      }}>
                        <ListItemText primary="ECE" />
                      </ListItemButton>
                      <ListItemButton onClick={() => {
                          History.push('/course/EE')
                      }}>
                        <ListItemText primary="Electrical" />
                      </ListItemButton>
                      <ListItemButton onClick={() => {
                          History.push('/course/MECH')
                      }}>
                        <ListItemText primary="Mrchanical" />
                      </ListItemButton>
                      <ListItemButton onClick={() => {
                          History.push('/course/CIVIL')
                      }}>
                        <ListItemText primary="Civil" />
                      </ListItemButton>
                    </List>
                  </nav>

                </AccordionDetails>
              </Accordion>

              {/* <ListItemText primary="Course Structure" /> */}
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" onClick={() => {
                  History.push('/internships')
              }}>
                <ListItemText sx={{
                  color: 'primary.main'
                }} 
                primary="Internships" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" onClick={() => {
                  History.push('/placements')
              }}>
                <ListItemText
                sx={{
                  color: 'primary.main'
                }}  
                primary="Placements" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" onClick={() => {
                  History.push('/events')
              }}>
                <ListItemText
                sx={{
                  color: 'primary.main'
                }}  
                primary="Events" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>

    )
}

export default Desktop
