import { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    characterList: [],
    isLoading: true,
    hasError: false,
    isLoadingCharacters: false,
    offset: 210,
    hasAnotherCharacters: true,
  };
  itemRefs = [];

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.handleRequestCharacters();
  };

  setRef = (ref) => {
    this.itemRefs.push(ref);
  };

  focusSelectedCharacter = (id) => {
    this.itemRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  };

  handleRequestCharacters = (offset) => {
    this.handleCharacterListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.handleCharacterListLoaded)
      .catch(this.handleError);
  };

  handleCharacterListLoading = () => {
    this.setState({
      isLoadingCharacters: true,
    });
  };

  handleCharacterListLoaded = (newCharacterList) => {
    let hasAnotherCharacters = true;
    if (newCharacterList.length < 9) {
      hasAnotherCharacters = false;
    }

    this.setState(({ offset, characterList }) => ({
      characterList: [...characterList, ...newCharacterList],
      isLoading: false,
      isLoadingCharacters: false,
      offset: offset + 9,
      hasAnotherCharacters: hasAnotherCharacters,
    }));
  };

  handleError = () => {
    this.setState({
      isLoading: false,
      hasError: true,
    });
  };

  renderItems(array) {
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
          ref={this.setRef}
          onClick={() => {
            this.props.handleCharacterSelection(item.id);
            this.focusSelectedCharacter(i);
          }}
          onKeyDown={(event) => {
            if (event.key === "" || event.key === "Enter") {
              this.props.handleCharacterSelection(item.id);
              this.focusSelectedCharacter(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imageStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const {
      characterList,
      isLoading,
      hasError,
      offset,
      isLoadingCharacters,
      hasAnotherCharacters,
    } = this.state;

    const items = this.renderItems(characterList);

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
          onClick={() => this.handleRequestCharacters(offset)}
          style={{ display: hasAnotherCharacters ? "block" : "none" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  handleCharacterSelection: PropTypes.func.isRequired,
};

export default CharList;
