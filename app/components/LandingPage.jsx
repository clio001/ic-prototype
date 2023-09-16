"use client";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function LandingPage() {
  const router = useRouter();

  const SearchButton = () => (
    <IconButton onClick={() => router.push("/listview")}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <>
      <Box className="search_field_container">
        <TextField
          className="search_field"
          id="outlined-basic"
          label="Search collections ..."
          variant="outlined"
          InputProps={{
            endAdornment: <SearchButton />,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Paper
          className="feature1_image"
          elevation={6}
          sx={{
            backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/1/1d/Heinrich_Barth%27s_route_through_Africa%2C_1850_to_1855.jpg")`,
          }}
        ></Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "2rem",
          }}
        >
          <Paper
            elevation={6}
            className="feature2_image"
            sx={{
              backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/R%C3%BChlmannorgel_Herrnhut.jpg/320px-R%C3%BChlmannorgel_Herrnhut.jpg")`,
            }}
          ></Paper>
          <Paper
            elevation={6}
            className="feature2_image"
            sx={{
              backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kaiser-Wilhelms-Land-Brockhaus_b10_nr0030a_hfid_5181872.jpg/1920px-Kaiser-Wilhelms-Land-Brockhaus_b10_nr0030a_hfid_5181872.jpg")`,
            }}
          ></Paper>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
