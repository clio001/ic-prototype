"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Footer from "./Footer";
import Chart from "./Chart";

function LandingPage() {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState("");

  const SearchButton = () => (
    <IconButton
      onClick={() => {
        console.log(searchPhrase);
        router.push("/listview");
      }}
    >
      <SearchIcon />
    </IconButton>
  );

  return (
    <>
      <Box className="search_field_container">
        <Paper elevation={24}>
          {" "}
          <TextField
            className="search_field"
            label="Search collections ..."
            variant="filled"
            InputProps={{
              endAdornment: <SearchButton />,
            }}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eaeff6",
        }}
      >
        <Typography variant="h4" mt={6} mb={1}>
          Explore
        </Typography>
        <Typography variant="body2" mb={2}>
          Explore personal records, maps, monographs, and photographs by topic
        </Typography>
        <Button variant="outlined" color="primary">
          See all
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "3rem",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {" "}
          <Card sx={{ minWidth: 275 }} className="card">
            <Paper
              className="feature_image"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/1/1d/Heinrich_Barth%27s_route_through_Africa%2C_1850_to_1855.jpg")`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#616190",
                  padding: "0.2rem",
                  color: "white",
                }}
                mb={2}
              >
                Travel and Science
              </Typography>
            </Paper>{" "}
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Thematic Collection
              </Typography>
              <Typography variant="h5" component="div">
                Travel and Science
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Records: 6214
              </Typography>
              <Typography variant="body2">
                This collection contains maps and monographs related to travel,
                ethnographies, missionary literature and the administration of
                the German colony New Guinea.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 275 }} className="card">
            <Paper
              className="feature_image"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/R%C3%BChlmannorgel_Herrnhut.jpg/320px-R%C3%BChlmannorgel_Herrnhut.jpg")`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#616190",
                  padding: "0.2rem",
                  color: "white",
                }}
                mb={2}
              >
                Missionary Literature
              </Typography>
            </Paper>{" "}
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Thematic Collection
              </Typography>
              <Typography variant="h5" component="div">
                Missionary Literature
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Records: 1243
              </Typography>
              <Typography variant="body2">
                This collection contains maps and monographs related to travel,
                ethnographies, missionary literature and the administration of
                the German colony New Guinea.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 275 }} className="card">
            <Paper
              className="feature_image"
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kaiser-Wilhelms-Land-Brockhaus_b10_nr0030a_hfid_5181872.jpg/1920px-Kaiser-Wilhelms-Land-Brockhaus_b10_nr0030a_hfid_5181872.jpg")`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#616190",
                  padding: "0.2rem",
                  color: "white",
                }}
                mb={2}
              >
                German New Guinea
              </Typography>
            </Paper>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Thematic Collection
              </Typography>
              <Typography variant="h5" component="div">
                German New Guinea
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Records: 456
              </Typography>
              <Typography variant="body2">
                This collection contains maps and monographs related to travel,
                ethnographies, missionary literature and the administration of
                the German colony New Guinea.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Explore</Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eaeff6",
          paddingBottom: "6rem",
        }}
      >
        <Typography variant="h4" mt={6} mb={1}>
          The Collections
        </Typography>
        <Typography variant="body2" mb={5}>
          Learn about the different collections you can explore on the
          IN_CONTEXT platform.
        </Typography>
        <Chart />
      </Box>
    </>
  );
}

export default LandingPage;
