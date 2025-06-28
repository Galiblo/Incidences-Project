import "../App.css";
import { Box } from "@mui/material";
import TextField from "./forms/TextField";
import PasswordField from "./forms/PasswordField";
import ButtonForm from "./forms/ButtonForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
    password2: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const { handleSubmit, control } = useForm({resolver: yupResolver(schema)});
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
