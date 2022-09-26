import { Button, Typography, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect, useState } from "react";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IClients } from "../interface/clients";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ClientsCard = ({
  DOR,
  email,
  id,
  name,
  telephone,
  user,
}: IClients) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const date = new Date(DOR);
  const dateStr = date.toLocaleString("pt-BR").substring(0, 10);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          m: 1,
          width: { xs: "80%", sm: "60%" },
          minHeight: "80px",
          backgroundColor: "#948c8c",
          borderRadius: "20px",
        }}
      >
        <Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ display: "inline" }}>
              {name}
            </Typography>
            <Box>
              <ModeEditIcon sx={{ pr: 1 }} onClick={handleOpen} />
              <DeleteIcon />
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { sm: "space-between" },
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
              Email: {email}
            </Typography>
            <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
              Contato: {telephone}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ pl: 1, display: "inline", pr: 2 }}
            >
              Data de registro: {dateStr}
            </Typography>
            <Button variant="contained">
              <Link
                to="/contacts"
                style={{ textDecoration: "none", color: "white" }}
              >
                Adicionar Contatos
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Nome Completo"
              variant="standard"
              value={"João Marques Oliveira"}
              sx={{ width: "300px" }}
            />
            <Box>
              <ModeEditIcon sx={{ pr: 1 }} onClick={handleOpen} />
              <DeleteIcon />
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: { xs: "column", sm: "column" },
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#b63737",
            }}
          >
            <TextField
              label="Email"
              variant="standard"
              value={"joao.marques@oliveira.com"}
              sx={{ width: "300px" }}
            />
            <TextField
              label="Contato"
              variant="standard"
              value={"85 9 99958478"}
              sx={{ width: "120px", pr: 1 }}
            />
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Data de Registro"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
