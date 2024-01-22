import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import { CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";

// Pages
import Homepage from "./components/pages/Homepage";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import NotFound404 from "./components/pages/NotFound404";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";


// Admin
import { HomePagesAdmin } from "./components/pages/admin/HomePagesAdmin";
import ManageUser from "./components/pages/admin/ManageUser";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import PageProduct from "./components/pages/admin/product/PageProduct";

// User
import { HomePagesUser } from "./components/pages/users/HomePagesUser";

// Routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import Cart from "./components/pages/Cart";

function App() {
    const dispatch = useDispatch();
    const idToken = localStorage.getItem("token");

    currentUser(idToken)
        .then((res) => {
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
                <Route path="/" element={<><ResponsiveAppBar /><Homepage /></>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Other Routes */}
                <Route path="/product/:id" element={<Product />} />
                <Route path="/shop" element={<><ResponsiveAppBar /><Shop /></>} />
                <Route path="/cart" element={<><ResponsiveAppBar /><Cart /></>} />

                {/* User */}
                <Route path="/user/index" element={<UserRoute><HomePagesUser /></UserRoute>} />

                {/* Admin Routes */}
                <Route path="/admin/viewtable" element={<AdminRoute><PageProduct /></AdminRoute>} />
                <Route path="/admin/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
                <Route path="/admin/update-product/:id" element={<AdminRoute><UpdateProduct /></AdminRoute>} />
                <Route path="/admin/product" element={<AdminRoute><PageProduct /></AdminRoute>} />
                <Route path="/admin/create-category" element={<AdminRoute><CreateCategory /></AdminRoute>} />
                <Route path="/admin/update-category/:id" element={<AdminRoute><UpdateCategory /></AdminRoute>} />
                <Route path="/admin/manage" element={<AdminRoute><ManageUser /></AdminRoute>} />
                <Route path="/admin/index" element={<AdminRoute><HomePagesAdmin /></AdminRoute>} />

                <Route path="/edit/:id" element={<AdminRoute><UpdateProduct /></AdminRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
