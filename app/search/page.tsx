import Search from "@/components/Search";
import React from "react";

import { NextResponse } from "next/server";
export const metadata = {
  title: "Search Rooms",
};

const SearchPage = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default SearchPage;
