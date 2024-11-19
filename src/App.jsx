// import { useState } from "react";

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-deliveroo--cszclskmpcqr.code.run/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {" "}
      {isLoading ? (
        <span> EN cours de chargement...</span>
      ) : (
        <div>{data.restaurant.path}</div>
      )}
    </>
  );
};

export default App;
