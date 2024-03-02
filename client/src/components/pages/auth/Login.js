import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux"; // Import useSelector

// function
import { login } from "../../functions/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../store/userSlice";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const js = {
      username: data.get("username"),
      password: data.get("password"),
    };

    login(js)
      .then((res) => {
        toast.success(
          "ผู้ใช้ " + res.data.payload.user.username + " เข้าสู่ระบบสำเร็จ"
        );
        dispatch(
          loginRedux({
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
            user_id: res.data.payload.user.user_id, // Update to user_id
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRedirects(res.data.payload.user.role);
      })
      .catch((err) =>
        toast.error(err.response.data, {
          position: "top-left",
        })
      );
  };

  const roleRedirects = (role) => {
    let intended = location.state;
    if (intended) {
      navi("../" + intended);
    } else {
      if (role === "admin") {
        navi("/admin/index");
      } else {
        navi("/user/index");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(assets/logo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: "200px" }}
            >
              เข้าสู่ระบบ
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อผู้ใช้"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="จดจำในระบบ"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
              <Grid container>
                <Grid item>
                  <p>
                    หากคุณยังไม่ได้เป็นสมาชิก
                    <Link
                      href="/register"
                      variant="body2"
                      style={{ fontSize: "20px", textDecoration: "none" }}
                    >
                      {" สมัครสมาชิก "}
                    </Link>
                    ได้ที่นี้
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
