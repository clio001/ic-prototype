import { Box, Typography } from "@mui/material";
import React from "react";
import navigation from "../styles/navigation.module.css";

function Navigation() {
  return (
    <div>
      <Box className={navigation.navbar_container}>
        <Box>
          <img
            src="/stabi-logo-kante-weiss.png"
            className={navigation.navbar_logo}
          />
          <img
            src="/IN_CONTEXT_Schriftzug ohne Rand weiss.png"
            className={navigation.navbar_logo}
          />
        </Box>
        <Box className={navigation.navbar_items}>
          {" "}
          <Typography>About</Typography>
          <Typography>My Workplace</Typography>
          <Typography>Documentation</Typography>
          <Typography>EN | DE</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Navigation;
