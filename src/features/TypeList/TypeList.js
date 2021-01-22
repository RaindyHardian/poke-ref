import React, { useEffect, useState } from "react";
// import ContentLoader from "react-content-loader";
import api from "../../api/api";
import TypeListItem from "../../components/TypeList/TypeListItem";
import "./typelist.css";

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
        const { data, error } = await api.getAllTypes();
        if (error) {
          throw new Error(error);
        }
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
    <div className="typelist">
      <h1 className="typelist__title">Pokemon Type</h1>
      {loading ? (
        <div data-testid="typelist-loading">Loading...</div>
      ) : error ? (
        <div data-testid="typelist-error">{error}, please refresh the page</div>
      ) : (
        <div className="typelist__container">
          {types.results.map(({ name }, idx) => {
            if (name !== "shadow" && name !== "unknown") {
              return <TypeListItem key={idx} name={name} />;
            } else return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Type;
