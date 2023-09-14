import { Box, Button, TextField } from "@mui/material";
import React from "react";

function LandingPage() {
  return (
    <>
      <Box className="search_field_container">
        <TextField
          className="search_field"
          id="outlined-basic"
          label="Search collections ..."
          variant="outlined"
          InputProps={{
            autoComplete: "off", // Disable autocomplete
          }}
        />
        <Button variant="contained" color="secondary" size="large">
          Find
        </Button>
      </Box>
    </>
  );
}

export default LandingPage;
