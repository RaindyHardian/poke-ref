import React from "react";

const Pagination = ({totalData, dataPerPage, currentPage, changePage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination__ul">
        {pageNumbers.map(item => {
          if (parseInt(currentPage) === item) {
            return (
              <li
                className="pagination__link pagination__active"
                key={item}
                pageval={item}
                onClick={changePage}
              >
                {item}
              </li>
            );
          }
          return (
            <li
              className="pagination__link"
              key={item}
              pageval={item}
              onClick={changePage}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
