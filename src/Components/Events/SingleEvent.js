import React,{ useState , useEffect } from 'react'
import {useHistory,useParams} from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";

import axios from "axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    heading: {
        marginTop: theme.spacing(5),
        fontSize: "2rem",
        [theme.breakpoints.down("laptop")]: {
            fontSize: "1.5rem",
            
        }
    },
    grid:{
        marginLeft: theme.spacing(5),
        [theme.breakpoints.down("laptop")]: {
            marginLeft: 0,
            width: "100%"
        }
    },
    body:{
        [theme.breakpoints.down("laptop")]:{
        }
    }
}))

function SingleEvent(props) {

    const classes = useStyles();

    const [event,setEvent] = useState({
        title:"",
        description:"",
        body: "Please Waitt",

    });
    const {id} = useParams();

    useEffect(() => {
        if(id!==undefined){
            axios.post(`https://campus-circle.herokuapp.com/events/${id}`).then(res=>{
                setEvent(res.data);
            })   
        }
    }, [id])

    return (
        <Grid container direction="column" alignItems={props.isTabletOrMobile ? "center" : "left"} spacing={2} className={classes.grid}>
            <Grid item className={classes.heading}>
                <Typography variant="heading" >{event.title}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="eventDescription">{event.description}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="eventDescription" className={classes.body}>
                    {ReactHtmlParser(event.body)}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default SingleEvent
