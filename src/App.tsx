import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Routers } from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return <Routers />;
}

export default App;
