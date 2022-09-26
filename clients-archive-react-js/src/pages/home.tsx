import {
  AlertColor,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useUsername } from "../providers/username";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useClients } from "../providers/clients";
import { ClientsCard } from "../components/clientsCard";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import api from "../services";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { IClientPost } from "../interface/clients";
import { useToken } from "../providers/token";
import { SnackBarRegisterLogin } from "../components/snack-bar";
import { ModalConfirmationEdit } from "../components/modalConfirmationEdit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
};

export const Home = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obrigatório!")
      .min(5, "Mínimo 5 Caracteres"),
    email: yup
      .string()
      .required("Campo obrigatório!")
      .email("E-mail inválido!"),
    telephone: yup
      .string()
      .required("Campo obrigatório!")
      .min(6, "Mínimo 6 Caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { token, authenticated, setAuthenticated } = useToken();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  if (!authenticated) {
    return navigate("/");
  }

  const onSubmitFunction = ({ name, email, telephone }: IClientPost) => {
    const client = {
      name,
      email,
      telephone,
    };
    api
      .post("/client", client, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (_) => {
        setSeverity("success");
        setMessage("Cliente cadastrado!");
        setOpenToast(true);
        setOpen(false);
        refreshClients();
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(
          `${
            err.response.data.message ==
            "This email already exists on your client"
              ? "Esse email já está cadastrado"
              : err.response.data.message
          }`
        );
        setOpenToast(true);
        // console.log(err);
      });
  };

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { username } = useUsername();
  const { refreshClients, clients } = useClients();

  useEffect(() => {
    refreshClients();
  }, []);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, sm: 380, md: 600 },
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box>
        <Box
          pr={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={matchesSm ? "h5" : "h3"} sx={{ p: 3 }}>
            Bem vindo(a), {username}!
          </Typography>
          <Box
            p={1}
            onClick={() => {
              localStorage.clear();
              setAuthenticated("");
            }}
          >
            <Link to={`/`}>
              <LogoutIcon />
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "25px",
            width: "99vw",
            minHeight: "400px",
            backgroundColor: "#adabab",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography pr={2}>Adicione aqui seus clientes:</Typography>
            <Button variant="contained" onClick={handleOpen}>
              Adicionar Clientes
            </Button>
          </Box>
          {clients
            ? clients.map((c) => (
                <ClientsCard
                  name={c.name}
                  telephone={c.telephone}
                  DOR={c.DOR}
                  email={c.email}
                  id={c.id}
                  user={c.user}
                  key={c.id}
                />
              ))
            : "não"}
        </Box>
      </Box>

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
            <TextField
              label="Nome Completo"
              variant="standard"
              sx={{ width: "300px" }}
              {...register("name")}
              error={!!errors.name?.message}
              helperText={
                !!errors.name?.message ? (errors.name?.message as string) : ""
              }
            />
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Email"
              variant="standard"
              sx={{ pb: { xs: 2, sm: 0 } }}
              {...register("email")}
              error={!!errors.email?.message}
              helperText={
                !!errors.email?.message ? (errors.email?.message as string) : ""
              }
            />
            <TextField
              label="Contato"
              variant="standard"
              sx={{ pr: 1, width: { sm: 110 } }}
              {...register("telephone")}
              error={!!errors.telephone?.message}
              helperText={
                !!errors.telephone?.message
                  ? (errors.telephone?.message as string)
                  : ""
              }
            />
          </Box>
          <Button
            onClick={handleSubmit(onSubmitFunction)}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ width: { sm: "50%", md: "30%" }, mt: "12px" }}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
      <SnackBarRegisterLogin
        open={openToast}
        setOpen={setOpenToast}
        message={message}
        severity={severity}
      />
    </>
  );
};
