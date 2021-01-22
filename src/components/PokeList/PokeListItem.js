import React from "react";
import { Link } from "react-router-dom";
import "./pokelistitem.css";

const PokeListItem = ({ id, name, sprite }) => {
  return (
    <div className="pokelistitem__box">
      <Link to={`/pokemon/${id}`} className="pokelistitem__select">
        <img
          src={sprite}
          alt={"Picture of " + name}
          className="pokelistitem__pic"
        />
        <div className="pokelistitem__name">{name}</div>
      </Link>
    </div>
  );
};

export default PokeListItem;
