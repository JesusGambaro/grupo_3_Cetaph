import { useState, useEffect, useRef } from "react";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import LeftFilters from "./LeftFilters/LeftFilters";
import "./catalogue.scss";
import UpSideBar from "./UpSideBar/UpSideBar";
import { filterCatalogue } from "../../Redux/actions/catalogue";
import { useDispatch, useSelector } from "react-redux";

const Catalogue = () => {
  const dispatch = useDispatch();
  const { catalogue, loading, filter } = useSelector(({ main }) => main);
  //#region Filters
  const [filters, setFilters] = useState({});
  useEffect(() => {
    dispatch(filterCatalogue(filter));
    setFilters(filter);
    //console.log(filter);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target.search;
    setFilters({ ...filters, searchParam: value });
  };
  //#endregion
  useEffect(() => {
    dispatch(filterCatalogue({ ...filter, ...filters }));
    window.scrollTo(0, 0);
  }, [filters]);
  const dividedGroups = () => {
    const start = Math.floor(filters.page / 4) * 4;
    //console.log(filter.size.totalPages);
    return new Array(4).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= filter.size.totalPages && limit;
    });
  };
  const setUpFilters = (props) => {
    setFilters((prev) => {
      let copy = { ...prev };
      copy = { ...copy, ...props };
      return copy;
    });
  };
  const goPage = (e) =>
    setFilters({ ...filters, page: Number(e.target.textContent) - 1 });
  return (
    <div className="catalogue-container">
      <LeftFilters setUpFilters={setUpFilters} />
      <main>
        <UpSideBar handleSearch={handleSearch} setUpFilters={setUpFilters} />

        <div className="disks-container">
          {loading ? (
            <Loading text={"Loading albums..."} />
          ) : (
            <>
              {catalogue?.length > 0 ? (
                catalogue.map((disk, index) => (
                  <Card key={index} color={"black"} data={disk} />
                ))
              ) : (
                <h1>No se encontraron albums</h1>
              )}
            </>
          )}
        </div>
        <div className="pagination-container">
          <div className="selectionOwn">
            <button
              className="btnOwn prev"
              onClick={() => {
                setFilters({ ...filters, page: filters.page - 1 });
              }}
              disabled={filters.page === 0}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            {dividedGroups().map((e, i) => {
              //console.log(e, " ");
              return (
                e && (
                  <button
                    className={
                      filters.page === e - 1 ? "btnOwn active" : "btnOwn"
                    }
                    key={i}
                    onClick={goPage}
                  >
                    {e}
                  </button>
                )
              );
            })}

            <button
              className="btnOwn next"
              onClick={() => {
                setFilters({ ...filters, page: filters.page + 1 });
              }}
              disabled={filters.page === filter.size.totalPages - 1}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Catalogue;
