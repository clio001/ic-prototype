"use client";
import {
  Box,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Pagination,
  IconButton,
  Chip,
  ButtonGroup,
  TextField,
  Button,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";
import React from "react";
import ListItem from "../components/ListItem";
import listview from "../styles/listview.module.css";
import { DOMParser } from "@xmldom/xmldom";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGlobalContext } from "../context/context";
import ListItemProb from "../components/ListItemProb";

function ListView() {
  const [searchTerm, setSearchTerm] = useState("deutsch");
  let searchPhrase = searchTerm;
  const [collection, setCollection] = useState({
    url: "https://sru.k10plus.de/gvk?version=1.1&maximumRecords=100&recordSchema=dc&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus+and+pica.all=",
    name: "Digitale Sammlung Deutscher Kolonialismus",
  });
  const [recordList, setRecordList] = useState();
  const [loading, setLoading] = useState(true);
  const [searchHits, setSearchHits] = useState();

  const router = useRouter();

  const SearchButton = () => (
    <IconButton
      onClick={() => {
        router.push("/listview");
      }}
    >
      <SearchIcon />
    </IconButton>
  );

  const getData = async () => {
    const titleList = [];

    console.log(collection.url + searchTerm);

    const response = await fetch(collection.url + searchTerm);

    const xmlString = await response.text();

    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlString, "text/xml");

    // Define the namespace for the "zs" and "dc" prefixes
    const namespaceURI = "http://www.loc.gov/zing/srw/";
    const dcNamespaceURI = "http://purl.org/dc/elements/1.1/";

    // Use the full tag name with namespace prefix (zs:record)
    const records = xmlDocument.getElementsByTagNameNS(namespaceURI, "record");

    // Loop through each "record" element and extract the title
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      let title = "";
      let contributor = "";
      let date = "";
      let format = [];
      let identifiersList = [];
      let PPN = "";

      // Use getElementsByTagNameNS to select the title element within the "record" element
      const titleElements = record.getElementsByTagNameNS(
        dcNamespaceURI,
        "title"
      );

      if (titleElements) {
        title = titleElements[0].textContent; // Extract the text content of the first title element
      }

      const contributors = record.getElementsByTagNameNS(
        dcNamespaceURI,
        "contributor"
      );

      if (contributors.length > 0) {
        contributor = contributors[0].textContent;
      } else {
        contributor = "n.a.";
      }

      const dates = record.getElementsByTagNameNS(dcNamespaceURI, "date");

      if (dates.length > 0) {
        date = dates[0].textContent;
      } else {
        date = "n.a.";
      }

      const formats = record.getElementsByTagNameNS(dcNamespaceURI, "format");

      if (formats.length > 0) {
        for (let n = 0; n < formats.length; n++) {
          format.push(formats[n].textContent);
        }
      } else {
        format.push("n.a.");
      }

      const identifiersNodes = record.getElementsByTagNameNS(
        dcNamespaceURI,
        "identifier"
      );

      if (identifiersNodes.length > 0) {
        for (let n = 0; n < identifiersNodes.length; n++) {
          identifiersList.push(identifiersNodes[n].textContent);
        }
      } else {
        identifiersList.push("n.a.");
      }

      if (identifiersList.length > 0) {
        for (let n = 0; n < identifiersList.length; n++) {
          if (identifiersList[n].includes("ppn")) {
            PPN = identifiersList[n].replace("ppn:\n\t\t\t\t(DE-627)", "");
          }
        }
      }

      const singleRecord = {
        dcTitle: title,
        dcContributor: contributor,
        dcDate: date,
        dcFormat: format,
        dcPPN: PPN,
      };

      titleList.push(singleRecord);
    }
    console.log("titlelist", titleList);
    setRecordList(titleList);
    setLoading(false);
    setSearchHits(titleList.length);
  };

  useEffect(() => {
    getData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    <Box className={listview.page_container}>
      {" "}
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs_container">
        <Link href="/" className="breadcrumbs_link">
          <Typography variant="body2">Home</Typography>
        </Link>
        <Typography variant="body2">Results</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ marginLeft: "3rem", paddingTop: "1rem" }}>
        Results
      </Typography>
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}
        >
          <CircularProgress />
        </Box>
      )}{" "}
      {searchHits && (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "3rem",
              marginTop: "1rem",
              gap: "0.5rem",
            }}
          >
            {" "}
            <Chip label={collection.name} variant="outlined" />
            <Chip label={"Hits: " + searchHits} variant="outlined" />
            <Chip label={"Search: " + searchPhrase} variant="outlined" />
          </Box>
        </>
      )}
      <Box className={listview.listitem_container}>
        <Box className={listview.result_container}>
          {recordList && recordList.length == 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
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
                  <Button onClick={getData}>
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
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(false);
                      setCollection({
                        url: "https://sru.k10plus.de/gvk?version=1.1&maximumRecords=100&recordSchema=dc&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus+and+pica.all=",
                        name: "Digitale Sammlung Deutscher Kolonialismus",
                      });
                    }}
                  >
                    DSDK Bremen
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    Kolonialbibliothek Frankfurt
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(false);
                      setCollection({
                        url: "https://sru.k10plus.de/gvk7?version=1.1&maximumRecords=100&recordSchema=dc&operation=searchRetrieve&query=pica.all=",
                        name: "Digitale Sammlungen (SBB)",
                      });
                    }}
                  >
                    Digital Collections (SBB)
                  </MenuItem>
                </Menu>
              </Box>
              <Typography mt={8} variant="h5" color="text.secondary">
                No records found. Please try again ...
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
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
                  <Button onClick={getData}>
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
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(false);
                      setCollection({
                        url: "https://sru.k10plus.de/gvk?version=1.1&maximumRecords=100&recordSchema=dc&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus+and+pica.all=",
                        name: "Digitale Sammlung Deutscher Kolonialismus",
                      });
                    }}
                  >
                    DSDK Bremen
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    Kolonialbibliothek Frankfurt
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(false);
                      setCollection({
                        url: "https://sru.k10plus.de/gvk7?version=1.1&maximumRecords=100&recordSchema=dc&operation=searchRetrieve&query=pica.all=",
                        name: "Digitale Sammlungen (SBB)",
                      });
                    }}
                  >
                    Digital Collections (SBB)
                  </MenuItem>
                </Menu>
              </Box>
              <Pagination
                count={10}
                variant="outlined"
                color="primary"
                sx={{ marginTop: "2rem" }}
              />
            </Box>
          )}

          {recordList &&
            recordList.map((recordElement, i) => {
              if (recordElement.dcTitle.includes("Neger")) {
                return <ListItemProb key={i} recordElement={recordElement} />;
              } else {
                return <ListItem key={i} recordElement={recordElement} />;
              }
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default ListView;
