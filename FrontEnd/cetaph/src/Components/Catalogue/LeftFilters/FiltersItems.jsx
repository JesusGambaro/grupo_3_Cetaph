//import { deleteFilter } from "../redux/actions/leftSideFilter";
import { useDispatch } from "react-redux";

const FiltersItems = ({ filters, handleCheckSelect }) => {
  const dispatch = useDispatch();
  return (
    <div className="filters-container">
      {/*
       genre: "",
    formato: "",
    explicit: "",
    price: {
      min: 0,
      max: 1000,
    },
      */}
      {Object.keys(filters).map((el, i) => {
        return (
          <div key={i} className="filter-card">
            {filters[el].explicit === "sale" ? (
              <p>On Sale</p>
            ) : (
              <span>
                {`${el}: `}
                <p>
                  {/*  {el === "price"
                    ? `${filters[el].price.min} - ${filters[el].price.max}`
                    : el} */}
                </p>
              </span>
            )}
            <button
              onClick={() => {
                // dispatch(deleteFilter(el.name));
                handleCheckSelect(el);
              }}
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default FiltersItems;
