import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
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
        console.error("Error during login", error);
      });
  };
  return (
    <div className={"myBackground"}>
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
          <Box className={"itemBox"}>
            <span>Don't have an account?&nbsp;</span>
            <Link to={"/register"}>Register here</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login;
