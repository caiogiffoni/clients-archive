import {
  AlertColor,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUsername } from "../providers/username";
import { useClients } from "../providers/clients";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { IContact, IContactPost } from "../interface/contacts";
import api from "../services";
import { useToken } from "../providers/token";
import { SnackBarRegisterLogin } from "../components/snack-bar";
import { ContactsCard } from "../components/contactCard";
import { useContacts } from "../providers/contact";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
};

export const Contacts = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { username } = useUsername();
  const { refreshContacts, contacts } = useContacts();
  const { refreshClients, clients } = useClients();
  let { clientId } = useParams();
  const idClient = clientId ? clientId : "";
  const client = clients.find((c) => c.id == clientId);

  const dorAdjust = client ? new Date(client.DOR) : "";
  const date = dorAdjust.toLocaleString("pt-BR").substring(0, 10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      return navigate("/");
    }

    if (!client) {
      return navigate("/home");
    }
    refreshClients();
    refreshContacts(clientId);
  }, []);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obrigat??rio!")
      .min(5, "M??nimo 5 Caracteres"),
    email: yup
      .string()
      .required("Campo obrigat??rio!")
      .email("E-mail inv??lido!"),
    telephone: yup
      .string()
      .required("Campo obrigat??rio!")
      .min(6, "M??nimo 6 Caracteres"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { token, authenticated, setAuthenticated } = useToken();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [openToast, setOpenToast] = useState(false);

  const onSubmitFunction = ({ name, email, telephone }: IContactPost) => {
    const contact = {
      name,
      email,
      telephone,
    };
    api
      .post(`/contact/${clientId}`, contact, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async () => {
        setSeverity("success");
        setMessage("Contato cadastrado!");
        setOpenToast(true);
        setOpen(false);
        refreshContacts(clientId);
        reset();
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(
          `${
            err.response.data.message ==
            "This email already exists on your contacts for this client"
              ? "Esse email j?? est?? cadastrado para esse cliente"
              : err.response.data.message
          }`
        );
        setOpenToast(true);
        // console.log(err);
      });
  };

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
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              m: 1,
              width: { xs: "80%", md: "60%" },
              minHeight: "80px",
              backgroundColor: "#adabab",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ p: 1 }}>
                Cliente:
              </Typography>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ display: "inline" }}>
                  {client && client.name}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#d1caca",
                    borderRadius: "5px",
                    mr: 1,
                  }}
                >
                  <ArrowBackIcon onClick={() => navigate("/home")} />
                </Box>
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <Typography variant="body2" sx={{ pl: 1, display: "inline" }}>
                  Email: {client && client.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ pl: 1, display: "inline", pt: { xs: 2, sm: 0 } }}
                >
                  Contato: {client && client.telephone}
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
                  Data de registro: {client && date}
                </Typography>
              </Box>
            </Box>
            <Box
              p={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography pr={2}>Adicione aqui os contatos:</Typography>
              <Button variant="contained" onClick={handleOpen}>
                Adicionar Contatos
              </Button>
            </Box>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ p: 1 }}>
                Contato(s):
              </Typography>
              {/* <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ display: "inline" }}>
                  Jo??o Marques Oliveira
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
              </Box> */}
              {contacts &&
                contacts.map((contact) => {
                  return (
                    <ContactsCard
                      email={contact.email}
                      id={contact.id}
                      name={contact.name}
                      telephone={contact.telephone}
                      clientId={clientId}
                    />
                  );
                })}
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
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
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
