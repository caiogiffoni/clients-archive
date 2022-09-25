import { Button, Container, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";
import { useToken } from "../providers/token";
import { useUsername } from "../providers/username";

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

export const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setToken, token } = useToken();
  const { username } = useUsername();

  console.log(token);
  console.log(username);

  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Typography variant="h3" sx={{ p: 3 }}>
          Bem vindo, João!
        </Typography>
        <Box
          sx={{
            mt: "25px",
            width: "99vw",
            minHeight: "400px",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              m: 1,
              width: "60%",
              minHeight: "80px",
              backgroundColor: "red",
            }}
          >
            <Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ display: "inline" }}>
                  João Marques Oliveira
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
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
                  Email: joao.marques@oliveira.com
                </Typography>
                <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
                  Contato: 85 9 99958478
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
                <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
                  Data de registro: 25/12/2022
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
              justifyContent: "space-between",
              alignItems: "center",
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
