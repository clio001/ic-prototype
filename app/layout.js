"use client";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "./context/context";
import { ThemeProvider, createTheme } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#616190",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <ThemeProvider theme={theme}>
            {" "}
            <Navigation />
            {children}
            <Footer />
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
