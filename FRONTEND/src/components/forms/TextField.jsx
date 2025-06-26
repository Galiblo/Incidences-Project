import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function textField(props) {
  const { label, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="outlined-basic"
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
          className={"form"}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
