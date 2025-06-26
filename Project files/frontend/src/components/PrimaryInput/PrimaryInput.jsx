import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import Spinner from "../Spinner";

const PrimaryInput = ({
  label,
  placeholder,
  type,
  fullWidth = true,
  startAdornment,
  endAdornment,
  name,
  onClick,
  onChange,
  value,
  onBlur,
  helperText,
  sx,
  minRows,
  maxRows,
  readOnly = false,
  multiline = false,
  required = false,
  error = false,
  disabled = false,
  variant,
  autoFocus,
  loading = false,
  borderRadius,
  inputRef,
}) => {
  return (
    <TextField
      id={name}
      error={error}
      label={label}
      required={required}
      autoFocus={autoFocus}
      inputRef={inputRef}
      sx={[
        {
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "2px !important",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "14px",
          },
          "& .MuiOutlinedInput-input": {
            cursor: readOnly ? "not-allowed" : "",
          },
        },
        sx,
      ]}
      onChange={onChange}
      name={name}
      type={type}
      value={value || ""}
      variant={variant || "outlined"}
      fullWidth={fullWidth}
      multiline={multiline}
      placeholder={placeholder}
      onBlur={onBlur}
      disabled={disabled}
      helperText={helperText || ""}
      minRows={minRows || (multiline ? 6 : undefined)}
      maxRows={maxRows || (multiline ? 6 : undefined)}
      InputProps={{
        sx: {
          borderRadius: borderRadius || "5px",
          background: "#fff",
          height: multiline ? "auto" : "50px",
          border: "none",
        },
        readOnly: readOnly,
        startAdornment: startAdornment ? (
          <InputAdornment position="start">
            <Box>{startAdornment}</Box>
          </InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">
            <Box
              onClick={onClick || null}
              sx={{ cursor: "pointer" }}
            >
              {endAdornment}
            </Box>
          </InputAdornment>
        ) : loading ? (
          <Spinner />
        ) : null,
        inputProps: {
          min: 0,
          onKeyDown: (event) => {
            if (event.key === "-" && type === "number") {
              event.preventDefault();
            }
          },
        },
      }}
    />
  );
};

export default PrimaryInput;
