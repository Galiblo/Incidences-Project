import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const submission = (data) => {
    AxiosInstance.post(`register/`, {
      email: data.email,
      password: data.password,
    }).then(() => {
      navigate(`/`);
    });
  };

  return (
    <div className={"myBackground"}>
      <form onSubmit={handleSubmit(submission)}>
        <Box className={"whitebox"}>
          <Box className={"itemBox"}>
            <Box className={"title"}>Create an account</Box>
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
            <PasswordField
              label={"Confirm password"}
              name={"password2"}
              control={control}
            ></PasswordField>
          </Box>
          <Box className={"itemBox"}>
            <ButtonForm label={"Register"} type={"submit"} />
          </Box>
          <Box className={"itemBox"}>
            <span>Already have an account? &nbsp;</span>
            <Link to={"/"}>Login here</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Register;
