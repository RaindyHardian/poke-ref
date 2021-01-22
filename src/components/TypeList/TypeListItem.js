import React from "react";
import { Link } from "react-router-dom";
import typeColor from "./typeColor";
import "./typelistitem.css";

const TypeListItem = ({ name }) => {
  return (
    <div className={"typelistitem__box " + typeColor(name)}>
      <Link to={"/type/" + name} className="typelistitem__link">
        {name}
      </Link>
    </div>
  );
};

export default TypeListItem;
