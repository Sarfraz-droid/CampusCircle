import React,{useRef} from 'react'
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";

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

import { makeStyles } from "@mui/styles";

function Cam(props) {

    const webcamRef = useRef(null);

    function TakeImg() {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setWebcam({...props.webcam, image: imageSrc});
        console.log(imageSrc);
    }

    return (
        <Stack direction="row">
            <Webcam 
                audio={false}
                height={400}
                width={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"            
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
            <Button color="secondary" onClick={() => TakeImg()}>Take Photo</Button>
            </Box>
        </Stack>

    )
}

export default Cam
