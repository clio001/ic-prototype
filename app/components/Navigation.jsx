"use client";
import { Box, Typography, Avatar } from "@mui/material";
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
          <Link href="/myworkspace">
            <Typography>My Workspace</Typography>
          </Link>
          <Typography>Documentation</Typography>
          <Typography>EN | DE</Typography>
          <Avatar sx={{ width: 34, height: 34 }}></Avatar>
        </Box>
      </Box>
    </div>
  );
}

export default Navigation;
