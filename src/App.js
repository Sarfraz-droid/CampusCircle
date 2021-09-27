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
import { useMediaQuery } from 'react-responsive'


export default function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <ThemeProvider theme={theme}>
      <Stack direction={isTabletOrMobile ? 'column' : 'row'} spacing={isTabletOrMobile? 0 : 10}>
        <BrowserRouter>

          {isTabletOrMobile ? <Mobile/> :<Desktop />}
          {isTabletOrMobile? <Box
            sx={{
              width: 300,
              height: 40,
            }}
          /> : <Box
            sx={{
              width: 300,
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
            <Route path="/events">
              <ComingSoon />
            </Route>
          </Switch>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}
