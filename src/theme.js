import { createTheme } from '@mui/material/styles';



let theme = createTheme({
  palette: {
    primary: {
      main: '#FFFF',
    },
    secondary: {
      main: '#118D47',
      contrastText: '#FFFF',
    },
  },
  typography: {
    heading:{
      fontSize: "1.5rem",
      fontFamily: "Montserrat",
      marginTop: "1rem",
      fontWeight: 600,
      color: '#118D47'
    },
    eventDescription:{
      fontFamily: "Montserrat",
      fontSize: "1rem",
      fontWeight: 400,
      

    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1224,
      desktop: 1200,
    }
  }
});

export default theme;