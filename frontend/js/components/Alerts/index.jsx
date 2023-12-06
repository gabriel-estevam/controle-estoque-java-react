import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Box, Collapse, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
export const AlertMessage = ({ sucesso, message, open }) => {
    // const [openAlert, setOpenAlert] = useState(false);
    //console.log(openAlert)
    return (<Box sx={{ width: '100%' }}>
            <Collapse in={open}>
            <Alert severity="success" color="success" action={<IconButton onClick={() => { let openAlert = false; open = openAlert; }}>
                        <Close />
                    </IconButton>}>
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
            </Alert>
            </Collapse>
        </Box>);
};
