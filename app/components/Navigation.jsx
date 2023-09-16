"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import navigation from "../styles/navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navigation() {
  const router = useRouter();
  return (
    <div>
      <Box className={navigation.navbar_container}>
        <Box>
          <Link href="http://www.staatsbibliothek-berlin.de" target="_blank">
            <img
              src="/stabi-logo-kante-weiss.png"
              className={navigation.navbar_logo}
            />
          </Link>
          <Link href="/">
            <img
              src="/IN_CONTEXT_Schriftzug ohne Rand weiss.png"
              className={navigation.navbar_logo}
            />
          </Link>
        </Box>
        <Box className={navigation.navbar_items}>
          {" "}
          <Link href="/about">
            <Typography>About</Typography>
          </Link>
          <Typography>My Workplace</Typography>
          <Typography>Documentation</Typography>
          <Typography>EN | DE</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Navigation;
