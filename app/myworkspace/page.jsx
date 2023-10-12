"use client";

import React from "react";
import { useGlobalContext } from "../context/context";

function MyWorkspace() {
  const { searchTerm, setSearchTerm } = useGlobalContext();

  return <div>{searchTerm}</div>;
}

export default MyWorkspace;
