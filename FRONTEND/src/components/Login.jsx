import "../App.css";
import { React, useState } from "react";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import MyMessage from "./MyMessage";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [ShowMessage, setShowMessage] = useState(false);
  const submission = (data) => {
    AxiosInstance.post(`login/`, {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("Token", response.data.token);
        navigate(`/home`);
      })
      .catch((error) => {
        setShowMessage(true);
        console.error("Error during login", error);
      });
  };
  return (
    <div className={"myBackground"}>
      {ShowMessage ? (
        <MyMessage text={"Login has failed, please try again"} color={'#FF0011'} />
      ) : null}
      <form onSubmit={handleSubmit(submission)}>
        <Box className={"whitebox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Login</Box>
          </Box>
          <Box className={"itemBox"}>
            <TextField label={"Email"} name={"email"} control={control} />
          </Box>
          <Box className={"itemBox"}>
            <PasswordField
              label={"Password"}
              name={"password"}
              control={control}
            ></PasswordField>
          </Box>
          <Box className={"itemBox"}>
            <ButtonForm label={"Login"} type={"submit"} />
          </Box>
          <Box className={"itemBox"} sx={{ flexDirection: "column" }}>
            <span>Don't have an account?&nbsp;</span>
            <Link to={"/register"}>Register here</Link> <br />
            <Link to={"/request/password_reset"}>Forgot password?</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login;
