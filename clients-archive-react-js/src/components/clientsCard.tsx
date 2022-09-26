import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlertColor,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { ModalConfirmationEdit } from "../components/modalConfirmationEdit";
import { IClientDelete, IClientPost } from "../interface/clients";
import { useClients } from "../providers/clients";
import { useToken } from "../providers/token";
import api from "../services";

import { IClients } from "../interface/clients";
import { ModalConfirmationDelete } from "./modalConfirmationDelete";
import { SnackBarRegisterLogin } from "./snack-bar";

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

  const date = new Date(DOR);
  const dateStr = date.toLocaleString("pt-BR").substring(0, 10);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModalEdit, setOpenModalEdit] = useState(false);

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

  type FormValues = {
    name: string;
    email: string;
    telephone: string;
  };

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

  const { token } = useToken();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [openToast, setOpenToast] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { refreshClients, clients } = useClients();

  const onSubmitFunction = ({ name, email, telephone }: IClientPost) => {
    const client = {
      name,
      email,
      telephone,
    };
    api
      .patch(`/client/${id}`, client, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (_) => {
        setSeverity("success");
        setMessage("Cliente editado!");
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

  const deleteClient = ({id}: IClientDelete) => {
    api
      .delete(`/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (_) => {
        setSeverity("success");
        setMessage("Cliente deletado!");
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
              <DeleteIcon onClick={() => setOpenDelete(true)} />
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
                to={`/contacts/${id}`}
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
              defaultValue={name}
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
              defaultValue={email}
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
              defaultValue={telephone}
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
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmitFunction)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              Deletar
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* <ModalConfirmationEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        sendPatch={onSubmitFunction}
      /> */}
      <ModalConfirmationDelete
        open={openDelete}
        setOpen={setOpenDelete}
        id={id}
        deleteClient={deleteClient}
      />
      <SnackBarRegisterLogin
        open={openToast}
        setOpen={setOpenToast}
        message={message}
        severity={severity}
      />
    </>
  );
};
