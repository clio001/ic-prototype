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
import MapIcon from "@mui/icons-material/Map";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import listitem from "../styles/listitem.module.css";
import { useRouter } from "next/navigation";
function ListItem(props) {
  const record = props.recordElement;
  const router = useRouter();

  const recordIcon = () => {
    if (record.dcFormat[record.dcFormat.length - 1] == "Band") {
      return <MenuBookIcon />;
    } else if (record.dcFormat[record.dcFormat.length - 1] == "Blatt") {
      return <MapIcon />;
    } else if (
      record.dcFormat[record.dcFormat.length - 1] == "Online-Ressource"
    ) {
      return <DvrOutlinedIcon />;
    } else {
      return <HelpOutlineOutlinedIcon />;
    }
  };
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
        {recordIcon()}
      </Box>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {record.dcDate}, {record.dcFormat[record.dcFormat.length - 1]}
        </Typography>
        <Typography variant="h6" component="div">
          {record.dcTitle.length > 150
            ? record.dcTitle.slice(0, 150) + " ..."
            : record.dcTitle}
        </Typography>
        <Typography color="text.secondary">{record.dcContributor}</Typography>
        <Box
          sx={{ display: "flex", justifyContent: "start", marginTop: "1rem" }}
        >
          {" "}
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/listview/${record.dcPPN}`);
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ListItem;
