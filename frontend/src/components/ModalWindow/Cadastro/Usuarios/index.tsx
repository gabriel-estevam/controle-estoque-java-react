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
    open: boolean;
    formSubmit: () => void;
    handleClose: () => void;
};

export const ModalCadastroUsuario: React.FC<IProps> = ({ open, handleClose, titulo, children, formSubmit }) => {
    return (
        <Dialog open={open} /*onClose={handleClose}*/ PaperProps={{style: { maxWidth: "800px", height: "500px"}}}>
                <DialogTitle>
                    {titulo} 
                    <IconButton sx={{float: "right"}} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent  
                    dividers 
                    sx={{ 
                        height: '500px', 
                        width: '700px',
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
                    <Button 
                        onClick={formSubmit}
                        variant="contained" 
                        color="primary"
                        disableElevation
                    >Adicionar Usuário</Button>
                </DialogActions>

        </Dialog>
    );
};