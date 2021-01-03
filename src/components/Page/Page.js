import React from "react";
import Navbar from "../../features/Navbar/Navbar";

const Page = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Page;
