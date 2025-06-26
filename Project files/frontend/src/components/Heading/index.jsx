// React Imports
import React from "react";
// MUI Imports
import { Box } from "@mui/material";

const root = {
  fontSize: "25px",
  fontWeight: "700",
  whiteSpace: "wrap !important",
  color: "#49454F",

  "@media screen and (max-width: 425px)": {
    fontSize: "18px",
  },

  "@media screen and (max-width: 375px)": {
    fontSize: "15px",
  },
};

const subRoot = {
  fontSize: "15px",
  fontWeight: "500",
  whiteSpace: "wrap !important",
  color: "#49454F",

  "@media screen and (max-width: 425px)": {
    fontSize: "12px",
  },

  "@media screen and (max-width: 320px)": {
    fontSize: "12px",
  },
};

export const Heading = ({ children, sx }) => {
  return <Box sx={{ ...root, ...(sx || {}) }}>{children}</Box>;
};

export const SubHeading = ({ children, sx }) => {
  return <Box sx={{ ...subRoot, ...(sx || {}) }}>{children}</Box>;
};
