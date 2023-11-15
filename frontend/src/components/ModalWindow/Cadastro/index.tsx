import React, { ReactNode } from 'react';
import { 
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle, 
        IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    children?: ReactNode;
    titulo: string;
    tituloButtonAdd?: string;
    tituloButtonEdit?: string;
    heightDialog?: string;
    open: boolean;
    edit?: boolean;
    formSubmit: () => void;
    handleClose: () => void;
};

export const ModalCadastro: React.FC<IProps> = 
({ open, 
   handleClose, 
   titulo, 
   tituloButtonAdd, 
   tituloButtonEdit, 
   edit, 
   children, 
   formSubmit,
   heightDialog
}) => {
    return (
        <Dialog open={open} /*onClose={handleClose}*/ PaperProps={{style: { maxWidth: "950px", maxHeight: "500px"}}}>
            <DialogTitle>
                {titulo} 
                <IconButton sx={{float: "right"}} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent  
                dividers 
                sx={{ 
                    height: heightDialog != null  ? heightDialog : '500px' , 
                    width: '950px',
                    paddingY: 0,
                    paddingX: 0,
                }}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose} 
                    variant="contained" 
                    color="secondary"
                    disableElevation
                >Cancelar</Button>
                { edit ? 
                    <Button 
                    onClick={formSubmit}
                    variant="contained" 
                    color="warning"
                    disableElevation
                    >{tituloButtonEdit}</Button>
                    : 
                    <Button 
                    onClick={formSubmit}
                    variant="contained" 
                    color="primary"
                    disableElevation
                    >{tituloButtonAdd}</Button>                  
                }
            </DialogActions>

        </Dialog>
    );
};