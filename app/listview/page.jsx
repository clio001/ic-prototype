"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import ListItem from "../components/ListItem";
import listview from "../styles/listview.module.css";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import { useState } from "react";

function ListView() {
  const [titel, setTitel] = useState();
  const getData = async () => {
    const response = await fetch(
      "https://sru.k10plus.de/gvk7?version=1.1&operation=searchRetrieve&query=pica.prs=adenauer,konrad&maximumRecords=300&recordSchema=dc"
    );
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

      // Use getElementsByTagNameNS to select the title element within the "record" element
      const titleElements = record.getElementsByTagNameNS(
        dcNamespaceURI,
        "title"
      );

      if (titleElements.length > 0) {
        const title = titleElements[0].textContent; // Extract the text content of the first title element

        return title;
      } else {
        console.log("Title not found for record", i + 1);
      }
    }
  };

  return (
    <Box className={listview.page_container}>
      <Typography variant="h4" sx={{ padding: "3rem" }}>
        Results {titel}
      </Typography>
      <Box className={listview.result_container}>
        {titel && <ListItem title={titel} />}
      </Box>
    </Box>
  );
}

export default ListView;
