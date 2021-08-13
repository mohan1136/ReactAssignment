import React from "react";
import { ceil } from "lodash";
import "bootstrap/dist/css/bootstrap.css";
export default function Pagination(props) {
  const { itemsCount, pageSize, currentPage } = props;
  let pagesCount = ceil(itemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
            >
              <p className="page-link" onClick={() => props.onPageChange(page)}>
                {page}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
