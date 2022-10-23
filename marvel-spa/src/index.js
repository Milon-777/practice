import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";

import "./style/style.scss";

const marvelService = new MarvelService();

marvelService
  .getAllCharacters()
  .then((result) =>
    result.data.results.forEach((element) => console.log(element.name))
  );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
