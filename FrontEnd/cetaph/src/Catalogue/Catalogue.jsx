import {useState, useEffect} from "react";
import NavBar from "../Navbar/NavBar";
import usePagination from "../hooks/usePagination";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import LeftFilters from "./LeftFilters/LeftFilters";
import "./catalogue.scss";
import UpSideBar from "./UpSideBar/UpSideBar";
import axios from "axios";
const Catalogue = () => {
  const [disks, setDisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/albums")
      .then((res) => {
        setDisks(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="catalogue-container">
      <LeftFilters />
      <main>
        <UpSideBar />
        <div className="disks-container">
          {disks.map((disk, index) => (
            <Card key={index} color={"black"} data={disk} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogue;
