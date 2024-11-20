import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [choixPlat, setChoixPlat] = useState([]);
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

  const descCutted = (str) => {
    return str.slice(0, 60);
  };
  return (
    <div>
      <header>
        {" "}
        <img src="" alt="" />
      </header>
      <main>
        {isLoading ? (
          <span> EN cours de chargement...</span>
        ) : (
          <div>
            <div className="TitleAndImg">
              <div className="titleAndDesc">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt={data.restaurant.name} />
            </div>
            <div className="platsAndPanier">
              <div className="platsTout">
                {data.categories.map((element, index) => {
                  console.log(element);
                  return (
                    <>
                      {index < 6 ? (
                        <div className="allPlats">
                          <h2>{element.name}</h2>
                          <div className="divPlats">
                            {element.meals.map((element, index) => {
                              return (
                                <>
                                  <button
                                    key={index}
                                    className="buttonsPlats"
                                    onClick={() => {
                                      const newTab = [...choixPlat];

                                      newTab.push(
                                        <>
                                          <div className="divPlatPanier">
                                            <div>
                                              <p>{element.quantity}</p>
                                              <p>{element.title}</p>
                                            </div>

                                            <p>{element.price}</p>
                                          </div>
                                          {/* <div className="sousTotal">
                                            <p>Sous Total</p>
                                            <p>{element.price}</p>
                                          </div> */}
                                        </>
                                      );
                                      setChoixPlat(newTab);
                                    }}
                                  >
                                    <div className="textButtons">
                                      <h3>{element.title}</h3>
                                      <p>{descCutted(element.description)}</p>
                                      <p>{element.price}</p>{" "}
                                      {element.popular && (
                                        <span>★ popular</span>
                                      )}
                                    </div>

                                    {element.picture ? (
                                      <img
                                        src={element.picture}
                                        alt="plat"
                                        className="imgPlats"
                                      />
                                    ) : (
                                      <div className="sansImage"></div>
                                    )}
                                  </button>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>

              {/* ici je souhaite afficher une case panier a coté des plats  */}
              {/* je veux que lorsque l'on clique sur un des plat

                 - alors le panier affiche le titre du plat ainsi que le prix du plat
   

                  //-----------//
                   Sinon le panier affiche "Votre panier est vide"

                                    */}
              <div className="baskets">
                {!choixPlat[0] ? (
                  <>
                    <h3 className="titreBasket">Valider Mon Panier</h3>
                    <p className="descBasket">Votre Panier est vide</p>
                  </>
                ) : (
                  <>
                    <h3 className="titre2Basket">Valider Mon Panier</h3>
                    <div>{choixPlat}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer>
        Made with{" "}
        <a href="https://react.dev/" target="blank">
          React
        </a>{" "}
        at{" "}
        <a href="https://www.lereacteur.io/" target="blank">
          le Reacteur
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/Zyad75"
          target="blank"
          style={"font-weight: bold"}
        >
          Zyad
        </a>
      </footer>
    </div>
  );
};

export default App;
