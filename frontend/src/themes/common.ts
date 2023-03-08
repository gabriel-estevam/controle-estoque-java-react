import { createTheme } from "@mui/material";
import { grey, yellow } from '@mui/material/colors';

export const CommonTheme = createTheme({
    palette: {
        secondary: {
            main: grey[600],
            contrastText: '#ffffff',
        },

        warning: {
            main: yellow[700],
        }
    },
    typography: {
        button: {
          textTransform: "none",
        },
      },
});