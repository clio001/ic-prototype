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
import listitem from "../styles/listitem.module.css";
function ListItem(props) {
  const record = props.recordElement;
  return (
    <Card
      className={listitem.item}
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "row",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "10rem",
          backgroundColor: "#616190",
        }}
      >
        <MenuBookIcon />
      </Box>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {record.dcDate}, {record.dcFormat[record.dcFormat.length - 1]}
        </Typography>
        <Typography variant="h6" component="div">
          {record.dcTitle}
        </Typography>
        <Typography color="text.secondary">{record.dcContributor}</Typography>
      </CardContent>
    </Card>
  );
}

export default ListItem;
