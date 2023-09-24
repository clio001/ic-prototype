"use client";
import { Box, Typography, Avatar } from "@mui/material";
import React from "react";

import footer from "../styles/footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <Box className={footer.footer_container}>
        <Box>
          <Link href="http://www.staatsbibliothek-berlin.de" target="_blank">
            <img
              src="/stabi-logo-kante-weiss.png"
              className={footer.footer_logo}
            />
          </Link>
        </Box>
        <Box className={footer.footer_items}>
          <Link href="/about">
            <Typography>Impressum</Typography>
          </Link>
          <Link href="/myworkspace">
            <Typography>Privacy Policy</Typography>
          </Link>
          <Typography>Accessability</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
