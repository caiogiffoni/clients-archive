import { Route, Routes, Link } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
