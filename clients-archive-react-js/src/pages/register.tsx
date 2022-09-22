import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = () => {
    console.log("hellow");
  };

  return (
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
  );
};
