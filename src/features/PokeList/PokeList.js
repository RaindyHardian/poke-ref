import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../api/api";
import PokeListItem from "../../components/PokeList/PokeListItem";
import Pagination from "../Pagination/Pagination";
import "./pokelist.css";

const PokeList = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const [poke, setPoke] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data, error } = await api.getAllPokemon(page);
        if (error) {
          throw new Error(error);
        }
        setPoke(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [page]);

  const changePage = (e) => {
    query.set("page", e.target.attributes.pageval.value);
    history.push({
      pathname: location.pathname,
      search: query.toString(),
    });
    setPage(e.target.attributes.pageval.value);
  };

  return (
    <div>
      {loading ? (
        <div className="pokelist__container">
          {[...Array(6)].map((_, i) => (
            <ContentLoader
              key={i}
              width={120}
              height={146}
              title="Loading Pokemon"
            >
              <rect x="0" y="0" rx="4" ry="4" width="100%" height="110" />
              <rect x="0" y="115" rx="3" ry="3" width="100%" height="25" />
            </ContentLoader>
          ))}
        </div>
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <div className="pokelist__container">
            {poke.results.map((res) => (
              <PokeListItem
                key={res.id}
                id={res.id}
                name={res.name}
                sprite={res.sprite}
              />
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
