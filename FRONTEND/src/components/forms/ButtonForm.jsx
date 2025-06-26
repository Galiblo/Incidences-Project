import * as React from "react";
import Button from "@mui/material/Button";

export default function ButtonForm(props) {
  const { label, type } = props;
  return (
      <Button type={type} variant="contained" className = {"buttonClass"}>{label}</Button>
  );
}
