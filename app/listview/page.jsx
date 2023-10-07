"use client";
import {
  Box,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Pagination,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import React from "react";
import ListItem from "../components/ListItem";
import listview from "../styles/listview.module.css";
import { DOMParser } from "@xmldom/xmldom";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

function ListView() {
  const [recordList, setRecordList] = useState();
  const [loading, setLoading] = useState(true);
  const [searchHits, setSearchHits] = useState();

  const SearchButton = () => (
    <IconButton
      onClick={() => {
        router.push("/listview");
      }}
    >
      <SearchIcon />
    </IconButton>
  );

  useEffect(() => {
    const getData = async () => {
      const titleList = [];

      const opac = await fetch(
        "https://sru.k10plus.de/gvk7?version=1.1&operation=searchRetrieve&query=pica.tit=Deutsch-Ostafrika&maximumRecords=32&recordSchema=dc"
      );

      const response = await fetch(
        "https://sru.k10plus.de/gvk?version=1.1&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus&maximumRecords=100&recordSchema=dc"
      );

      const xmlString = await response.text();

      const parser = new DOMParser();
      const xmlDocument = parser.parseFromString(xmlString, "text/xml");

      // Define the namespace for the "zs" and "dc" prefixes
      const namespaceURI = "http://www.loc.gov/zing/srw/";
      const dcNamespaceURI = "http://purl.org/dc/elements/1.1/";

      // Use the full tag name with namespace prefix (zs:record)
      const records = xmlDocument.getElementsByTagNameNS(
        namespaceURI,
        "record"
      );

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
    getData();
  }, []);

  return (
    <Box className={listview.page_container}>
      {" "}
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}
        >
          <CircularProgress />
        </Box>
      )}
      {searchHits && (
        <>
          {" "}
          <Breadcrumbs
            aria-label="breadcrumb"
            className="breadcrumbs_container"
          >
            <Link href="/" className="breadcrumbs_link">
              <Typography variant="body2">Home</Typography>
            </Link>
            <Typography variant="body2">Results</Typography>
          </Breadcrumbs>
          <Typography
            variant="h4"
            sx={{ marginLeft: "3rem", paddingTop: "1rem" }}
          >
            Results
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginLeft: "3rem", marginTop: "1rem" }}
          >
            Search hits: {searchHits}
          </Typography>
        </>
      )}
      <Box className={listview.listitem_container}>
        <Box className={listview.result_container}>
          {recordList && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              {" "}
              <TextField
                className="search_field"
                label="Search collections ..."
                variant="outlined"
                InputProps={{
                  endAdornment: <SearchButton />,
                }}
                sx={{ marginBottom: "3rem", boxShadow: "0px 5px 15px grey" }}
              />
              <Pagination count={10} variant="outlined" color="primary" />
            </Box>
          )}

          {recordList &&
            recordList.map((recordElement, i) => {
              return <ListItem key={i} recordElement={recordElement} />;
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default ListView;
