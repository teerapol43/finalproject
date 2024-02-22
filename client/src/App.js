
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import { CssBaseline } from "@mui/material";

import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

//admin
import { HomePagesAdmin } from "./components/pages/admin/HomePagesAdmin";
import ManageUser from "./components/pages/admin/ManageUser";
//user
import { HomePagesUser } from "./components/pages/users/HomePagesUser";
//route
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

//pages
import NotFound404 from "./components/pages/NotFound404";

//function
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";

//notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./components/pages/Homepage";

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.getItem("token");
  console.log("token", idToken);
  currentUser(idToken)
    .then((res) => {
      console.log(res);
      dispatch(
        login({
          name: res.data.username,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((err) => console.log(err));
  return (
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        {/* Registers and Login Routes */}

        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={
          <>
            <ResponsiveAppBar />
            <Homepage />
          </>
        } />
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
        <Route path="/admin/manage" element={
          <AdminRoute>
            <ManageUser />
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
