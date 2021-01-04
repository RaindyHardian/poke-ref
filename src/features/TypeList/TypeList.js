import React, { useEffect, useState } from "react";
// import ContentLoader from "react-content-loader";
// import { useHistory, useLocation } from "react-router-dom";
// import api from "../../api/api";
// import Pagination from "../Pagination/Pagination";
import "./typelist.css";
import axios from "axios";
const Type = () => {
  // const history = useHistory()
  // const location = useLocation()
  // const query = new URLSearchParams(location.search)
  // const [page, setPage] = useState(parseInt(query.get("page"))||1)
  const [types, setTypes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("https://pokeapi.co/api/v2/type");
        setTypes(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}, please refresh the page</div>
      ) : (
        <div>
          {types.results.map(({url, name})=>(
            <div>{name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Type;
