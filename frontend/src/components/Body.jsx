import { useEffect, useState } from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import axios from "axios";
import "../css/Body.css";
import addIcon from "../utils/images/add-icon.png";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/BASE_URL.jsx";

const Body = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [animation, setAnimation] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
  };

  const updateProducts = async () => {
    await fetchProducts();
  };

  return (
    <div className="body-container">
      <SearchBar onSearchChange={handleSearchChange} />
      <div style={{ marginTop: "20px" }}>
        <Grid data={products} search={search} updateProducts={updateProducts} />
      </div>
      <div>
        <button className="add-btn">
          <img
            src={addIcon}
            alt="Add"
            className={`add-btn-img ${
              animation ? "add-btn-img-animation" : ""
            }`}
            onClick={() => navigate("/products/insert")}
          />
        </button>
      </div>
    </div>
  );
};

export default Body;
