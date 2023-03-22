import React, { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface IProps {
    children?: ReactNode;
    titulo: string;
    open: boolean;
    formSubmit: () => void;
    handleClose: () => void;
};

export const ModalCadastroUsuário: React.FC<IProps> = ({ open, handleClose, titulo, children, formSubmit }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titulo}</DialogTitle>
                <DialogContent dividers sx={{ height: '600px', width: '600px'}}>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={formSubmit}>Salvar</Button>
                </DialogActions>

        </Dialog>
    );
};