import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./pokelistitem.css";

const PokeListItem = ({ name, url }) => {
  const [poke, setPoke] = useState({});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await api.getPokemon(url);
      setPoke(data);
      setError(error);
      setLoading(false);
    };
    fetch();
  }, [url]);
  return (
    <div>
      {loading ? (
        "loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div className="pokelistitem__box">
          <Link to={`/pokemon/${poke.id}`} className="pokelistitem__select">
            <img src={poke.sprites.front_default} alt="" />
            <div className="pokelistitem__name">{poke.name}</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PokeListItem;
