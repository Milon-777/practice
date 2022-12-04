import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [hasAnotherCharacters, setHasAnotherCharacters] = useState(true);
  const [offset, setOffset] = useState(210);
  const itemRefs = useRef([]);
  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    handleRequestCharacters(offset, true);
  }, []);

  const focusSelectedCharacter = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const handleRequestCharacters = (offset, initial) => {
    initial ? setIsLoadingCharacters(false) : setIsLoadingCharacters(true);
    getAllCharacters(offset).then(handleCharacterListLoaded);
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
    setIsLoadingCharacters(false);
    setHasAnotherCharacters(hasCharacters);
    setOffset((offset) => offset + 9);
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
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !isLoadingCharacters ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
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
