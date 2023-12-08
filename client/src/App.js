
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import { CssBaseline, Box, TextField } from "@mui/material";


import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

//admin
import { HomePagesAdmin } from "./components/pages/admin/HomePagesAdmin";
//user
import { HomePagesUser } from "./components/pages/users/HomePagesUser";
//route
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

//pages


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        {/* Registers and Login Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/*User*/}
        <Route path="/user/index" element={
          <UserRoute>
            <HomePagesUser />
          </UserRoute>
        } />


        {/* Admin Routes */}

        <Route path="/admin/viewtable" element={
          <AdminRoute>
            <FormProduct />
          </AdminRoute>
        } />
        <Route path="/admin/index" element={
          <AdminRoute>
            <HomePagesAdmin />
          </AdminRoute>
        } />
        <Route path="/edit/:id" element={
          <AdminRoute>
            <FormEditProduct />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
