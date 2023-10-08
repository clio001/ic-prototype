"use client";
import React, { useState } from "react";
import { DOMParser } from "@xmldom/xmldom";
import {
  Box,
  Breadcrumbs,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import details from "../../styles/details.module.css";
import Link from "next/link";

function ItemView({ params }) {
  const recordPPN = params.id;

  const [recordTitle, setRecordTitle] = useState();
  const [recordType, setRecordType] = useState();
  const [recordYear, setRecordYear] = useState();
  const [recordCreatorLast, setRecordCreatorLast] = useState();
  const [recordCreatorFirst, setRecordCreatorFirst] = useState();
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);

  const getRecordData = async (recordPPN) => {
    const response = await fetch(
      `https://sru.k10plus.de/gvk?version=1.1&operation=searchRetrieve&query=pica.lsw=Digitale%20Sammlung%20Deutscher%20Kolonialismus+and+pica.ppn=${recordPPN}&maximumRecords=1&recordSchema=picaxml`
    );

    const xmlString = await response.text();

    setLoading(false);
    setWait(true);
    parseRecordData(xmlString);
  };

  const parseRecordData = (xmlString) => {
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlString, "text/xml");

    const datafieldsList = xmlDocument.getElementsByTagName("datafield");

    for (let n = 0; n < datafieldsList.length; n++) {
      // * TYPE
      if (datafieldsList[n].getAttribute("tag") == "013D") {
        let subfieldList = datafieldsList[n].getElementsByTagName("subfield");
        for (let i = 0; i < subfieldList.length; i++) {
          if (subfieldList[i].getAttribute("code") == "a") {
            setRecordType(subfieldList[i].textContent);
          }
        }
      }
      // * YEAR
      if (datafieldsList[n].getAttribute("tag") == "011@") {
        let subfieldList = datafieldsList[n].getElementsByTagName("subfield");
        for (let i = 0; i < subfieldList.length; i++) {
          if (subfieldList[i].getAttribute("code") == "r") {
            setRecordYear(subfieldList[i].textContent);
          }
        }
      }
      // * CREATOR
      if (datafieldsList[n].getAttribute("tag") == "028A") {
        let subfieldList = datafieldsList[n].getElementsByTagName("subfield");
        for (let i = 0; i < subfieldList.length; i++) {
          if (subfieldList[i].getAttribute("code") == "A") {
            setRecordCreatorLast(subfieldList[i].textContent);
          }
          if (subfieldList[i].getAttribute("code") == "D") {
            setRecordCreatorFirst(subfieldList[i].textContent);
          }
        }
      }
      // * TITLE
      if (datafieldsList[n].getAttribute("tag") == "021A") {
        let subfieldList = datafieldsList[n].getElementsByTagName("subfield");
        for (let i = 0; i < subfieldList.length; i++) {
          if (subfieldList[i].getAttribute("code") == "a") {
            setRecordTitle(subfieldList[i].textContent.replace("@", ""));
          }
        }
      }
    }
  };
  getRecordData(recordPPN);

  return (
    <div className={details.page_container}>
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs_container">
        <Link href="/" className="breadcrumbs_link">
          <Typography variant="body2">Home</Typography>
        </Link>
        <Link href="/listview" className="breadcrumbs_link">
          <Typography variant="body2">Results</Typography>
        </Link>
        <Typography variant="body2">Details</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ marginLeft: "3rem", paddingTop: "1rem" }}>
        Details
      </Typography>
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}
        >
          <CircularProgress />
        </Box>
      )}
      {wait && (
        <Box className={details.main_container}>
          {" "}
          <Paper className={details.left_container}>
            <Divider textAlign="right">
              {" "}
              <Typography variant="caption" className={details.meta_heading}>
                Record Details
              </Typography>
            </Divider>
            <Typography variant="caption" className={details.meta_heading}>
              Title
            </Typography>
            <Typography variant="body2">{recordTitle}</Typography>
            <Typography variant="caption" className={details.meta_heading}>
              Creator
            </Typography>
            <Typography variant="body2">
              {recordCreatorFirst} {recordCreatorLast}
            </Typography>
            <Typography variant="caption" className={details.meta_heading}>
              Year
            </Typography>
            <Typography variant="body2">{recordYear}</Typography>
            <Typography variant="caption" className={details.meta_heading}>
              Type
            </Typography>
            <Typography variant="body2">{recordType}</Typography>
            <Typography variant="caption" className={details.meta_heading}>
              Collection
            </Typography>
            <Box>
              {" "}
              <Chip
                label="Digitale Sammlung Deutscher Kolonialismus"
                variant="outlined"
                sx={{ margin: "0.5rem" }}
              />
            </Box>
            <Divider textAlign="right" sx={{ marginTop: "3rem" }}>
              {" "}
              <Typography variant="caption" className={details.meta_heading}>
                More
              </Typography>
            </Divider>
            <Typography variant="caption" className={details.meta_heading}>
              PPN
            </Typography>
            <Typography variant="body2">{recordPPN}</Typography>
          </Paper>
          <Box>
            <img src="/details-image.jpg" className={details.record_image} />
          </Box>
        </Box>
      )}{" "}
    </div>
  );
}

export default ItemView;
