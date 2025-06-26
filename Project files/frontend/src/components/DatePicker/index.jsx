import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePicker({
  name,
  value,
  handleChange,
  label,
  minDate,
  inputFormat,
  maxDate,
  openTo,
  views,
  disabled,
  formik,
  variant,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ width: "100%" }}>
        <DesktopDatePicker
          label={label}
          openTo={openTo}
          views={views || ["day"]}
          inputFormat={inputFormat || "DD/MM/YYYY"}
          disabled={disabled}
          minDate={minDate || new Date("1900-01-01T00:00:00.000Z")}
          maxDate={maxDate || new Date("2100-01-01T00:00:00.000Z")}
          value={value}
          onChange={handleChange}
          className={
            formik?.touched?.[name] && formik?.errors?.[name] ? "error" : ""
          }
          InputProps={{
            sx: {
              borderRadius: "5px",
              height: "50px",
              background: "#fff",
              border: "none",
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
                textTransform: "uppercase",
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              variant={variant || "outlined"}
              error={Boolean(
                formik?.touched?.[name] && formik?.errors?.[name]
              )}
              name={name}
              fullWidth
              {...params}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
