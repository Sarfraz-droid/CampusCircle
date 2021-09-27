import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Button, IconButton, Drawer, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Logo from "../../assets/logo.png";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const useStyles = makeStyles({
  heading: {
    fontFamily: "Montserrat",
    fontWeight: 100,
  },
});

function Mobile() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [draw, setDraw] = useState({
    state: false,
  });
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const History = useHistory();

  const ShowList = () => {
    return (
        <Box
        sx={{
            width: 250,
            flexGrow: 1,
            backgroundColor: "secondary.main",
          }}
        role="presentation"
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
  
    );
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={() => setDraw({ state: !draw.state })}
        sx={{
          position: "fixed",
        }}
      >
        <MenuRoundedIcon color="secondary" fontSize="large" />
      </IconButton>
      <Drawer
        anchor="left"
        open={draw.state}
        onClose={() => setDraw({ state: !draw.state })}
      >
        {ShowList()}
      </Drawer>
    </React.Fragment>
  );
}

export default Mobile;
