"use client";
import {
  Box,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Pagination,
} from "@mui/material";
import React from "react";
import ListItem from "../components/ListItem";
import listview from "../styles/listview.module.css";
import { DOMParser } from "@xmldom/xmldom";
import { useState, useEffect } from "react";
import Link from "next/link";

function ListView() {
  const [recordList, setRecordList] = useState();
  const [loading, setLoading] = useState(true);
  const [searchHits, setSearchHits] = useState();

  useEffect(() => {
    const getData = async () => {
      const titleList = [];

      const response = await fetch(
        "https://sru.k10plus.de/gvk7?version=1.1&operation=searchRetrieve&query=pica.prs=Petermann,August&maximumRecords=32&recordSchema=dc"
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

        const singleRecord = {
          dcTitle: title,
          dcContributor: contributor,
          dcDate: date,
          dcFormat: format,
        };

        titleList.push(singleRecord);
      }
      console.log(titleList);
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
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
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
