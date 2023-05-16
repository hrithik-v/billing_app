import Invoice from "./components/invoice/index";
import Register from "./components/register";
import Login from "./components/login";
import "./styles/register.css";
import "./styles/layout.css";
import "./styles/search.css";
import "./styles/login.css";
import "./styles/invoice.css";
import Search from "./components/search/search";
import UserLayout from "./components/layout/userLayout";
import GuestLayout from "./components/layout/guestLayout";
import Test from "./test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<Invoice />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
