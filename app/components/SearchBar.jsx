"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGlobalContext } from "../context/context";

function SearchBar() {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleSearchBarInput = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
      {" "}
      <ButtonGroup size="medium" variant="contained">
        <TextField
          className="search_field"
          label="Search collections ..."
          variant="outlined"
          onChange={handleSearchBarInput}
        />

        <Button onClick={handleClick}>
          <ArrowDropDownIcon />
        </Button>
        <Button
          onClick={() => {
            router.push(
              ({
                pathname: "/listview",
                query: { name: "Someone" },
              },
              "/listview")
            );
          }}
        >
          <SearchIcon />
        </Button>
      </ButtonGroup>
      <Menu
        dense
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem disabled onClick={handleClose}>
          <em>All collections</em>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>DSDK Bremen</MenuItem>
        <MenuItem onClick={handleClose}>Kolonialbibliothek Frankfurt</MenuItem>
        <MenuItem onClick={handleClose}>Digital Collections (SBB)</MenuItem>
      </Menu>
    </Box>
  );
}

export default SearchBar;
