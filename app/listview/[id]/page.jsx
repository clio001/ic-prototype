"use client";
import React, { useState } from "react";
import { DOMParser } from "@xmldom/xmldom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import details from "../../styles/details.module.css";
import Link from "next/link";

function ItemView({ params }) {
  const recordPPN = params.id;

  const [recordTitle, setRecordTitle] = useState();

  const getRecordData = async (recordPPN) => {
    const response = await fetch(
      `https://sru.k10plus.de/gvk?version=1.1&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus+and+pica.ppn=${recordPPN}&maximumRecords=1&recordSchema=picaxml`
    );

    const xmlString = await response.text();

    parseRecordData(xmlString);
  };

  const parseRecordData = (xmlString) => {
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlString, "text/xml");

    const datafieldsList = xmlDocument.getElementsByTagName("datafield");

    for (let n = 0; n < datafieldsList.length; n++) {
      if (datafieldsList[n].getAttribute("tag") == "021A") {
        let subfieldList = datafieldsList[n].getElementsByTagName("subfield");
        for (let i = 0; i < subfieldList.length; i++) {
          if (subfieldList[i].getAttribute("code") == "a") {
            setRecordTitle(subfieldList[i].textContent);
          }
        }
      }
    }
  };
  getRecordData(recordPPN);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs_container">
        <Link href="/" className="breadcrumbs_link">
          <Typography variant="body2">Home</Typography>
        </Link>
        <Link href="/listview" className="breadcrumbs_link">
          <Typography variant="body2">Results</Typography>
        </Link>
        <Typography variant="body2">Details</Typography>
      </Breadcrumbs>
      <Box className={details.main_container}>
        {" "}
        <Box>
          <img src="details-image.jpg" width="100" />
        </Box>
        <Box>
          <Typography variant="h4">{recordTitle}</Typography>
          <Typography variant="subtitle2">{recordPPN}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default ItemView;
