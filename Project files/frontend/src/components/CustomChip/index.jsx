import { Box, Chip } from "@mui/material";

const CustomChip = ({ label }) => {
  // Convert hex color to rgba with 0.2 opacity
  const convertColorToRgb = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  const getChipData = (status) => {
    let color;
    let bgColor;

    switch (status) {
      case "Doctor":
        color = "#4bade8";
        bgColor = convertColorToRgb(color);
        break;
      case "Admin":
      case "Owner":
        color = "#f5a623";
        bgColor = convertColorToRgb(color);
        break;
      case "Pending":
        color = "#348BAD";
        bgColor = convertColorToRgb(color);
        break;
      case "Approved":
      case "User":
        color = "#13B981";
        bgColor = "#E7F8F2";
        break;
      case "Cancelled":
        color = "#c21717";
        bgColor = convertColorToRgb(color);
        break;
      case "Blocked":
        color = "#FF8554";
        bgColor = convertColorToRgb(color);
        break;
      default:
        color = "#292929";
        bgColor = "#dcdee4";
        break;
    }

    return { color, bgColor };
  };

  const chipData = getChipData(label);

  const chipStyle = {
    maxWidth: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    backgroundColor: chipData.bgColor,
    fontWeight: 600,
    border: `1px solid ${chipData.color}`,
    fontSize: "12px",
    padding: "0 10px",
    height: "30px",
  };

  return (
    <Box sx={chipStyle}>
      <Chip
        label={label}
        variant="outlined"
        sx={{
          border: "none",
          color: chipData.color,
        }}
      />
    </Box>
  );
};

export default CustomChip;
