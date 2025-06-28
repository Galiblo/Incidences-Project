import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import MyMessage from "./MyMessage";
import { React, useState } from "react";

const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const [ShowMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    }).then((response) => {
      setShowMessage(true);
    });
  };

  return (
    <div className={"myBackground"}>
      {ShowMessage ? (
        <MyMessage
          text={
            "If your email exists you have received an email with instructions to reset your password"
          }
          color={"#69C9AB"}
        />
      ) : null}
      <form onSubmit={handleSubmit(submission)}>
        <Box className={"whitebox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Password reset</Box>
          </Box>
          <Box className={"itemBox"}>
            <TextField label={"Email"} name={"email"} control={control} />
          </Box>
          <Box className={"itemBox"}>
            <ButtonForm label={"Request password reset"} type={"submit"} />
          </Box>
          <Box
            className="itemBox"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              to="/"
              style={{
                textAlign: "center",
                textDecoration: "none",
                color: "#1976d2",
              }}
            >
              Go back
            </Link>
          </Box>

          <Box className={"itemBox"} sx={{ flexDirection: "column" }}></Box>
        </Box>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
