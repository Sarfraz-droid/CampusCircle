import React from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";

function SocietyRegistrationReport() {
  const { id } = useParams();

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Typography variant="heading">
        {id == "success"
          ? "ThankYou for Filling Up the Form. We Will soon verify and Send your Society Code to your email address"
          : "Sorry, We are unable to process your request. Please try again later"}
      </Typography>
    </Grid>
  );
}

export default SocietyRegistrationReport;
