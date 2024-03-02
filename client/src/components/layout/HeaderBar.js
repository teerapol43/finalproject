import react, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        navigate("/");
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* search  */}
            <Box display="flex" borderRadius="3px" backgroundColor="#F5EFE7">
            </Box>
            {/* icons */}
            <Box display="flex">
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon onClick={handleMenu} />
                    <Menu style={{ marginTop: '30px' }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link to="/user/profileadmin" className="Adminmenu-bars" >
                            <MenuItem onClick={handleClose}>โปรไฟล์</MenuItem>
                        </Link>

                        <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>

                    </Menu>
                </IconButton>
            </Box>
        </Box>
    );
};

export default HeaderBar;