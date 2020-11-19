import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../api/api";
import PokeListItem from "../../components/PokeList/PokeListItem";
import Pagination from "../../components/Pagination/Pagination";
import "./pokelist.css"

const PokeList = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const [poke, setPoke] = useState({});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data, error } = await api.getAllPokemon(page);
      setPoke(data);
      setError(error);
      setLoading(false);
    };
    fetch();
  }, [page]);

  const changePage = e => {
    query.set("page", e.target.attributes.pageval.value);
    history.push({
      pathname: location.pathname,
      search: query.toString()
    });
    setPage(e.target.attributes.pageval.value);
  };

  return (
    <div>
      {loading ? (
        "Loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <div className="pokelist__container">
            {poke.results.map((res, idx) => (
              <PokeListItem key={idx} name={res.name} url={res.url} />
            ))}
          </div>
          <div>
            <Pagination
              totalData={poke.count}
              dataPerPage={20}
              currentPage={page}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeList;
