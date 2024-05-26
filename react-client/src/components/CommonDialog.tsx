import React from "react";
import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

const PaddedDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

type CommonModalProps = {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
} & DialogProps;

const CommonDialog = ({
  open,
  onClose,
  title,
  children,
  ...restProps
}: CommonModalProps) => (
  <Dialog open={open} onClose={onClose} {...restProps}>
    <DialogTitle>{title}</DialogTitle>
    <PaddedDialogContent>{children}</PaddedDialogContent>
  </Dialog>
);

export default CommonDialog;
