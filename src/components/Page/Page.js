import React from "react";
import Navbar from "../../features/Navbar/Navbar";
import "./page.css"

const Page = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="page__main">{children}</main>
    </div>
  );
};

export default Page;
