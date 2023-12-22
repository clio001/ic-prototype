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
import listitemprob from "../styles/listitemprob.module.css";
import { useRouter } from "next/navigation";
function ListItemProb(props) {
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
      className={listitemprob.item}
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "row",
        marginBottom: "2rem",
        backgroundImage:
          "linear-gradient(80deg, rgba(255,255,255,1) 70%, rgba(236,220,29,1) 100%)",
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
          sx={{
            display: "flex",
            justifyContent: "start",
            marginTop: "1rem",
            gap: "1rem",
          }}
        >
          {" "}
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/listview/${record.dcPPN}`);
            }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`/listview/${record.dcPPN}`);
            }}
          >
            Learn more
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ListItemProb;
