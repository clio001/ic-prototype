import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MapIcon from "@mui/icons-material/Map";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import listitemprob from "../styles/listitemprob.module.css";
import { useRouter } from "next/navigation";

function ListItemProb(props) {
  const record = props.recordElement;
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    console.log(isActive);
  };

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
    <div className={listitemprob.scene}>
      <div
        className={`${isActive ? listitemprob.cardflipped : listitemprob.card}`}
      >
        <div className={listitemprob.card__face__front}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "10rem",
              backgroundColor: "#616190",
              borderRadius: "4px 0px 0px 4px",
            }}
          >
            {recordIcon()}
          </Box>{" "}
          <Box
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {record.dcDate}, {record.dcFormat[record.dcFormat.length - 1]}
            </Typography>
            <Typography variant="h6" component="div">
              {record.dcTitle.length > 150
                ? record.dcTitle.slice(0, 150) + " ..."
                : record.dcTitle}
            </Typography>
            <Typography color="text.secondary">
              {record.dcContributor}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginTop: "1rem",
              }}
            >
              {" "}
              <Button
                variant="contained"
                onClick={() => {
                  router.push(`/listview/${record.dcPPN}`);
                }}
                sx={{ marginRight: "1rem" }}
              >
                View
              </Button>
              <Button variant="outlined" onClick={handleClick}>
                Learn more
              </Button>
            </Box>
          </Box>
        </div>
        <Box className={listitemprob.card__face__back}>
          <Box
            sx={{
              margin: "1rem",
            }}
          >
            <Typography>
              Learn more about colonial language and its uses:
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{ marginTop: "1rem" }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ListItemProb;
