import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function ListItem() {
  return (
    <div>
      <Card sx={{ minWidth: 275, display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "12rem",
            backgroundColor: "#616190",
          }}
        >
          <MenuBookIcon />
        </Box>

        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Record type
          </Typography>
          <Typography variant="h5" component="div">
            Title, creator, year
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Holding institution
          </Typography>
          <Typography variant="body2">Additional metadata</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ListItem;
