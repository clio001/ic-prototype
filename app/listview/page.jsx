import { Box, Typography } from "@mui/material";
import React from "react";
import ListItem from "../components/ListItem";
import listview from "../styles/listview.module.css";

function ListView() {
  return (
    <Box className={listview.page_container}>
      <Typography variant="h4" sx={{ padding: "3rem" }}>
        Results
      </Typography>
      <Box className={listview.result_container}>
        <ListItem />
      </Box>
    </Box>
  );
}

export default ListView;
