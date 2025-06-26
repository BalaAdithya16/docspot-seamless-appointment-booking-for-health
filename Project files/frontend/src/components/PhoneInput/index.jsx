import MuiPhoneNumber from "mui-phone-number";
import { removeDashAndSpace } from "../../utils";
import { useEffect, useState } from "react";
import axios from "axios";

const PrimaryPhoneInput = ({
  value,
  name,
  onChange,
  countryCode,
  label,
  formik,
  authScreens,
  disabled,
  readOnly,
  showErrorMessage,
}) => {
  const [defaultCountry, setDefaultCountry] = useState("pk");

  const getCountry = async () => {
    try {
      const response = await axios.get(
        "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
      );
      if (response?.data?.country_code !== "Not found") {
        setDefaultCountry(response.data.country_code.toLowerCase());
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (authScreens) getCountry();
  }, [authScreens]);

  const handleChange = (phone) => {
    if (onChange) {
      onChange(phone);
    } else if (formik) {
      formik.setFieldValue(name, removeDashAndSpace(phone));
    }
  };

  return (
    <MuiPhoneNumber
      name={name}
      value={value}
      onChange={handleChange}
      defaultCountry={countryCode?.toLowerCase() || defaultCountry}
      label={label}
      variant="outlined"
      fullWidth
      disabled={disabled}
      error={formik?.touched?.[name] && Boolean(formik?.errors?.[name])}
      helperText={
        showErrorMessage ? "" : formik?.touched?.[name] && formik?.errors?.[name]
      }
      onBlur={formik?.handleBlur}
      inputProps={{
        readOnly,
        style: { cursor: readOnly ? "not-allowed" : "text" },
      }}
      style={{
        background: "#fff",
        height: "50px",
      }}
    />
  );
};

export default PrimaryPhoneInput;
