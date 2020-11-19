import React from "react";
import "./pagination.css";

const Pagination = ({ totalData, dataPerPage, currentPage, changePage }) => {
  const pageNumbers = [];
  const totalPage = Math.ceil(totalData / dataPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  let renderPageNumbers = pageNumbers.map((item) => {
    if (
      item === 1 ||
      item === totalPage ||
      item === parseInt(currentPage) ||
      (item >= parseInt(currentPage) - 2 && item <= parseInt(currentPage) + 2)
    ) {
      return (
        <li
          className={
            item === parseInt(currentPage)
              ? "pagination__link pagination__active"
              : "pagination__link"
          }
          key={item}
          pageval={item}
          onClick={changePage}
        >
          {item}
        </li>
      );
    }
    return null;
  });

  return (
    <div className="pagination">
      <ul className="pagination__ul">
        <li
          className={parseInt(currentPage)!==1?"pagination__link":"pagination__disabled"}
          pageval={parseInt(currentPage) - 1}
          onClick={parseInt(currentPage)!==1?changePage:null}
        >
          {"<"}
        </li>
        {renderPageNumbers}
        <li
          className={parseInt(currentPage)!==totalPage?"pagination__link":"pagination__disabled"}
          pageval={parseInt(currentPage) + 1}
          onClick={parseInt(currentPage)!==totalPage?changePage:null}
        >
          {">"}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
