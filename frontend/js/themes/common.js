import { createTheme } from "@mui/material";
import { blue, grey, yellow } from '@mui/material/colors';
export const CommonTheme = createTheme({
    palette: {
        primary: {
            main: blue['A400']
        },
        secondary: {
            main: grey['A700'],
            contrastText: '#ffffff',
        },
        warning: {
            main: yellow[700],
        },
    },
    typography: {
        button: {
            textTransform: "none",
        },
    },
});
