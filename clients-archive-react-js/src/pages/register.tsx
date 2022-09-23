import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { IUserRequest } from "../interface/user";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import api from "../services";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Register = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obrigatório!")
      .min(5, "Mínimo 5 Caracteres"),
    email: yup
      .string()
      .required("Campo obrigatório!")
      .email("E-mail inválido!"),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um símbolo"
      )
      .required("Campo obrigatório!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não coincidem!")
      .required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmitFunction = ({ name, email, password }: IUserRequest) => {
    const user = {
      name,
      email,
      password,
    };
    setOpen(true);
    navigate("/");
    api
      .post("/users", user)
      .then(async (_) => {
        setOpen(true);
        await delay(3000);
        navigate("/");
      })
      .catch((err) => {
        // toast({
        //   title: `${
        //     err.response.data === "Email already exists"
        //       ? "Email já existente"
        //       : err.response.data.message
        //   }`,
        //   status: "error",
        //   isClosable: true,
        // });
        
        console.log(err);
      });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "98vh",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            width: 700,
            backgroundColor: "#E0E0E0",
            "&:hover": {
              backgroundColor: "#cfcccc",
            },
            borderRadius: "15px",
          }}
        >
          <Typography variant="h3" sx={{ p: 3 }}>
            Register
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              width: "60%",
              borderRadius: "15px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email?.message}
              helperText={
                !!errors.email?.message ? (errors.email?.message as string) : ""
              }
            />
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              {...register("name")}
              error={!!errors.name?.message}
              helperText={
                !!errors.name?.message ? (errors.name?.message as string) : ""
              }
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              {...register("password")}
              error={!!errors.password?.message}
              helperText={
                !!errors.password?.message
                  ? (errors.password?.message as string)
                  : ""
              }
            />
            <TextField
              id="outlined-basic"
              label="Confirmação de senha"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              {...register("confirmPassword")}
              error={!!errors.confirmPassword?.message}
              helperText={
                !!errors.confirmPassword?.message
                  ? (errors.confirmPassword?.message as string)
                  : ""
              }
            />
            <Button
              onClick={handleSubmit(onSubmitFunction)}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ width: "40%", mt: "12px" }}
            >
              Cadastrar
            </Button>
            <Typography variant="subtitle1" sx={{ p: 1 }}>
              Já tem conta? Vá para o <Link to="/">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Cadastro Realizado! Você será redirecionado.
        </Alert>
      </Snackbar>
    </>
  );
};
