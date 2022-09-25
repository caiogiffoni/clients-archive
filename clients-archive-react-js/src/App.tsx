import { useState } from "react";
import reactLogo from "./assets/react.svg";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Routers } from "./routes";
import { TokenProvider } from "./providers/token";

function App() {
  return <Routers />;
}

export default App;
