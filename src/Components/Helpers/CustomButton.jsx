import React from "react";
import Button from "@mui/material/Button";

function CustomButton({ children, ...props }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: "#0d9eb5",
        "&:hover": {
          backgroundColor: "white",
          color: "#0d9eb5",
        },
      }}
      // onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
