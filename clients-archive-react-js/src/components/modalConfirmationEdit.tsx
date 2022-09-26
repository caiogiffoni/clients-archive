import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IClientPost } from "../interface/clients";

interface OpenEditModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendPatch: (data: IClientPost) => void;
}

export const ModalConfirmationEdit = ({
  open,
  setOpen,
  sendPatch,
}: OpenEditModal) => {
  //   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 100, sm: 150, md: 400 },
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CloseIcon onClick={handleClose} />
        </Box>
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Tem certeza que deseja editar esse contato? </Typography>
        </Box>
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={handleOpen}>
            Editar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
