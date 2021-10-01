import React from "react";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";

import Desktop from "./Components/Menu/Desktop";
import Mobile from "./Components/Menu/Mobile"
import Stack from "@mui/material/Stack";

import CSList from "./Components/CourseStructure/CSList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


import ComingSoon from "./Components/ComingSoon"
import NewEvent from "./Components/Events/NewEvent"
import Events from "./Components/Events/Events"
import SingleEvent from "./Components/Events/SingleEvent"
import Societyregister from "./Components/Events/SocietyRegistration"
import RegisterResult from "./Components/Events/SocietyRegistrationReport"

import { useMediaQuery } from 'react-responsive'
import Home from "./Components/Home"

export default function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <ThemeProvider theme={theme}>
      <Stack direction={isTabletOrMobile ? 'column' : 'row'} spacing={isTabletOrMobile? 0 : 0}>
        <BrowserRouter>

          {isTabletOrMobile ? <Mobile/> :<Desktop />}
          {isTabletOrMobile? <Box
            sx={{
              width: 300,
              height: 40,
            }}
          /> : <Box
            sx={{
              width: 372,
              height: "100vh",
            }}
          />}
          <Switch>
            <Route path="/course/:id">
              <CSList />
            </Route>
            <Route path="/internships">
              <ComingSoon />
            </Route>
            <Route path="/placements">
              <ComingSoon />
            </Route>
            <Route path="/events/:id">
              <SingleEvent isTabletOrMobile={isTabletOrMobile}/>
            </Route>
            <Route path="/events">
              <Events isTabletOrMobile={isTabletOrMobile}/>
            </Route>
            <Route path="/new-events">
              <NewEvent />
            </Route>
            <Route path="/event-register"> 
              <Societyregister />
            </Route> 
            <Route path="/society-registeration/:id">
              <RegisterResult />
            </Route>
            <Route path="/">
              <Home isTabletOrMobile={isTabletOrMobile}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}
