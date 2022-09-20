import { Route, Routes, Link } from "react-router-dom";
import { Contacts } from "../pages/contacts";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  );
};
