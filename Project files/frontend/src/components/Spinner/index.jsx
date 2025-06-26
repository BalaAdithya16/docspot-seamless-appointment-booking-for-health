import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ size, color }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default Spinner;
