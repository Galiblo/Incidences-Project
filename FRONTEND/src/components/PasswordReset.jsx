import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import MyMessage from "./MyMessage";
import React, { useState } from "react";

// ✅ Imports para validación
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Esquema de validación con Yup
const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number"),
  password2: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [ShowMessage, setShowMessage] = useState(false);

  // ✅ useForm con Yup
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    }).then((response) => {
      setShowMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 5000); //5 seconds
    });
  };

  return (
    <div className={"myBackground"}>
      {ShowMessage && (
        <MyMessage
          text={"Your password reset was successful, you will be redirected to the login page"}
          color={"#69C9AB"}
        />
      )}
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
              error={errors.password?.message}
            />
          </Box>

          <Box className={"itemBox"}>
            <PasswordField
              label={"Confirm Password"}
              name={"password2"}
              control={control}
              error={errors.password2?.message}
            />
          </Box>

          <Box className={"itemBox"}>
            <ButtonForm label={"Reset Password"} type={"submit"} />
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default PasswordReset;
