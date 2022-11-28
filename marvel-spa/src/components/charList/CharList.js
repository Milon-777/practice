import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [hasAnotherCharacters, setHasAnotherCharacters] = useState(true);
  const [offset, setOffset] = useState(210);
  const itemRefs = useRef([]);
  const marvelService = new MarvelService();

  useEffect(() => {
    handleRequestCharacters();
  }, []);

  const focusSelectedCharacter = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const handleRequestCharacters = (offset) => {
    handleCharacterListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(handleCharacterListLoaded)
      .catch(handleError);
  };

  const handleCharacterListLoading = () => {
    setIsLoadingCharacters(true);
  };

  const handleCharacterListLoaded = (newCharacterList) => {
    let hasCharacters = true;
    if (newCharacterList.length < 9) {
      hasCharacters = false;
    }

    setCharacterList((characterList) => [
      ...characterList,
      ...newCharacterList,
    ]);
    setIsLoading(false);
    setIsLoadingCharacters(false);
    setHasAnotherCharacters(hasCharacters);
    setOffset((offset) => offset + 9);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderItems = (array) => {
    const items = array.map((item, i) => {
      let imageStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imageStyle = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={item.id}
          ref={(element) => (itemRefs.current[i] = element)}
          onClick={() => {
            props.handleCharacterSelection(item.id);
            focusSelectedCharacter(i);
          }}
          onKeyDown={(event) => {
            if (event.key === "" || event.key === "Enter") {
              props.handleCharacterSelection(item.id);
              focusSelectedCharacter(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imageStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = renderItems(characterList);
  const errorMessage = hasError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || hasError) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={isLoadingCharacters}
        onClick={() => handleRequestCharacters(offset)}
        style={{ display: hasAnotherCharacters ? "block" : "none" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  handleCharacterSelection: PropTypes.func.isRequired,
};

export default CharList;
