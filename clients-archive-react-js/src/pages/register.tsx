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
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { forwardRef, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SnackBarRegisterLogin } from "../components/snack-bar";
import { IUserRequest } from "../interface/user";
import api from "../services";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useToken } from "../providers/token";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      return navigate("/home");
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const { authenticated } = useToken();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmitFunction = ({ name, email, password }: IUserRequest) => {
    const user = {
      name,
      email,
      password,
    };
    api
      .post("/users", user)
      .then(async (_) => {
        setSeverity("success");
        setMessage("Cadastro Realizado! Você será redirecionado.");
        setOpen(true);
        await delay(3000);
        navigate("/");
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(
          `${
            err.response.data.message == "This email already exists"
              ? "Esse email já está cadastrado"
              : err.response.data.message
          }`
        );
        setOpen(true);
        // console.log(err);
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
            width: { xs: 250, sm: 400, md: 700 },
            backgroundColor: "#E0E0E0",
            "&:hover": {
              backgroundColor: "#cfcccc",
            },
            borderRadius: "15px",
          }}
        >
          <Typography variant={matchesSm ? "h5" : "h3"} sx={{ p: 3 }}>
            Register
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              width: { xs: "80%", sm: "60%" },
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
              sx={{ width: { sm: "50%", md: "40%" }, mt: "12px" }}
            >
              Cadastrar
            </Button>
            <Typography
              variant={matchesSm ? "body2" : "subtitle1"}
              sx={{ p: 1 }}
            >
              Já tem conta? Vá para o <Link to="/">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <SnackBarRegisterLogin
        open={open}
        setOpen={setOpen}
        message={message}
        severity={severity}
      />
    </>
  );
};
