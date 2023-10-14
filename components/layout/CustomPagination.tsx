"use client";

import React from "react";
import Pagination from "react-js-pagination";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  resPerPage: number;
  filteredRoomsCount: number;
}

const CustomPagination = ({ resPerPage, filteredRoomsCount }: Props) => {


  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page); //convert pageno into int

  let queryParams;

  const handlePageChange = (currentPage: string) => {

    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);  //update it
      } else {
        queryParams.append("page", currentPage);  //else add it if not there
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);  // now go there
    } 
  };


  return (

    <div>
      {resPerPage < filteredRoomsCount && (    //can show now as per page 4. total 30
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomsCount}
            onChange={handlePageChange}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
