import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

export const Login = () => {
  const [count, setCount] = useState(0);

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
        justifyContent="center"
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
          Login
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
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ width: "30%", mt: "12px" }}
          >
            Logar
          </Button>
          <Typography variant="subtitle1" sx={{ p: 1 }}>
            Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
