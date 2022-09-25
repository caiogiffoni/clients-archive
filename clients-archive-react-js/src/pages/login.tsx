import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import {
  AlertColor,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../interface/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services";
import { SnackBarRegisterLogin } from "../components/snack-bar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import jwt_decode from "jwt-decode";
import { ITokenDecoded } from "../interface/token";
import { useToken } from "../providers/token";
import { useUsername } from "../providers/username";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { setToken, token } = useToken();
  const { setUsername } = useUsername();

  console.log(token);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Campo obrigatório!")
      .email("E-mail inválido!"),
    password: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const navigate = useNavigate();

  const onSubmitFunction = ({ email, password }: IUserLogin) => {
    const login = {
      email,
      password,
    };
    api
      .post("/login", login)
      .then(async (res) => {
        const { token } = res.data;
        localStorage.setItem("@CA:token", JSON.stringify(token));
        setToken(token);
        const decoded: ITokenDecoded = jwt_decode(token);
        const { name } = decoded;

        localStorage.setItem("@CA:username", JSON.stringify(name));
        setUsername(name);

        setSeverity("success");
        setMessage(
          "Login Realizado! Você será redirecionado para o dashboard."
        );
        setOpen(true);
        await delay(3000);
        navigate("/home");
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(
          `${
            err.response.data.message == "Wrong email/password"
              ? "Email ou senha incorretos"
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
          justifyContent="center"
          sx={{
            width: { xs: 280, sm: 500, md: 700 },
            backgroundColor: "#E0E0E0",
            "&:hover": {
              backgroundColor: "#cfcccc",
            },
            borderRadius: "15px",
          }}
        >
          <Typography variant={matchesSm ? "h5" : "h3"} sx={{ p: 3 }}>
            Login
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
            <Button
              onClick={handleSubmit(onSubmitFunction)}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ width: { sm: "50%", md: "40%" }, mt: "12px" }}
            >
              Logar
            </Button>
            <Typography
              variant={matchesSm ? "body2" : "subtitle1"}
              sx={{ p: 1 }}
            >
              Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
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
