import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import MyMessage from "./MyMessage";
import { React, useState } from "react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const { token } = useParams();
  console.log(token);

  const [ShowMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    }).then((response) => {
      setShowMessage(true);
      setTimeout(() => {
        navigate("/")
      }, 2000);
    });
  };

  return (
    <div className={"myBackground"}>
      {ShowMessage ? (
        <MyMessage text={"Your password reset was succesfull, you will be redirected to the login page"} />
      ) : null}
      <form onSubmit={handleSubmit(submission)}>
        <Box className={"whitebox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Reset password</Box>
          </Box>
          <Box className={"itemBox"}>
            <PasswordField
              label={"Password"}
              name={"password"}
              control={control}
            ></PasswordField>
          </Box>
          <Box className={"itemBox"}>
            <PasswordField
              label={"Confirm Password"}
              name={"password2"}
              control={control}
            ></PasswordField>
          </Box>

          <Box className={"itemBox"}>
            <ButtonForm label={"Reset Password"} type={"submit"} />
          </Box>
          <Box className={"itemBox"} sx={{ flexDirection: "column" }}></Box>
        </Box>
      </form>
    </div>
  );
};

export default PasswordReset;
